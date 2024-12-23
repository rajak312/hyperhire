"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { fetchMenus, Menu } from "app/store/menuSlice";
import { useAppDispatch } from "app/hooks/dispatch";
import MenuForm from "app/components/MenuForm";
import { MenuTree } from "app/components/MenuTree";
import { Sidebar } from "app/components/SideBar";
import { TreeMenu } from "app/components/MenuTree";

const MenusPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { menus, loading } = useSelector((state: RootState) => state.menu);

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
      <Sidebar />

      {/* Main Content */}
      <TreeMenu />
    </div>
  );
};

export default MenusPage;
