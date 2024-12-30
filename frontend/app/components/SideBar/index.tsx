"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import MenuIcons from "../../assets/men.svg";
import { Menu } from "app/store/menuSlice";
import Logo from "../../assets/logo.svg";
import XLogo from "../../assets/menuS.svg";
interface SidebarProps {
  menu?: Menu;
  onSelectMainMenu?: (menu: string) => void;
  onSelectSubMenu?: (name: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function Sidebar({
  menu,
  onSelectMainMenu,
  onSelectSubMenu,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const [activeMainMenu, setActiveMainMenu] = useState<string>(
    menu?.children?.[0]?.id || ""
  );
  const [activeSubMenu, setActiveSubMenu] = useState<string>("");

  const handleMainMenuClick = (menu: string) => {
    setActiveMainMenu(menu);
    setActiveSubMenu("");
    onSelectMainMenu?.(menu);
  };

  const handleSubMenuClick = (
    submenu: string,
    name: string,
    parentId?: string | null
  ) => {
    if (parentId) handleMainMenuClick(parentId);
    setActiveSubMenu(submenu);
    onSelectSubMenu?.(name);
  };

  // console.log("menu", menu);

  const renderMenus = () => (
    <nav>
      <ul className="space-y-2">
        {menu?.children?.map((menu) => {
          return (
            <React.Fragment key={menu.id}>
              {/* Main Menu */}
              <li
                className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
                  activeMainMenu === menu.id
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-800 text-gray-400"
                }`}
                onClick={() => handleMainMenuClick(menu.id)}
              >
                <Image
                  src={"/folder.png"}
                  alt={`${menu.name} Icon`}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {menu.name}
              </li>

              {/* Submenus */}
              {menu.children
                ?.filter((menu) => menu.children?.length)
                .map((submenu) => (
                  <li
                    key={submenu.id}
                    className={`ml-6 mt-2 px-4 py-2 rounded-lg cursor-pointer flex items-center ${
                      activeSubMenu === submenu.id
                        ? "bg-[#9FF443] text-black shadow"
                        : "hover:bg-gray-800 text-gray-400"
                    }`}
                    onClick={() =>
                      handleSubMenuClick(
                        submenu.id,
                        submenu.name,
                        submenu.parentId
                      )
                    }
                  >
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
        className="fixed left-4 top-4 z-50 rounded-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={MenuIcons} alt="menuIcon" width={30} height={50} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`absolute  inset-y-0 z-50 left-0 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
          <Link href="/" className="text-xl font-bold text-white">
            <Image src={Logo} alt="logo" width={100} height={100} />
          </Link>
          <button
            className="text-gray-400 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <Image src={XLogo} alt="logo" width={30} height={30} />
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
