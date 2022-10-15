import React from "react";

const Footer = () => {
  return (
    <div className="py-6 px-16 bg-blue-400 relative bottom-0 w-full max-h-80 container overflow-hidden">
      <div className="flex flex-col justify-center my-0 mx-auto max-w-5xl">
        <div className="grid gap-5 grid-cols-3 max-w-5xl">
          <div className="FootCol">
            <p className="text-lg text-white mb-2 font-bold">About Us</p>
            <a className="FootLink"  href="#">Aim</a>
            <a className="FootLink"  href="#">Vision</a>
          </div>
          <div className="FootCol">
            <p className="text-lg text-white mb-2 font-bold">Contactos</p>
            <a className="FootLink hover:text-emerald-800" target="_blank" href="https://www.facebook.com/pcsystem.nic">Facebook</a>
            <a className="FootLink">Email: pcsystem.nic@gmail.com</a>
            <a className="FootLink">Telefono: +50584422235</a>
          </div>

          <div className="FootCol">
            <p className="text-lg text-white mb-2 font-bold">Dirección</p>
            <a className="FootLink">
              <i className="">
                <span>
                  Las Brisas, Distrito #2 de policía, 5 cuadras al oeste, mano derecha, Managua, Nicaragua
                </span>
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;