import * as React from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import cn from "classnames";
import { Menu } from "app/store/menuSlice";

function getAllItemIds(items: Menu[]): string[] {
  return items.reduce((acc: string[], item) => {
    acc.push(item.id);
    if (item.children) {
      acc.push(...getAllItemIds(item.children));
    }
    return acc;
  }, []);
}

export interface MenuFileTreeProps {
  menu?: Menu;
  isOpen: boolean;
  onAdd?: (menu: Menu, isEdit?: boolean) => void;
  selectedMenu: Menu | null;
}

export function MenuFileTree({
  menu,
  onAdd,
  isOpen,
  selectedMenu,
}: MenuFileTreeProps) {
  const [selectedButton, setSelectedButton] = React.useState("expand");
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );
  const menus = menu ? [menu] : [];

  React.useEffect(() => {
    handleExpandAll();
  }, [menu]);

  const handleToggle = (itemId: string) => {
    setExpandedItems((prevExpandedItems) => {
      const newExpanded = new Set(prevExpandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      return newExpanded;
    });
  };

  const handleExpandAll = () => {
    const allIds = getAllItemIds(menus);
    setExpandedItems(new Set(allIds));
    setSelectedButton("expand");
  };

  const handleCollapseAll = () => {
    setExpandedItems(new Set());
    setSelectedButton("collapse");
  };

  const renderTreeItems = (
    items: Menu[],
    level = 0,
    parentLines: boolean[] = []
  ) => {
    return items.map((item, index) => {
      const isLastItem = index === items.length - 1;
      const hasChildren = item.children && item.children.length > 0;
      const currentLines = [...parentLines, !isLastItem];

      return (
        <div key={item.id} className="flex flex-col mb-2">
          {/* Added margin-bottom for more gap */}
          <div className="flex items-center">
            {parentLines.map((showLine, i) => (
              <div
                key={i}
                className={cn(
                  "w-4 h-6 relative",
                  isOpen && "hidden",
                  showLine &&
                    "before:absolute before:top-0 before:left-1/2 before:border-l  before:border-border before:h-full"
                )}
              />
            ))}
            <div
              className={`w-4 h-6 relative z-0 before:absolute before:top-0 before:left-1/2 before:border-l before:border-border after:absolute after:top-1/2 after:left-1/2 after:border-t after:border-border after:w-1/2 ${
                isLastItem ? "before:h-1/2 " : "before:h-full "
              } ${isOpen && "hidden"}`}
            />
            <div className="flex items-center gap-1 py-1 pr-2 hover:bg-accent rounded-sm cursor-pointer select-none">
              {hasChildren ? (
                <span onClick={() => handleToggle(item.id)}>
                  {expandedItems.has(item.id) ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                </span>
              ) : (
                <div className="w-4" />
              )}
              <span
                style={{ cursor: "pointer" }}
                className="text-sm"
                onClick={() => onAdd?.(item, true)}
              >
                {item.name}
              </span>
              {selectedMenu?.id === item.id && (
                <button
                  className="ml-auto h-4 flex justify-center items-center w-4 rounded-full bg-blue-500 p-0 text-white hover:bg-blue-600"
                  onClick={() => onAdd?.(item)}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Add</span>
                </button>
              )}
            </div>
          </div>
          {hasChildren && expandedItems.has(item.id) && item.children && (
            <div className="flex flex-col">
              {renderTreeItems(item.children, level + 1, currentLines)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          className={`${
            selectedButton === "expand" ? "bg-[#1D2939] text-white" : "border"
          }  p-2 pl-8 pr-8 rounded-full`}
          onClick={handleExpandAll}
        >
          Expand All
        </button>
        <button
          className={`${
            selectedButton === "collapse" ? "bg-[#1D2939] text-white" : "border"
          } border p-2  pl-8 pr-8  rounded-full`}
          onClick={handleCollapseAll}
        >
          Collapse All
        </button>
      </div>
      <div className="flex flex-col">{renderTreeItems(menus)}</div>
    </div>
  );
}
