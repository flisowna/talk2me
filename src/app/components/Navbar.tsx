"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialSharingButtons from "./SocialSharingButtons";

export interface INavLink {
  title: string;
  link: string;
}

export interface INavLinksData {
  navStatus: boolean;
  setNavStatus: (status: boolean) => void;
}

export const Navbar = ({ navStatus, setNavStatus }: INavLinksData) => {
  const links = [
    {
      title: "über das spiel",
      link: "/uber-das-spiel",
    },
    { title: "über uns", link: "/uber-uns" },
    { title: "press", link: "/press" },
    { title: "rechtliches", link: "/rechtliches" },
  ];
  // "translate-x-0%" : "translate-x-100%"
  return (
    <nav
      className={`fixed top-0 right-0 p-4 h-[535px] w-[372px] border-2 border-black/60 bg-[#F1F1FF] shadow-md transition-all duration-300 flex justify-center z-10 ${
        navStatus ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex justify-end mt-3 mb-0.5 -mr-10">
            <button onClick={() => setNavStatus(!navStatus)} className="border-none hover:shadow-none">
              <Image
                src="/close_icon.svg"
                alt="close icon"
                width="34"
                height="34"
              />
            </button>
          </div>
          <div className="flex flex-col font-bold justify-center max-w-[11rem] min-w-[6rem] mx-auto transition-all duration-300">
            {links.map((link) => (
              <button key={link.title} className="flex justify-center items-center">
                <Link key={link.title} href={link.link} passHref>
                  <div onClick={() => setNavStatus(!navStatus)}>{link.title}</div>
                </Link>
              </button>
            ))}
          </div>
        </div>
        <div>
          <SocialSharingButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
