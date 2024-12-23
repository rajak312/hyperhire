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
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <select
            className="bg-white border-gray-300 text-sm rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="systemmanagement"
          >
            <option value="systemmanagement">System Management</option>
            {/* Add more options as needed */}
          </select>
        </header>

        {/* Toolbar */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
            onClick={() => alert("Expand all clicked")}
          >
            Expand All
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300"
            onClick={() => alert("Collapse all clicked")}
          >
            Collapse All
          </button>
        </div>

        <div className="flex">
          {/* Tree View */}
          <section className="w-1/2 bg-white rounded-md shadow-md p-4">
            {loading ? (
              <p>Loading menus...</p>
            ) : (
              <MenuTree
                menus={menus}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </section>

          {/* Form */}
          <section className="w-1/2 ml-6 bg-white rounded-md shadow-md p-4">
            {showForm ? (
              <MenuForm
                isEdit={!!currentMenu?.id}
                initialData={currentMenu}
                onSubmit={handleSubmit}
              />
            ) : (
              <div className="text-center text-gray-500">
                <p>Select a menu item to view details or create a new one.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default MenusPage;
