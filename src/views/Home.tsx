import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Home: React.FC = () => {
  return (
    
    <div className='h-full w-full flex flex-col'>
      <Header/>
      <div className=' h-full flex justify-center self-center w-4/5 border-red-400 border-2'>
        Home
      </div>
      <Footer/>
    </div>
  )
}
