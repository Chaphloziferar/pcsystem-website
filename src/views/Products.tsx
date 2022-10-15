import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { getProducts, addError } from '../context/features/product/productSlice';

import authApi from '../apis/authApi';
import { Product } from '../interfaces/productInterfaces';

import { ProductCard } from '../components/ProductCard';

export const Products = () => {

  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.product.products);
  //const error = useAppSelector(state => state.product.errorMessage);

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-medium p-2'>Seleccione un producto</h1>

      <div className='grid lg:grid-cols-3 sm:grid-cols-1 place-items-center'>
        {
          products.map((product: Product, index: number) => (
            <ProductCard product={product} key={index} />
          ))
        }
      </div>
    </div>
  )
}
