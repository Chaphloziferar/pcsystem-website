import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { useAppDispatch, useAppSelector } from "../context/app/hooks";
import { resetQuote, addError } from "../context/features/quote/quoteSlice";

import authApi from "../apis/authApi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { QuoteItem } from "../components/QuoteItem";
import { Product } from '../interfaces/productInterfaces';

export const Quote = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quote = useAppSelector((state: any) => state.quote.quote);
  const username = useAppSelector((state: any) => state.auth.username);

  useEffect(() => {
    const uniqueIds: any = []
    const newData: any = []

    const unique = quote?.products.filter((element: any) => {
      const isDuplicate = uniqueIds.includes(element.name);
    
      if (!isDuplicate) {
        uniqueIds.push(element.name);
        newData.push({
          name: element.name,
          count: 1
        })
    
        return true;
      }
    
      let index = uniqueIds.indexOf(element.name)
      newData[index].count++
    
      return false;
    });
    
    const result = unique?.map((data: any) => {
      let count = 1
      const newItem = newData?.filter((item: any) => {
        return data.name === item.name
      })
    
      if(newItem.length > 0) count = newItem[0].count
    
      return {...data, count: count}
    })

    setProducts(result);
  }, [quote?.products])
  

  const handleFinishQuote = async () => {
    const cart = localStorage.getItem("cart");
    const email = localStorage.getItem("email");

    const emailTemplate = {
      email: email,
      username: username
    }

    try {
      const quoteId = cart!.toString();
      await authApi.put("/quote/editQuoteStatus", {
        quoteId: quoteId,
        status: "Done",
      });

      await emailjs.send(
        'service_4l1u3tu', 
        'template_7bwomli', 
        emailTemplate, 
        'syygg_P_W1wWv2oLS'
      );
      generatePDF();

      dispatch(resetQuote());
      localStorage.removeItem("cart");
      navigate("/home");
    } catch (error: any) {
      dispatch(addError(error.response.data || "Información Incorrecta"));
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    let columns = ["ID", "Producto", "Descripcion", "Precio", "Cantidad", "Total"];
    let data: any = [];

    products.forEach((product: any, index: number) => {
      data.push([
        (index + 1),
        product.name,
        product.description,
        '$' + (product.price).toFixed(2),
        product.count,
        '$' + (product.price * product.count).toFixed(2)
      ]);
    });

    data.push([
      "",
      "Sub-Total",
      "",
      "",
      "",
      '$' + (quote.total).toFixed(2),
    ],
    [
      "",
      "Impuestos",
      "",
      "",
      "",
      '$' + (quote.total * 0.15).toFixed(2),
    ],
    [
      "",
      "Total",
      "",
      "",
      "",
      '$' + (quote.total * 1.15).toFixed(2),
    ]);

    autoTable(pdf, {
      head: [columns],
      body: data,
    });

    pdf.text("Cotizacion realizada en PCSystem", 10, 10);

    pdf.save("Cotizacion-PCSystem.pdf");
  };

  return (
    <div className="container mx-auto">
      <Header />

      {(!quote || quote?.products.length <= 0) && (
        <h1 className="text-2xl h-96 font-medium py-32 text-center">
          No hay productos en el carrito
        </h1>
      )}

      {quote && quote?.products.length > 0 && (
        <div className="mx-auto mt-10">
          <div className="grid lg:grid-flow-col sm:grid-flow-row shadow-md my-10">
            <div className="w-full bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
                <h2 className="font-semibold text-2xl">
                  {quote?.products.length} Productos
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Detalle del Producto
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Precio
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Cantidad
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>

              {products?.map((product: Product, index: number) => (
                <QuoteItem product={product} key={index} />
              ))}
            </div>

            <div
              id="summary"
              className="w-full px-8 py-10"
            >
              <h1 className="font-semibold text-2xl border-b pb-8">
                Total del carrito
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Subtotal
                </span>
                <span className="font-semibold text-sm">${(quote!.total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Impuestos
                </span>
                <span className="font-semibold text-sm">
                  ${(quote!.total * 0.15).toFixed(2)}
                </span>
              </div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total</span>
                  <span>${(quote!.total * 1.15).toFixed(2)}</span>
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
