"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { addMenu, fetchMenus, Menu } from "app/store/menuSlice";
import { useAppDispatch } from "app/hooks/dispatch";
import { Sidebar } from "app/components/SideBar";
import axios from "axios";
import MenuHeader from "app/components/MenuHeader";
import { MenuFileTree } from "app/components/MenuFileTree";
import FormMenu from "app/components/FormMenu";
import { Menu as MenuIcon } from "lucide-react";

const MenusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [openedMenu, setOpenedSubMenu] = useState<string>("");
  const { menus, loading } = useSelector((state: RootState) => state.menu);

  async function fetchMenu() {
    const response = await axios.get(`https://hyperhire-api.onrender.com/menus
      `);
    console.log("direct", response.data);
  }

  useEffect(() => {
    fetchMenu();
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleAdd = async (parentId: string, name: string) => {
    console.log("Add Menu", parentId, name);
    dispatch(
      addMenu({
        name,
        parentId,
      })
    );
    dispatch(fetchMenus());
    setSelectedMenu(null);
  };

  return (
    <div className="flex bg-white text-black h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar menus={menus} onSelectSubMenu={setOpenedSubMenu} />
      </div>

      {/* Main Content */}
      <div className="w-full hide-scrollbar overflow-y-scroll">
        <div className="grid grid-cols-1 w-full md:grid-cols-2">
          <MenuHeader menu={openedMenu} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="w-[450px] hide-scrollbar overflow-y-scroll">
            <MenuFileTree menus={menus} onAdd={setSelectedMenu} />
          </div>
          {selectedMenu && (
            <div className="w-full p-4 ">
              <FormMenu menu={selectedMenu} onSubmit={handleAdd} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenusPage;
