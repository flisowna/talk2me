"use client"

import { useEffect } from "react";
import { INavLinksData, Navbar } from "./Navbar";
import Image from "next/image";
import Link from "next/link";
import menuIcon from "../../../public/menu_icon.svg";
import Logo from "../../../public/k5_logo.svg";

const Navigation = ({ navStatus, setNavStatus }: INavLinksData) => {

  const handleOutsideClick = (e: MouseEvent) => {
    const menuElement = document.querySelector(".menu-container");
    if (menuElement && !menuElement.contains(e.target as Node)) {
      setNavStatus(false);
    }
  };

  useEffect(() => {
    if (navStatus) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [navStatus]);

  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <div
          className="z-5 relative"
          onClick={() => setNavStatus(false)}
        >
          <Image
            src={Logo}
            alt="logo"
            style={{
              objectFit: "cover", // cover, contain, none
            }}
            width={50}
          height={55}
          />
        </div>
      </Link>
      <Navbar navStatus={navStatus} setNavStatus={setNavStatus} />
      <button
        className={`menu-container items-center flex transition-all ease-out duration-1000 border-none hover:shadow-none ${
          navStatus ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Image
          src={menuIcon}
          alt="menu icon"
          onClick={() => setNavStatus(!navStatus)}
          width={34}
          height={34}
        />
      </button>
    </div>
  );
};

export default Navigation;
