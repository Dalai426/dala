'use client';
import { useState } from "react";
import SideBar from "./SideBar";
import TopHeader from "./TopHeader";


export default function AdminLayout({ children }: any) {
    
    const [show_sidebar, setShowSidebar]: any = useState(true);

    return (
      <div className="h-screen w-full bg-white flex flex-row">
        <SideBar is_show={show_sidebar} setShowSidebar={setShowSidebar}/>
        <div className={`flex flex-col ${show_sidebar ? 'w-0' : 'w-full'} sm:w-full`}>
          <TopHeader setShowSidebar={setShowSidebar} is_show={show_sidebar} />
          <div className="z-10 overflow-scroll ">{children}</div>
        </div>
      </div>
    );
  }
  