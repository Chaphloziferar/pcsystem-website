import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FacebookIcon from '@mui/icons-material/Facebook';
import authApi from '../apis/authApi';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

export const ContactUs = () => {
  
    return (
      <div className='container mx-auto'>
        <Header/>
        <div className='items-center text-center mt-8'>
            <h1 className='text-2xl text-blue-900 font-bold '>PCSYSTEM</h1>
            <h2 className='text-xl text-blue-900 font-bold'>Tecnologia a tu alcance</h2>
            <div className='flex justify-center content-center'>
                <p className=' m-4 w-2/3 text-lg'>En PCSYSTEM contamos con diversos artículos de alta gama y de excelentes precios desde el día en que abrimos nuestras puertas. Nuestra pasión por la excelencia nos condujo a materializar esta misión, siendo ésta la parte fundamental que nos ha impulsado a seguir adelante.El equipo PCSYSTEM sabe que cada producto es importante, por lo que haremos de tu experiencia de compra lo más placentera posible. Echa un vistazo a nuestra tienda online y mira las ofertas que tenemos para ti; no olvides contactar a nuestro equipo de servicio al cliente para cualquier duda que tengas.</p>
            </div>
        </div>
        <div className='flex flex-row justify-evenly'>
            <div className='w-1/3'>
                <h1 className='text-2xl font-medium pl-5 m-6 border-b-2'>Informacion de contacto</h1>
                <div className='flex flex-col'>
                    <div className=' flex flex-row items-center m-0 ml-12 mb-4'>
                    <FacebookIcon/>
                    <a className="ContactLink hover:text-emerald-800" target="_blank" href="https://www.facebook.com/pcsystem.nic">Facebook</a>
                    </div>
                    <div className=' flex flex-row items-center m-0 ml-12 mb-4'>
                    <EmailIcon/>
                    <a className="ContactLink">pcsystem.nic@gmail.com</a>
                    </div>
                    <div className=' flex flex-row items-center m-0 ml-12 mb-4'>
                    <PhoneAndroidIcon/>
                    <a className="ContactLink">+50584422235</a>
                    </div>
                </div>
            </div>
            <div className='w-1/3'>
                <h1 className='text-2xl font-medium pl-5 m-6 border-b-2'>Dirección</h1>
                <div className='w-1/2 ml-12 text-lg'>
                    Las Brisas, Distrito #2 de policía, 5 cuadras al oeste, mano derecha, Managua, Nicaragua
                </div>
            </div>
        </div>
        <Footer/>
      </div>
    )
  }