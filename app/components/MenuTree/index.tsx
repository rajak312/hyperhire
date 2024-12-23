import { Menu } from "app/store/menuSlice";
import React from "react";

interface MenuTreeProps {
  menus: Menu[];
  onAdd: (parentId: string) => void;
  onEdit: (menu: Menu) => void;
  onDelete: (id: string) => void;
}

const MenuTree: React.FC<MenuTreeProps> = ({
  menus,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const renderTree = (menuList: Menu[], parentId: string | null = null) => {
    return (
      <ul>
        {menuList
          .filter((menu) => menu.parentId === parentId)
          .map((menu) => (
            <li key={menu.id} className="pl-4">
              <div className="flex justify-between items-center">
                <span>{menu.name}</span>
                <div>
                  <button
                    className="px-2 py-1 text-sm text-blue-600"
                    onClick={() => onAdd(menu.id)}
                  >
                    Add
                  </button>
                  <button
                    className="px-2 py-1 text-sm text-green-600"
                    onClick={() => onEdit(menu)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-sm text-red-600"
                    onClick={() => onDelete(menu.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {renderTree(menuList, menu.id)}
            </li>
          ))}
      </ul>
    );
  };

  return <div>{renderTree(menus)}</div>;
};

export default MenuTree;
