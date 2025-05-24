"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  CalendarCheck,
  Settings,
  Bell,
  PartyPopper,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`bg-gray-800 text-white shadow-lg transition-all `}>
          <div className="flex flex-col h-full p-4">
            {/* Sidebar Links */}
            <nav className="flex-1">
              <ul className="space-y-4">
                <SidebarItem
                  href="/admin/dashboard"
                  icon={<LayoutDashboard size={22} />}
                  label="Overview"
                  isCollapsed={isCollapsed}
                  isActive={pathname === "/admin/dashboard"}
                />
                <SidebarItem
                  href="/admin/venue"
                  icon={<PartyPopper size={22} />}
                  label="Venue"
                  isCollapsed={isCollapsed}
                  isActive={pathname === "/admin/venue"}
                />
                <SidebarItem
                  href="/admin/bookings"
                  icon={<CalendarCheck size={22} />}
                  label="Bookings"
                  isCollapsed={isCollapsed}
                  isActive={pathname === "/admin/bookings"}
                />
                <SidebarItem
                  href="/admin/availability"
                  icon={<CalendarCheck size={22} />}
                  label="Availability"
                  isCollapsed={isCollapsed}
                  isActive={pathname === "/admin/availability"}
                />
                <SidebarItem
                  href="/admin/settings"
                  icon={<Settings size={22} />}
                  label="Settings"
                  isCollapsed={isCollapsed}
                  isActive={pathname === "/admin/settings"}
                />
              </ul>
            </nav>

            {/* Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="mt-auto p-2 hover:bg-gray-700 rounded"
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 `}>
          <div className="p-6 bg-gray-100 min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
function SidebarItem({ href, icon, label, isCollapsed, isActive }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-3 rounded-lg transition-all w-full ${
          isActive ? "bg-gray-700" : "hover:bg-gray-700"
        }`}
      >
        {icon}
        {!isCollapsed && <span className="ml-3 text-sm">{label}</span>}
      </Link>
    </li>
  );
}

export default AdminLayout;
