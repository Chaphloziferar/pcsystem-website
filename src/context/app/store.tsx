import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import registerReducer from "../features/register/registerSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import clientReducer from "../features/client/clientSlice";
import quoteReducer from "../features/quote/quoteSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        category: categoryReducer,
        product: productReducer,
        client: clientReducer,
        quote: quoteReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;