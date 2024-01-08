import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Table from '../prediction/datalist'
import Userdatas from '../partials/Login/Userdata';

export default function Emplist(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
      
    return(
        <>
        <div className="flex h-screen overflow-hidden">

{/* Sidebar */}
<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

{/* Content area */}
<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

{/*  Site header */}
<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
  
    <main className='relative'>
        <Userdatas/>
        </main>
    </div>
    </div>
        
        </>
    )
};