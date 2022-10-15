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
            <p className="text-lg text-white mb-2 font-bold">Services</p>
            <a className="FootLink" href="#">Writing</a>
            <a className="FootLink" href="#">Internships</a>
            <a className="FootLink" href="#">Teaching</a>
          </div>

          <div className="FootCol">
            <p className="text-lg text-white mb-2 font-bold">Contactanos</p>
            <a className="FootLink"  target="_blank" href="https://www.facebook.com/pcsystem.nic">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </a>
            <a className="FootLink" href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  pcsystem.nic@gmail.com
                </span>
              </i>
            </a>
            <a className="FootLink" href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  +50584422235
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