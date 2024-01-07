import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Useerlist from '../partials/Login/Userlist';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import Userdatas from '../partials/Login/Userdata';

export default function UserDash(){
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
                <Userdatas/>
                </main>
            </div>
            </div>

        </>
    )
}