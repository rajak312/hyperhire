import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import AppsIcon from "app/assets/apps.svg";
import fileIcons from "app/assets/file.svg";
import Image from "node_modules/next/image";
import { Menu } from "app/store/menuSlice";

export interface MenuHeaderProps {
  menu?: string;
  menus: Menu[];
  onMenuChange: (id: string) => void;
}

export default function MenuHeader({
  menu = "",
  menus,
  onMenuChange,
}: MenuHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | undefined>();

  function handleChange(id: string) {
    onMenuChange(id);
    setSelectedMenu(menus.find((menu) => menu.id === id));
  }

  useEffect(() => {
    if (!menus.length || selectedMenu) return;
    handleChange(menus[0].id);
  }, [menus]);

  return (
    <div className="p-6 w-full mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link
              href="#"
              className="hover:text-gray-700 flex items-center justify-center gap-4"
            >
              <Image src={fileIcons} alt="file" width={20} height={20} /> /
              {menu}
            </Link>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
          <Image src={AppsIcon} alt="file" width={30} height={30} />
        </div>
        <h1 className="text-2xl font-semibold">{menu}</h1>
      </div>

      {/* Menu Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">{menu}</h2>
        {/* Dropdown using select and option */}
        <select
          className="w-full p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedMenu?.name}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {menus?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        {/* Menu Item
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-medium">system management</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button> */}
      </div>
    </div>
  );
}
