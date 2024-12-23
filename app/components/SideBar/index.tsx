import React, { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  onSelectMainMenu?: (menu: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelectMainMenu }) => {
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

  return (
    <aside className="h-screen w-64 bg-[#0F172A] text-white flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl font-bold">CLOIT</span>
        <button className="text-xl">&#9776;</button>
      </div>
      <nav>
        <ul className="space-y-2">
          <li
            className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
              activeMainMenu === "Systems"
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
            onClick={() => handleMainMenuClick("Systems")}
          >
            <Image
              src="/folder.png"
              alt="Systems Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Systems
          </li>
          {activeMainMenu === "Systems" &&
            [
              { name: "System Code" },
              { name: "Properties" },
              { name: "Menus" },
              { name: "API List" },
            ].map((submenu) => (
              <li
                key={submenu.name}
                className={`pl-8 px-4 py-2 rounded-lg cursor-pointer flex items-center ${
                  activeSubMenu === submenu.name
                    ? "bg-[#9FF443] text-black"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => handleSubMenuClick(submenu.name)}
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
          <li
            className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
              activeMainMenu === "Users & Group"
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
            onClick={() => handleMainMenuClick("Users & Group")}
          >
            <Image
              src="/folder.png"
              alt="Users & Group Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Users & Group
          </li>
          <li
            className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
              activeMainMenu === "Competition"
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
            onClick={() => handleMainMenuClick("Competition")}
          >
            <Image
              src="/folder.png"
              alt="Competition Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Competition
          </li>
        </ul>
      </nav>
    </aside>
  );
};
