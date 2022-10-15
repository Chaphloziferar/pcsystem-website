import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { getCategories, addError } from '../context/features/category/categorySlice';

import authApi from '../apis/authApi';
import { Category } from '../interfaces/categoryInterfaces';

import { CategoryCard } from '../components/CategoryCard';

export const Categories = () => {
    
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
    

    return (
        <div className='container mx-auto'>
            <h1 className='text-2xl font-medium pl-5 m-6'>Seleccione una categoria</h1>

            <div className='grid lg:grid-cols-3 sm:grid-cols-1 place-items-center'>
                {
                    categories.map((category: Category, index: number) => (
                        <CategoryCard category={category} key={index} />
                    ))
                }
            </div>
        </div>
    )
}
