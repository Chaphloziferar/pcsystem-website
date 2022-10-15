import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { getProducts, addError } from '../context/features/product/productSlice';

import { Product } from '../interfaces/productInterfaces';

import authApi from '../apis/authApi'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ProductCard } from '../components/ProductCard';

export const Products = () => {

  const dispatch = useAppDispatch();
  
  let products = useAppSelector(state => state.product.products);

  useEffect(() => {
    const loadProducts = async () => {
      if(products.length === 0) {
        const category = localStorage.getItem('category');
        try {
          const { data } = await authApi.get(`/product/getProductsByCategory?category=${category}`);

          dispatch(getProducts(data));
        } catch (error: any) {
          dispatch(addError(error.response.data || 'Información Incorrecta'));
        }
      }
    }

    loadProducts();
  }, [dispatch, products])
  

  return (
    <div className='container h-screen mx-auto'>
      <Header/>
      <h1 className='text-2xl font-medium p-2'>Seleccione un producto</h1>

      <div className='grid lg:grid-cols-3 sm:grid-cols-1 place-items-center'>
        {
          products.map((product: Product, index: number) => (
            <ProductCard product={product} key={index} />
          ))
        }
      </div>
      <Footer/>
    </div>
  )
}
