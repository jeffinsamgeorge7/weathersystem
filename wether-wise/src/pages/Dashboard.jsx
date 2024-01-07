import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
//import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/TempCard01';
import DashboardCard02 from '../partials/dashboard/HumidCard02';
import DashboardCard03 from '../partials/dashboard/PresuCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
//import DashboardCard06 from '../partials/dashboard/DashboardCard06';
//import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
//import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard14 from '../partials/dashboard/RainCard14';
import SoilCard15 from '../partials/dashboard/SoilCard15';
import Newhome from '../prediction/wethpredict';
import LineGraph from '../prediction/linegraphs';


//import Banner from '../partials/Banner';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            < WelcomeBanner/>
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars 
              
              <DashboardAvatars />*/}
              

              {/* Right: Actions */}
              

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              <DashboardCard14 />
              <SoilCard15 />
              
             
              
              {/* Bar chart (Direct vs Indirect) */}
              {/*<DashboardCard04 />*/}
              {/* Line chart (Real Time Value) */}
              {/*<DashboardCard05 />*/}
              {/* Doughnut chart (Top Countries) 
              
              <DashboardCard06 />*/}
              
              {/* Table (Top Channels) <DashboardCard07 />*/}
              
              {/* Line chart (Sales Over Time) */}
              {/*<DashboardCard08 />*/}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/*<DashboardCard09 />*/}
              
              
              
              
              {/* Card (Income/Expenses) 
              
              <DashboardCard13 />*/}
              
              
              
            </div>
            <div className='mt-10'>
            <DashboardCard10 />
            </div>
            
            <LineGraph/>
          </div>
        </main>

        {/*<Banner />*/}

      </div>
    </div>
  );
}

export default Dashboard;