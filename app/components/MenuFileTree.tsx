import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
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
  menus: Menu[];
}

export function MenuFileTree({ menus }: MenuFileTreeProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );

  const handleToggle = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleExpandAll = () => {
    const allIds = getAllItemIds(menus);
    setExpandedItems(new Set(allIds));
  };

  const handleCollapseAll = () => {
    setExpandedItems(new Set());
  };

  const renderTreeItems = (
    items: Menu[],
    level = 0,
    parentLines: boolean[] = []
  ) => {
    return menus?.map((item, index) => {
      const isLastItem = index === items.length - 1;
      const hasChildren = item.children && item.children.length > 0;
      const currentLines = [...parentLines, !isLastItem];

      return (
        <div key={item.id} className="flex  flex-col">
          <div className="flex items-center">
            {parentLines.map((showLine, i) => (
              <div
                key={i}
                className={cn(
                  "w-4 h-6 relative",
                  showLine &&
                    "before:absolute before:top-0 before:left-1/2 before:border-l before:border-border before:h-full"
                )}
              />
            ))}
            <div
              className={cn(
                "w-4 h-6 relative",
                "before:absolute before:top-0 before:left-1/2 before:border-l before:border-border",
                "after:absolute after:top-1/2 after:left-1/2 after:border-t after:border-border after:w-1/2",
                isLastItem ? "before:h-1/2" : "before:h-full"
              )}
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
              <span className="text-sm">{item.name}</span>
              {/* {item.info && (
                <button className="ml-auto h-4 flex justify-center items-center w-4 rounded-full bg-blue-500 p-0 text-white hover:bg-blue-600">
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Add</span>
                </button>
              )} */}
            </div>
          </div>
          {hasChildren && expandedItems.has(item.id) && (
            <div className="flex flex-col">
              {renderTreeItems(item.children!, level + 1, currentLines)}
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
          className="bg-[#1D2939] text-white p-2 rounded-full"
          onClick={handleExpandAll}
        >
          Expand All
        </button>
        <button className="border p-2 rounded-full" onClick={handleCollapseAll}>
          Collapse All
        </button>
      </div>
      <div className="flex flex-col">{renderTreeItems(menus)}</div>
    </div>
  );
}
