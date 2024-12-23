import { Menu } from "app/store/menuSlice";
import React from "react";

interface MenuTreeProps {
  menus: Menu[];
  onAdd: (menu: Menu) => void;
  onEdit: (menu: Menu) => void;
  onDelete: (id: string) => void;
}

const MenuTree: React.FC<MenuTreeProps> = ({
  menus,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const renderTree = (menuList: Menu[]) => {
    return menuList.map((menu) => (
      <li key={menu.id} className="ml-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">{menu.name}</span>
          <div className="space-x-2">
            <button
              onClick={() => onAdd(menu)}
              className="text-blue-500 hover:underline text-sm"
            >
              Add
            </button>
            <button
              onClick={() => onEdit(menu)}
              className="text-green-500 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(menu.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        </div>
        {menu.children && menu.children.length > 0 && (
          <ul className="ml-6 mt-2 border-l border-gray-300 pl-4">
            {renderTree(menu.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Menu Structure</h2>
      <ul>{renderTree(menus)}</ul>
    </div>
  );
};

export default MenuTree;
