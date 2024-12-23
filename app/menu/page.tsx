"use client";
import React, { useState } from "react";

export interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId?: string | null;
  children?: Menu[];
  createdAt?: string;
  updatedAt?: string;
}

const dummyMenuData: Menu[] = [
  {
    id: "1",
    name: "System Management",
    depth: 0,
    children: [
      {
        id: "1-1",
        name: "Systems",
        depth: 1,
        children: [
          {
            id: "1-1-1",
            name: "System Code",
            depth: 2,
            children: [
              {
                id: "1-1-1-1",
                name: "Code Registration",
                depth: 3,
              },
            ],
          },
          {
            id: "1-1-2",
            name: "Code Registration - 2",
            depth: 2,
          },
          {
            id: "1-1-3",
            name: "Properties",
            depth: 2,
          },
          {
            id: "1-1-4",
            name: "Menus",
            depth: 2,
            children: [
              {
                id: "1-1-4-1",
                name: "Menu Registration",
                depth: 3,
              },
            ],
          },
          {
            id: "1-1-5",
            name: "API List",
            depth: 2,
            children: [
              {
                id: "1-1-5-1",
                name: "API Registration",
                depth: 3,
              },
              {
                id: "1-1-5-2",
                name: "API Edit",
                depth: 3,
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        name: "Users & Groups",
        depth: 1,
        children: [
          {
            id: "1-2-1",
            name: "Users",
            depth: 2,
            children: [
              {
                id: "1-2-1-1",
                name: "User Account Registration",
                depth: 3,
              },
            ],
          },
          {
            id: "1-2-2",
            name: "Groups",
            depth: 2,
            children: [
              {
                id: "1-2-2-1",
                name: "User Group Registration",
                depth: 3,
              },
            ],
          },
        ],
      },
      {
        id: "1-3",
        name: "사용자 승인",
        depth: 1,
        children: [
          {
            id: "1-3-1",
            name: "사용자 승인 상세",
            depth: 2,
          },
        ],
      },
    ],
  },
];

const MenuComponent: React.FC = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]
    );
  };

  const renderMenu = (menus: Menu[], depth: number = 0) => {
    return menus.map((menu) => (
      <div key={menu.id} className={`ml-${depth * 4}`}>
        <button
          onClick={() => toggleMenu(menu.id)}
          className="flex items-center w-full text-gray-700 hover:text-blue-600">
          {menu.children && (
            <span className="mr-2">
              {expandedMenus.includes(menu.id) ? "▾" : "▸"}
            </span>
          )}
          <span>{menu.name}</span>
        </button>
        {menu.children && expandedMenus.includes(menu.id) && (
          <div className="ml-4">{renderMenu(menu.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="p-4 w-64 bg-gray-50 shadow-md">
      {renderMenu(dummyMenuData)}
    </div>
  );
};

export default MenuComponent;
