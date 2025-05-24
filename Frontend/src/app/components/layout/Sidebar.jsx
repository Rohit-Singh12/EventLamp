"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  CalendarCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } fixed left-0 top-0`}
    >
      {/* Sidebar Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-gray-800 text-white p-2 rounded-full shadow-md transition-all"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full p-4">
        {/* Logo / Header */}
        <div
          className={`flex items-center gap-2 ${
            isCollapsed ? "justify-center" : "justify-start"
          } mb-6`}
        >
          <Menu size={28} className="text-white" />
          {!isCollapsed && <span className="text-xl font-bold">Dashboard</span>}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-4">
            <SidebarItem
              href="/dashboard"
              icon={<LayoutDashboard size={22} className="text-white" />}
              label="Overview"
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/dashboard/bookings"
              icon={<CalendarCheck size={22} className="text-white" />}
              label="Bookings"
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/dashboard/availability"
              icon={<CalendarCheck size={22} className="text-white" />}
              label="Availability"
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              href="/dashboard/settings"
              icon={<Settings size={22} className="text-white" />}
              label="Settings"
              isCollapsed={isCollapsed}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ href, icon, label, isCollapsed }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-all"
      >
        {icon}
        {!isCollapsed && <span className="ml-3 text-sm">{label}</span>}
      </Link>
    </li>
  );
}
