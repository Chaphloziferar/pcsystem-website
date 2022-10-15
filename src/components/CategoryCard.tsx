import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { getProducts, addError } from '../context/features/product/productSlice';

import authApi from '../apis/authApi'
import {Category} from '../interfaces/categoryInterfaces';

interface Props {
    category: Category;
}

export const CategoryCard = ({category}: Props) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    //const error = useAppSelector(state => state.product.errorMessage);

    const handleNavigationToProducts = async () => {
        try {
            const { data } = await authApi.get(`/product/getProductsByCategory?category=${category.name}`);

            dispatch(getProducts(data));
            
            navigate('/products');
        } catch (error: any) {
            dispatch(addError(error.response.data || 'Información Incorrecta'));
        }
    }

    return (
        <div className="max-w-sm w-72 mb-8 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex rounded-t-lg w-auto h-52 justify-center align-middle bg-white">
                <img className="rounded-t-lg w-full h-full p-5 object-fill m-auto" src={category.imageUrl} alt="" />
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                <h5 className="mb-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white">{category.quantity} Productos</h5>
                <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleNavigationToProducts} disabled={category.quantity === 0}
                >
                    Ver Productos
                    <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    )
}
