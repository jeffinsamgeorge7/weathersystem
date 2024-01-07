import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Regis from '../partials/Login/Register';
import LineGraph2 from '../prediction/Tgraph';

export default function Allgraph(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <> <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className='mx-auto'>
                <LineGraph2/>
                </main>
            </div>
            </div>

        </>
    )
}