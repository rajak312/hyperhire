"use client"; // Client-side rendering

import React from "react";
import MenuTree from "../components/MenuTree";

// Demo menu data
const demoMenus = [
  {
    id: "1",
    name: "System Management",
    depth: 1,
    parentId: null,
    children: [
      {
        id: "2",
        name: "Systems",
        depth: 2,
        parentId: "1",
        children: [
          {
            id: "3",
            name: "System Code",
            depth: 3,
            parentId: "2",
            children: [],
          },
          {
            id: "4",
            name: "Code Registration",
            depth: 3,
            parentId: "2",
            children: [],
          },
        ],
      },
    ],
  },
];

const Menus: React.FC = () => {
  return <MenuTree menus={demoMenus} />;
};

export default Menus;
