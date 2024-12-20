import React, { useState } from "react";

// Define Menu interface
interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
  children: Menu[];
}

interface MenuTreeProps {
  menus: Menu[];
}

const MenuTree: React.FC<MenuTreeProps> = ({ menus }) => {
  const [localMenus, setLocalMenus] = useState<Menu[]>(menus);

  // Function to add a new item
  const handleAddItem = (parentId: string | null) => {
    const newMenu: Menu = {
      id: Math.random().toString(), // Generate random ID for demo purposes
      name: "New Item",
      depth: parentId ? 2 : 1, // Increment depth for child items
      parentId,
      children: [],
    };

    // Helper function to add a new item to the last position of a parent's children
    const addToLastLayer = (items: Menu[]): Menu[] => {
      if (!parentId) {
        // Add as a root-level item if no parentId
        return [...items, newMenu];
      }
      return items.map((item) => {
        if (item.id === parentId) {
          const updatedChildren = [...item.children, newMenu];
          return { ...item, children: updatedChildren };
        }
        if (item.children.length > 0) {
          return { ...item, children: addToLastLayer(item.children) };
        }
        return item;
      });
    };

    const updatedMenus = addToLastLayer(localMenus);
    setLocalMenus(updatedMenus);
  };

  // Render the menu tree
  const renderTree = (items: Menu[]) => {
    return items.map((menu) => (
      <li key={menu.id} className="mb-2">
        {menu.name}
        <button
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleAddItem(menu.id)}
        >
          Add +
        </button>
        {menu.children.length > 0 && (
          <ul className="pl-4">{renderTree(menu.children)}</ul>
        )}
      </li>
    ));
  };

  return <ul>{renderTree(localMenus)}</ul>;
};

export default MenuTree;
