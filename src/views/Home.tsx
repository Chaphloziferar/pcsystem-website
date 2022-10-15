import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Home: React.FC = () => {
  return (
    
    <div className='h-full w-full flex flex-col container mx-auto'>
      <Header/>
      <div className=' h-96 flex justify-center self-center w-full border-red-400 border-2'>
        Home
      </div>
      <div className=' h-96 flex justify-center self-center w-full border-red-400 border-2'>
        Home
      </div>
      <div className=' h-96 flex justify-center self-center w-full border-red-400 border-2'>
        Home
      </div>
      <div className=' h-96 flex justify-center self-center w-full border-red-400 border-2'>
        Home
      </div>
      <Footer/>
    </div>
  )
}
