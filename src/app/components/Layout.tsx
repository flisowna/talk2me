"use client"
import Navigation from './Navigation'
import React, { useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
  }
 
export default function Layout({ children }: LayoutProps)  {
    const [navStatus, setNavStatus] = useState(false);
    console.log("navStatus", navStatus)
  return (
    <>
    <div className='h-20'>
      <Navigation
        navStatus={navStatus}
        setNavStatus={setNavStatus}
      />
      </div>
      <p>{navStatus}</p>
      <main>{children}</main>
    </>
  )
}