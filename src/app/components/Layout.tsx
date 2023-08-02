"use client"
import Navigation from './Navigation'
import React, { useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
  }
 
export default function Layout({ children }: LayoutProps)  {
    const [navStatus, setNavStatus] = useState(false);
  return (
    <>
    <div className='h-20'>
      <Navigation
        navStatus={navStatus}
        setNavStatus={setNavStatus}
      />
      </div>
      <main>{children}</main>
    </>
  )
}