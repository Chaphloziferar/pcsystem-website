import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import { useAppDispatch } from './context/app/hooks';
import { signIn, logout } from './context/features/auth/authSlice';
import { getClient } from './context/features/client/clientSlice';
import { getQuote } from './context/features/quote/quoteSlice';

import authApi from './apis/authApi';
import { Login } from './views/Login';
import { SignUp } from './views/SignUp';
import { Home } from './views/Home';
import { Categories } from './views/Categories';
import { Products } from './views/Products';
import { Quote } from './views/Quote';
import { ContactUs } from './views/ContactUs';
import { Administration } from './views/Administration';

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  //const status = useAppSelector(state => state.auth.status);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token) {

      const checkAuth = async (token: string) => {
        try {
          const {data: login} = await authApi.post("/auth/renewToken");
          localStorage.setItem("token", login.token);
          localStorage.setItem("email", login.email);

          dispatch(signIn(login));

          const {data: user} = await authApi.get(`/client/getClientByEmail?email=${email}`);
          dispatch(getClient(user));
        } catch (error: any) {
          dispatch(logout());
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("category");
        }
      }

      const loadMainData = async () => {
        const cart = localStorage.getItem('cart');

        if (cart) {
          try {
            const {data: quote} = await authApi.get(`/quote/getQuote?quoteId=${cart}`);
            dispatch(getQuote(quote));
          } catch (error: any) {
            localStorage.removeItem("cart");
          }
        }
      }

      checkAuth(token);
      loadMainData();
    }
    else{
      dispatch(logout());
    }
  }, [dispatch])
  

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={ <Home />} />
      <Route path="/login" element={ <Login />} />
      <Route path="/signup" element={ <SignUp />} />
      <Route path="/categories" element={ <Categories />} />
      <Route path="/products" element={ <Products />} />
      <Route path="/quote" element={ <Quote />} />
      <Route path="/contactus" element={ <ContactUs />} />
      <Route path="/administration" element={ <Administration />} />
    </Routes>
  )
}

export default App;