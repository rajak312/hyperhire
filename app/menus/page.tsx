"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { fetchMenus, Menu } from "app/store/menuSlice";
import { useAppDispatch } from "app/hooks/dispatch";
import MenuForm from "app/components/MenuForm";
import MenuTree from "app/components/MenuTree";
import { Sidebar } from "app/components/SideBar";

const MenusPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { menus, loading } = useSelector((state: RootState) => state.menu);

  const [currentMenu, setCurrentMenu] = useState<Partial<Menu> | null>(null);
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

  const handleDelete = (id: string): void => {};

  const handleSubmit = (menuData: Partial<Menu>): void => {
    setShowForm(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="w-3/4 p-4">
        <h1 className="text-xl font-bold">Menu Management</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MenuTree
            menus={menus}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {showForm && (
          <MenuForm
            isEdit={!!currentMenu?.id}
            initialData={currentMenu}
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
};

export default MenusPage;
