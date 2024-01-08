import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Header from '../partials/Header';
import Useerlist from '../pages/WethTable';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import Userdatas from '../partials/Login/Userdata';
import DashboardCard01 from '../partials/dashboard/TempCard01';
import DashboardCard02 from '../partials/dashboard/HumidCard02';
import DashboardCard03 from '../partials/dashboard/PresuCard03';
import DashboardCard14 from '../partials/dashboard/RainCard14';

export default function UserDash(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <> <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className='mx-auto'>
            < WelcomeBanner/>
                
                <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              <DashboardCard14 />
              
              </div>
                </main>
            </div>
            </div>

        </>
    )
}