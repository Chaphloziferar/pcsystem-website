import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../assets/Banner.png';

import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { getCategories, addError } from '../context/features/category/categorySlice';
import { getProducts} from '../context/features/product/productSlice';


import authApi from '../apis/authApi';
import { Category } from '../interfaces/categoryInterfaces';

import { CategoryCard } from '../components/CategoryCard';
import { ImportsNotUsedAsValues } from 'typescript';

import { Product } from '../interfaces/productInterfaces';

import { ProductCard } from '../components/ProductCard';


export const Home: React.FC = () => {

  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  //const error = useAppSelector(state => state.category.errorMessage);

  useEffect(() => {
      const loadCategories = async () => {
          try {
              const { data } = await authApi.get("/category/getCategories");
              
              dispatch(getCategories(data));
          } catch (error: any) {
              dispatch(addError(error.response.data || 'Información Incorrecta'));
          }
      }

      loadCategories();
  }, [dispatch])
  
  
  let products = useAppSelector(state => state.product.products);

  useEffect(() => {
    const loadProducts = async () => {
      if(products.length === 0) {
        try {
          const { data } = await authApi.get(`/product/getProducts`);
          
          dispatch(getProducts(data));
        } catch (error: any) {
          dispatch(addError(error.response.data || 'Información Incorrecta'));
        }
      }
    }

    loadProducts();
  }, [dispatch, products])

  return (
    
    <div className='h-full w-full flex flex-col mx-auto container'>
      <Header/>
      <div className='h-auto flex w-full items-center overflow-x-auto overscroll-x-contain space-x-6 '>
        <div>
          <h1 className='text-2xl font-medium pl-5 m-6 border-b-2 w-72'>Categorias disponibles</h1>
          <div className='flex place-items-center space-x-6 m-4 w-full'>
            {
              categories.map((category: Category, index: number) => (
                category.quantity > 0 && <CategoryCard category={category} key={index} />
              ))
            }
          </div>
        </div>
      </div>
      <div className='h-auto flex w-full items-center overflow-x-auto overscroll-x-contain space-x-6 mb-10'>
        <div>
          <h1 className='text-2xl font-medium pl-5 m-6 border-b-2 w-72'>Nuevos productos</h1>
          <div className='flex place-items-center space-x-6 m-4 w-full'>
            {
              products.map((product: Product, index: number) => (
                <ProductCard product={product} key={index} />
              ))
            }
          </div>
        </div>
      </div>
      <div className='h-auto flex justify-center self-center w-full invisible lg:visible'>
        <img className="h-4/5 w-full shadow-md mb-8" src={Banner} alt="Logo" />
      </div>
      <Footer/>
    </div>
  )
}
