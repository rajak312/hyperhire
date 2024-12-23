"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { fetchMenus, Menu } from "app/store/menuSlice";
import { useAppDispatch } from "app/hooks/dispatch";
import MenuForm from "app/components/MenuForm";
import { Sidebar } from "app/components/SideBar";
import axios from "axios";
import MenuHeader from "app/components/MenuHeader";
import { MenuFileTree } from "app/components/MenuFileTree";
import FormMenu from "app/components/FormMenu";

const MenusPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { menus, loading } = useSelector((state: RootState) => state.menu);

  console.log("Menus", menus);

  const [currentMenu, setCurrentMenu] = useState<Partial<Menu> | undefined>(
    undefined
  );
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleAdd = (parentId: string): void => {
    setCurrentMenu({ parentId, depth: 1 });
    setShowForm(true);
  };

  const handleEdit = (menu: Menu): void => {
    setCurrentMenu(menu);
    setShowForm(true);
  };

  const handleDelete = (id: string): void => {
    // Logic to delete the menu
  };

  const handleSubmit = (menuData: Partial<Menu>): void => {
    // Logic to handle menu submission
    setShowForm(false);
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
            <MenuFileTree />
          </div>
          <FormMenu />
        </div>
      </div>
    </div>
  );
};

export default MenusPage;
