"use client";

import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "app/store/menuSlice";

interface SidebarProps {
  menus: Menu[];
  onSelectMainMenu?: (menu: string) => void;
}

export function Sidebar({ menus, onSelectMainMenu }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMainMenu, setActiveMainMenu] = useState<string>("Systems");
  const [activeSubMenu, setActiveSubMenu] = useState<string>("Menus");

  const handleMainMenuClick = (menu: string) => {
    setActiveMainMenu(menu);
    setActiveSubMenu("");
    onSelectMainMenu?.(menu);
  };

  const handleSubMenuClick = (submenu: string) => {
    setActiveSubMenu(submenu);
  };

  const renderMenus = () => (
    <nav>
      <ul className="space-y-2">
        {menus.map((menu) => {
          const isRootMenu = menu.depth === 0;
          const image = isRootMenu ? "/folder.png" : "/submenu.png";

          return (
            <React.Fragment key={menu.id}>
              {/* Main Menu */}
              <li
                className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
                  activeMainMenu === menu.name
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-800 text-gray-400"
                }`}
                onClick={() => handleMainMenuClick(menu.name)}>
                <Image
                  src={image}
                  alt={`${menu.name} Icon`}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {menu.name}
              </li>

              {/* Submenus */}
              {menu.children?.map((submenu) => (
                <li
                  key={submenu.id}
                  className={`ml-6 mt-2 px-4 py-2 rounded-lg cursor-pointer flex items-center ${
                    activeSubMenu === submenu.name
                      ? "bg-[#9FF443] text-black shadow"
                      : "hover:bg-gray-800 text-gray-400"
                  }`}
                  onClick={() => handleSubMenuClick(submenu.name)}>
                  <Image
                    src="/submenu.png"
                    alt={`${submenu.name} Icon`}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  {submenu.name}
                </li>
              ))}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="fixed left-4 top-4 z-50 rounded-lg bg-gray-800 p-2 text-gray-400 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
          <Link href="/" className="text-xl font-bold text-white">
            CLOIT
          </Link>
          <button
            className="text-gray-400 lg:hidden"
            onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4">{renderMenus()}</div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="min-h-screen lg:pl-64">
        <main className="p-6">{/* Main content goes here */}</main>
      </div>
    </>
  );
}
