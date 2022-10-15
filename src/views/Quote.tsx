import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../context/app/hooks";
import { resetQuote, addError } from "../context/features/quote/quoteSlice";

import authApi from "../apis/authApi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { QuoteItem } from "../components/QuoteItem";

export const Quote = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quote = useAppSelector((state) => state.quote.quote);

  const handleFinishQuote = async () => {
    const cart = localStorage.getItem("cart");

    try {
      const quoteId = cart!.toString();
      await authApi.put("/quote/editQuoteStatus", {
        quoteId: quoteId,
        status: "Done",
      });

      dispatch(resetQuote());
      localStorage.removeItem("cart");
      navigate("/home");
    } catch (error: any) {
      dispatch(addError(error.response.data || "Información Incorrecta"));
    }
  };

  return (
    <div className="lg:w-4/5 md:w-full mx-auto">
      <Header />

      {!quote && (
        <h1 className="text-2xl h-96 font-medium py-32 text-center">
          No hay productos en el carrito
        </h1>
      )}

      {quote && (
        <div className="mx-auto mt-10">
          <div className="grid lg:grid-flow-col sm:grid-flow-row shadow-md my-10">
            <div className="w-full bg-white px-10 py-10 border-2 border-red-700">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
                <h2 className="font-semibold text-2xl">
                  {quote!.products.length} Productos
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Detalle del Producto
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Precio
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>

              {quote?.products.map((product, index) => (
                <QuoteItem product={product} key={index} />
              ))}
            </div>

            <div
              id="summary"
              className="w-full px-8 py-10 border-2 border-red-700"
            >
              <h1 className="font-semibold text-2xl border-b pb-8">
                Total del carrito
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Subtotal
                </span>
                <span className="font-semibold text-sm">${quote!.total}</span>
              </div>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Impuestos
                </span>
                <span className="font-semibold text-sm">
                  ${quote!.total * 0.15}
                </span>
              </div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total</span>
                  <span>${quote!.total * 1.15}</span>
                </div>
                <button
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                  onClick={handleFinishQuote}
                >
                  Realizar Cotizacion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
