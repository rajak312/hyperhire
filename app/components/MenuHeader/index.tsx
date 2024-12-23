import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import AppsIcon from "app/assets/apps.svg";
import fileIcons from "app/assets/file.svg";
import Image from "node_modules/next/image";

export default function MenuHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6 w-full mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link
              href="#"
              className="hover:text-gray-700 flex items-center justify-center gap-4">
              <Image src={fileIcons} alt="file" width={20} height={20} /> /
              Menus
            </Link>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
          <Image src={AppsIcon} alt="file" width={30} height={30} />
        </div>
        <h1 className="text-2xl font-semibold">Menus</h1>
      </div>

      {/* Menu Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Menu</h2>

        {/* Menu Item */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <span className="text-sm font-medium">system management</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
