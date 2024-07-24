import React from "react";
import SidebarRoutes from "./SidebarRoutes";
import SidebarRoutesBottom from "./SidebarRoutesBottom";

import Chart from "./Chart";
import SidebarTop from "./SidebarTop";

const Sidebar = () => {
  return (
    <div className="flex min-h-screen min-w-80 flex-col justify-between overflow-y-auto border-r border-zinc-200 p-8">
      {/* Sidebar Top */}
      <div className="flex flex-col items-center gap-8">
        <SidebarTop />
        <SidebarRoutes />
      </div>
      {/* Chart */}
      <Chart />
      {/* Sidebar Bottom */}
      <SidebarRoutesBottom />
    </div>
  );
};

export default Sidebar;
