"use client";

import { Menu } from "app/store/menuSlice";
import React from "react";

const dummyMenus: Menu[] = [
  {
    id: "1",
    name: "System Management",
    depth: 0,
    parentId: null,
    children: [
      {
        id: "2",
        name: "Systems",
        depth: 1,
        parentId: "1",
        children: [
          {
            id: "3",
            name: "System Code",
            depth: 2,
            parentId: "2",
            children: [
              {
                id: "4",
                name: "Code Registration",
                depth: 3,
                parentId: "3",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "5",
        name: "API List",
        depth: 1,
        parentId: "1",
        children: [
          {
            id: "6",
            name: "API Registration",
            depth: 2,
            parentId: "5",
            children: [],
          },
        ],
      },
    ],
  },
];

interface TreeProps {
  menus?: Menu[];
  onSelect?: (menu: any) => void; // Function to handle selection of a menu
}

export const Tree: React.FC<TreeProps> = ({ menus, onSelect }) => {
  // Recursive function to render the tree structure
  menus = dummyMenus;
  const renderTree = (menuList: typeof dummyMenus) => {
    return menuList.map((menu) => (
      <li key={menu.id} className="ml-4">
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-medium text-gray-900 cursor-pointer"
            onClick={() => onSelect?.(menu)}
          >
            {menu.name}
          </span>
        </div>
        {menu.children && menu.children.length > 0 && (
          <ul className="ml-4 border-l border-gray-300 pl-4">
            {renderTree(menu.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Menu Tree</h2>
      <ul>{renderTree(menus)}</ul>
    </div>
  );
};
