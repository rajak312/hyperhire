import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "app/store/menuSlice";

interface SidebarProps {
  menus: Menu[];
  onSelectMainMenu?: (menu: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menus,
  onSelectMainMenu,
}) => {
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

  function renderMenus() {
    return (
      <nav>
        <ul className="space-y-2">
          {menus?.map((menu) => {
            console.log("childrens", menu.children);
            const isRootMenu = menu.depth === 0;
            const image = isRootMenu ? "/folder.png" : "/submenu.png";
            return (
              <React.Fragment key={menu.id}>
                <li
                  key={menu.id}
                  className={`px-4 py-2 rounded-lg cursor-pointer flex items-center ${
                    activeMainMenu === menu.name
                      ? "text-white"
                      : "hover:bg-gray-800 text-gray-400"
                  }`}
                  onClick={() => handleMainMenuClick(menu.name)}
                >
                  <Image
                    src={image}
                    alt={`${menu.name} Icon`}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {menu.name}
                </li>
                {menu.children?.map((submenu) => (
                  <li
                    key={submenu.id}
                    className={`mt-2 px-4 py-2 rounded-lg cursor-pointer flex items-center ${
                      activeSubMenu === submenu.name
                        ? "bg-[#9FF443] text-black shadow"
                        : "hover:bg-gray-800 text-gray-400"
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
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <aside className="h-screen w-64 bg-[#0F172A] text-white flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center justify-between mb-6">
        <Image
          src="/logo.png"
          alt="CLOIT Logo"
          width={80}
          height={40}
          className="rounded-lg"
        />
        <Image
          src="/menu.png"
          alt="menu"
          width={40}
          height={40}
          className="rounded-lg"
        />
      </div>

      {/* Menu Items */}
      {renderMenus()}
    </aside>
  );
};
