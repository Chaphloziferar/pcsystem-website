import React from "react";

import { useAppSelector } from "../context/app/hooks";

interface Props {
    setShowModal: (showModal: boolean) => void;
}

export const ModalQuote = ({setShowModal}: Props) => {
  const quote = useAppSelector((state: any) => state.quote.selectedQuote);

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-40">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">Detalles de la cotización</h3>
            <button className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}>
              <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <table className="min-w-full mb-12">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    ID Producto
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Descripcion
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody>
                {quote?.products.map((product: any, index: number) => (
                  <tr className="border-b" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product._id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product.description}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {(product.price).toFixed(2)}
                    </td>
                  </tr>
                ))}

                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Sub-Total
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {(quote.total).toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Impuestos
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {(quote.total * 0.15).toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {(quote.total * 1.15).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
