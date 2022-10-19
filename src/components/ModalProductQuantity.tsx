import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../context/app/hooks";
import { getQuote, addError } from "../context/features/quote/quoteSlice";

import authApi from "../apis/authApi";
import { Product } from "../interfaces/productInterfaces";

interface Props {
  setShowModal: (showModal: boolean) => void;
  product: Product;
}

export const ModalProductQuantity = ({ setShowModal, product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector((state: any) => state.auth.status);
  const client = useAppSelector((state: any) => state.client.client);

  const handleQuantitySelected = async () => {
    const cart = localStorage.getItem("cart");

    if (status === "Authenticated") {
      for (let i = 0; i < quantity; i++) {
        try {
          if (!cart) {
            const { data } = await authApi.post("/quote/addQuote", {
              clientDni: client!.dni,
            });
            localStorage.setItem("cart", data.quote._id);
            dispatch(getQuote(data));

            const productAdded = await authApi.put("/quote/addProductToQuote", {
              quoteId: data.quote._id,
              productName: product.name,
            });
            if (productAdded) {
              const { data: quote } = await authApi.get(
                `/quote/getQuote?quoteId=${data.quote._id}`
              );
              dispatch(getQuote(quote));
            }
          } else {
            const productAdded = await authApi.put("/quote/addProductToQuote", {
              quoteId: cart,
              productName: product.name,
            });
            if (productAdded) {
              const { data: quote } = await authApi.get(
                `/quote/getQuote?quoteId=${cart}`
              );
              dispatch(getQuote(quote));
            }
          }
        } catch (error: any) {
          console.log(error);
          dispatch(addError(error.response.data || "Información Incorrecta"));
        }
      }

      setShowModal(false);
    } else {
      setShowModal(false);
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-40">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-xl font=semibold">Elija la cantidad</h3>
            <button
              className="bg-transparent border-0 text-black float-right ml-3"
              onClick={() => setShowModal(false)}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto mx-auto">
            <div className="custom-number-input h-10 w-32">
              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                  data-action="decrement"
                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  onClick={() => {
                    quantity > 1 && setQuantity(quantity - 1);
                  }}
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  disabled
                  className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 outline-none"
                  name="custom-input-number"
                  value={quantity}
                ></input>
                <button
                  data-action="increment"
                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => handleQuantitySelected()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
