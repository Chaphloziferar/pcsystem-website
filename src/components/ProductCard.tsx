import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { getProduct } from '../context/features/product/productSlice';

import { Product } from '../interfaces/productInterfaces';

interface Props {
    product: Product;
}

export const ProductCard = ({product}: Props) => {
  return (
    <div className="w-full max-w-sm mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex w-full h-72 justify-center align-middle">
            <img className="p-8 rounded-t-lg w-full object-fill" src={product.imageUrl} alt="" />
        </div>
        <div className="px-5 pb-5">
            <div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
            </div>
        </div>
    </div>
  )
}