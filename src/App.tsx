import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import { useAppDispatch } from './context/app/hooks';
import { signIn, logout } from './context/features/auth/authSlice'

import authApi from './apis/authApi';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { SignUp } from './views/SignUp';

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  //const status = useAppSelector(state => state.auth.status);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {

      const checkAuth = async (token: string) => {
        try {
          const {data} = await authApi.post("/auth/renewToken");
    
          localStorage.setItem("token", data.token);

          dispatch(signIn(data));
        } catch (error: any) {
            dispatch(logout());
            localStorage.removeItem("token");
        }
      }

      checkAuth(token);
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
    </Routes>
  )
}

export default App;