"use client";

import Alert from "@/components/Alert";
import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Trash from "@/app/assets/icons/trash.svg";

import Icon from "@/components/Icon";

interface MenuItem {
  label: string;
  onClick: () => void;
  icon: string;
}

export default function ContextMenu({
  pagePosition,
}: {
  pagePosition?: number;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {
    movePage,
    clonePage,
    setIsRenaming,
    setDialogOpen,
    activePage,
    isContextMenuOpen,
    setIsContextMenuOpen,
    contextMenuData,
  } = useStore.getState();

  const handleOpenAlert = () => {
    setIsAlertOpen(true);
    setIsContextMenuOpen(false);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleMoveToFirst = () => {
    if (pagePosition !== undefined) {
      movePage(pagePosition, 0);
    }
    setIsContextMenuOpen(false);
  };

  const handleClonePage = () => {
    if (activePage) {
      clonePage(activePage);
    }
    setIsContextMenuOpen(false);
  };

  const handleRenamePage = () => {
    setIsRenaming(true);
    setDialogOpen(true);
    setIsContextMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsContextMenuOpen(false);
      }
    }

    if (isContextMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isContextMenuOpen]);

  const menuItems: MenuItem[] = [
    {
      label: "Set as first page",
      onClick: () => handleMoveToFirst(),
      icon: "flag",
    },
    { label: "Rename", onClick: () => handleRenamePage(), icon: "rename" },
    { label: "Copy", onClick: () => console.log("Copy"), icon: "copy" },
    { label: "Duplicate", onClick: () => handleClonePage(), icon: "duplicate" },
  ];

  return (
    <>
      <div
        ref={menuRef}
        className={cn(
          "absolute border transition-all origin-bottom cursor-default border-gray-light flex flex-col bottom-9 bg-white rounded-lg shadow-sm w-56 h-auto items-start justify-start",
          isContextMenuOpen ? "scale-y-100 z-20" : "scale-y-0"
        )}
        style={{
          left: contextMenuData?.x ?? 0,
        }}
      >
        <div className="bg-gray-50 border-b-[0.5px] border-gray-light px-4 py-2 w-full">
          <span className="font-medium ">Settings</span>
        </div>
        <ul className="space-y-1 p-1 text-left font-medium text-xs w-full whitespace-nowrap">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center px-3 justify-start text-left gap-2 cursor-pointer hover:bg-gray-100 py-2 rounded"
              onClick={item.onClick}
            >
              <Icon name={item.icon} />
              <span className="text-gray-800">{item.label}</span>
            </li>
          ))}
          <hr className="border-t-gray-light " />
          {activePage && (
            <li
              onClick={() => handleOpenAlert()}
              className={cn(
                activePage === "ending" && "opacity-50 pointer-events-none",
                "flex text-red items-center font-medium px-3 justify-start text-left gap-2 cursor-pointer hover:bg-gray-100 py-2 rounded"
              )}
            >
              <Trash />
              <span>Delete</span>
            </li>
          )}
        </ul>
      </div>
      {isAlertOpen && activePage && (
        <Alert
          isOpen={isAlertOpen}
          pageId={activePage}
          toggleOpen={() => handleCloseAlert()}
        />
      )}
      {/* To prevent clicking on another element while the context menu is open */}
      {isContextMenuOpen && (
        <div className="fixed w-screen h-screen inset-0 z-10 cursor-default"></div>
      )}
    </>
  );
}
