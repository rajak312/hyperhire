"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { addMenu, fetchMenus, Menu } from "app/store/menuSlice";
import { useAppDispatch } from "app/hooks/dispatch";
import MenuForm from "app/components/MenuForm";
import { Sidebar } from "app/components/SideBar";
import axios from "axios";
import MenuHeader from "app/components/MenuHeader";
import { MenuFileTree } from "app/components/MenuFileTree";
import FormMenu from "app/components/FormMenu";

const MenusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const { menus, loading } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
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
        <Sidebar menus={menus} />
      </div>

      {/* Main Content */}
      <div className="w-full hide-scrollbar overflow-y-scroll">
        <MenuHeader />
        <div className="flex w-full items-center">
          <div className="w-[450px] hide-scrollbar overflow-y-scroll">
            <MenuFileTree menus={menus} onAdd={setSelectedMenu} />
          </div>
          {selectedMenu && (
            <FormMenu menu={selectedMenu} onSubmit={handleAdd} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenusPage;
