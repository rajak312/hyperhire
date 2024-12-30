"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import {
  addMenu,
  deleteMenu,
  fetchMenuById,
  fetchMenus,
  fetchMenuTreeById,
  Menu,
  updateMenu,
} from "app/store/menuSlice";
import { useAppDispatch } from "app/hooks/dispatch";
import { Sidebar } from "app/components/SideBar";
import MenuHeader from "app/components/MenuHeader";
import { MenuFileTree } from "app/components/MenuFileTree";
import FormMenu from "app/components/FormMenu";
import axios from "axios";
import { Loader } from "app/components/Loader";

const MenusPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [openedMenu, setOpenedSubMenu] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const { menus, loading, menuTree } = useSelector(
    (state: RootState) => state.menu
  );

  // async function fetchData() {
  //   const res = await axios.get("https://hyperhire-api.onrender.com/menus");

  //   console.log("data", res.data);
  // }

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleSubmit = async (id: string, name: string) => {
    if (isEdit) {
      dispatch(
        updateMenu({
          id,
          name,
        })
      );
    } else {
      dispatch(
        addMenu({
          name,
          parentId: id,
        })
      );
    }
    dispatch(fetchMenus());
    dispatch(fetchMenuTreeById(selectedMenuId));
    setSelectedMenu(null);
    setIsEdit(false);
  };

  function handleMenuChange(id: string) {
    setSelectedMenuId(id);
    setSelectedMenu(menus?.find((menu) => menu.id === id) || null);
    dispatch(fetchMenuTreeById(id));
    dispatch(fetchMenus());
  }

  function handleAdd(menu: Menu, isEdit = false) {
    setSelectedMenu(menu);
    setIsEdit(isEdit);
  }

  function handleDelete(id: string) {
    dispatch(deleteMenu(id));
    dispatch(fetchMenus());
  }

  return (
    <div className="flex bg-white text-black h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar
          menu={menuTree}
          onSelectSubMenu={setOpenedSubMenu}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      {/* Main Content */}
      <div className="w-full hide-scrollbar overflow-y-scroll">
        <div className="grid grid-cols-1 w-full md:grid-cols-2">
          <MenuHeader
            menu={openedMenu}
            menus={menus}
            onMenuChange={handleMenuChange}
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="w-[450px] hide-scrollbar overflow-y-scroll">
              <MenuFileTree
                isOpen={isOpen}
                onAdd={handleAdd}
                selectedMenu={selectedMenu}
                menu={menuTree}
              />
            </div>
            {selectedMenu && (
              <div className="w-full p-4 ">
                <FormMenu
                  menus={menus}
                  menu={selectedMenu}
                  onSubmit={handleSubmit}
                  isEdit={isEdit}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenusPage;
