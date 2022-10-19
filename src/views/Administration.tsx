import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { getQuotes, getSelectedQuote, addError } from '../context/features/quote/quoteSlice';

import authApi from '../apis/authApi';
import { Quote } from "../interfaces/quoteInterfaces";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { ModalQuote } from "../components/ModalQuote";

export const Administration = () => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const quotes = useAppSelector((state: any) => state.quote.quotes);

  const handleShowDetails = (quote: Quote) => {
    dispatch(getSelectedQuote(quote));

    setShowModal(true);
  }

  useEffect(() => {
    const loadCategories = async () => {
        try {
            const { data } = await authApi.get("/quote/getQuotes");
            
            dispatch(getQuotes(data));
        } catch (error: any) {
            dispatch(addError(error.response.data || 'Información Incorrecta'));
        }
    }

    loadCategories();
}, [dispatch])

  return (
    <div className="container mx-auto">
      <Header />
      
      <h1 className='text-2xl font-medium pl-5 m-6'>Lista de cotizaciones pendientes</h1>

      <table className="min-w-full mb-12">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ID Cotizacion
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Cliente
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Total
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {
              quotes.map((quote: any, index: number) => (
                <tr className="border-b cursor-pointer" key={index}
                onClick={() => handleShowDetails(quote)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote._id}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {(quote.client?.email) ? quote.client.email : 'No hay Email'}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {(quote.total).toFixed(2)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {quote.status}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {showModal && <ModalQuote setShowModal={setShowModal} />}

      <Footer />
    </div>
  );
};
