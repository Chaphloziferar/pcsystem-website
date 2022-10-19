import React from "react";

import { useAppDispatch, useAppSelector } from "../context/app/hooks";
import { getQuote, addError } from "../context/features/quote/quoteSlice";

import authApi from '../apis/authApi'

interface Props {
    product: any;
}

export const QuoteItem = ({product}: Props) => {

  const dispatch = useAppDispatch();

  const handleDeleteItem = async () => {
    const cart = localStorage.getItem("cart");
    
    try {
      const quoteId = cart!.toString()
      await authApi.put('/quote/deleteProductFromQuote', {quoteId: quoteId, productName: product.name});
      const {data: quote} = await authApi.get(`/quote/getQuote?quoteId=${cart}`);
      dispatch(getQuote(quote));
    } catch (error: any) {
      dispatch(addError(error.response.data || "Información Incorrecta"));
    }
  }

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24"
            src={product.imageUrl}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{product.name}</span>
          <span className="text-blue-500 text-xs">{product.description}</span>
          <button className="w-fit font-semibold hover:text-red-500 text-gray-500 text-xs"
            onClick={handleDeleteItem}
          >
            Eliminar
          </button>
        </div>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">${(product.price).toFixed(2)}</span>
      <span className="text-center w-1/5 font-semibold text-sm">{product.count}</span>
      <span className="text-center w-1/5 font-semibold text-sm">${(product.price * product.count).toFixed(2)}</span>
    </div>
  );
};
