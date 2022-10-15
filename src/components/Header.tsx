import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from "../context/app/hooks";
import { logout } from "../context/features/auth/authSlice";

import Logo from "../assets/PCSYSTEM_Logo.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () =>{

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return(
        <nav className="h-20 w-full bg-blue-400 flex items-center justify-center mx-auto container relative overflow-hidden">
            <div className="h-full w-11/12 flex flex-row items-center justify-between">
                <div className=" w-1/4  flex flex-row items-center space-x-2 mx-2 ">
                    <div className="flex flex-row items-center w-1/2 ">
                        <img className="h-16 w-20" src={Logo} alt="Logo" />
                        <p className="text-white invisible lg:visible font-semibold text-xl">PCSYSTEM</p>
                    </div>
                </div>

                {(width > 720) && <div className="w-1/2 mx-2 h-12 flex justify-center">
                     {/*<SearchBar placeholder="Buscar..." data={Data}/>*/}
                     <ul className="w-full flex flex-row justify-between items-center">
                        <li className="NavItem">
                            <a href="/Home">
                                Inicio
                            </a>
                        </li>
                        <li className="NavItem">
                            <Link to="/categories">
                                Catalogo
                            </Link>
                        </li>
                        <li className="NavItem">
                            <a href="/Contactus">
                                Contactanos
                            </a>
                        </li>
                     </ul>
                </div>}

                {(width < 720) && <div className="relative w-full lg:max-w-sm">
                    <select
                        className="w-full p-2.5 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600 text-center"
                        onChange={(e) => {if(e.target.value !== 'none') navigate(e.target.value)}}
                    >
                        <option value="none">Abrir Navegador</option>
                        <option value="/home">Inicio</option>
                        <option value="/categories">Catalogo</option>
                        <option value="/contactus">Contacto</option>
                    </select>
                </div>}

                <div className="w-1/4 h-12 flex items-center justify-end mx-2 ">
                    <button className="w-1/4 h-4/5 flex justify-center items-center rounded-xl hover:bg-blue-500 hover:shadow-lg"
                        onClick={() => navigate("/quote")}
                    >
                        <ShoppingCartIcon fontSize="large" style={{ color: '#fff' }}/>
                    </button>
                    <button className="flex h-4/5 justify-evenly w-1/3 items-center rounded-xl hover:bg-blue-500 hover:shadow-lg"
                        onClick={() => {
                            dispatch(logout());
                            navigate("/login");
                            localStorage.removeItem("token");
                            localStorage.removeItem("email");
                            localStorage.removeItem("category");
                        }}
                    >
                        <div className="w-full flex flex-row justify-center items-center">
                            <span className="text-white invisible lg:visible font-semibold text-lg">Perfil</span>
                            <AccountBoxIcon fontSize="large" style={{ color: '#fff' }}/>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Header