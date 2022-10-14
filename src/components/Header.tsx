import React from "react";
import Logo from "../assets/PCSYSTEM_Logo.png";
import SearchBar from "./SearchBar";
import Data from "../Data.json";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () =>{
    return(
        <nav className="h-20 w-full bg-blue-400 flex items-center justify-center mx-auto container relative">
            <div className="h-full w-11/12 flex flex-row items-center justify-between">
                <div className=" w-1/4  flex flex-row items-center space-x-2 mx-2 ">
                    <div className="flex flex-row items-center w-1/2 ">
                        <img className="h-16 w-20" src={Logo} alt="Logo" />
                        <p className="text-white font-semibold text-xl">PCSYSTEM</p>
                    </div>
                </div>
                <div className="w-1/2 mx-2 h-12 ">
                     {/*<SearchBar placeholder="Buscar..." data={Data}/>*/}
                </div>
                <div className="w-1/4 h-12 flex items-center justify-end mx-2 ">
                    <div className="w-1/4  flex justify-center ">
                        <ShoppingCartIcon fontSize="large" style={{ color: '#fff' }}/>
                    </div>
                    <div className="flex justify-evenly w-1/3 items-center">
                        <div className="w-full flex flex-row justify-center items-center">
                            <p className="text-white font-semibold text-lg">Perfil</p>
                            <AccountBoxIcon fontSize="large" style={{ color: '#fff' }}/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header