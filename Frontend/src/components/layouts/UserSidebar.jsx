"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FiHome, FiSearch, FiCalendar, FiSettings } from "react-icons/fi";

const ResponsiveNavigation = () => {
  const pathname = usePathname();

  // Hide nav on admin pages
  if (pathname.startsWith("/admin")) return null;

  const navItems = [
    { id: 1, name: "Home", icon: <FiHome />, path: "/" },
    { id: 2, name: "Search", icon: <FiSearch />, path: "/search" },
    { id: 3, name: "My Bookings", icon: <FiCalendar />, path: "/bookings" },
    { id: 4, name: "Settings", icon: <FiSettings />, path: "/settings" },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-md">
        <div className="flex justify-around md:justify-center md:gap-8 items-center py-2 px-2 max-w-6xl mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <a
                key={item.id}
                href={item.path}
                className={`group flex flex-col md:flex-row items-center md:space-x-2 px-3 py-2 rounded-lg transition-all duration-200 
                  ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
                  }`}
              >
                <span
                  className={`text-xl group-hover:scale-110 transition-transform duration-200 ${
                    isActive ? "text-indigo-600" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-xs md:text-sm md:font-medium mt-1 md:mt-0">
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Spacer to prevent overlap with nav */}
      <div className="pb-20 md:pb-20"></div>
    </>
  );
};

export default ResponsiveNavigation;
