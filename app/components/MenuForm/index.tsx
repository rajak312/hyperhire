"use client";

import { Menu } from "app/store/menuSlice";
import React, { useState } from "react";

interface MenuFormProps {
  isEdit: boolean;
  initialData?: Partial<Menu>;
  onSubmit: (menuData: Partial<Menu>) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  isEdit,
  initialData,
  onSubmit,
}) => {
  const [menuName, setMenuName] = useState(initialData?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...initialData, name: menuName });
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Menu" : "Add Menu"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Menu ID
          </label>
          <input
            type="text"
            value={initialData?.id || ""}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Depth
          </label>
          <input
            type="text"
            value={initialData?.depth || ""}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parent Data
          </label>
          <input
            type="text"
            value={initialData?.parentId || ""}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
