"use client";
import { cn } from "@/lib/utils";
import useStore from "@/lib/store";
import MenuTrigger from "@/components/MenuTrigger";
import { RefObject, useRef } from "react";
import Icon from "./Icon";

export default function Tab({
  name,
  pageId,
  active,
  icon,
  tabContainerRef,
}: {
  index: number;
  name: string;
  pageId: string;
  icon: string;
  active?: boolean;
  tabContainerRef: RefObject<HTMLDivElement>;
}) {
  const {
    setIsRenaming,
    setActivePage,
    setDialogOpen,
    setContextMenuData,
    setIsContextMenuOpen,
  } = useStore.getState();
  const tabRef = useRef<HTMLDivElement>(null);

  const handleRenamePage = () => {
    setIsRenaming(true);
    setDialogOpen(true);
  };

  const handleClick = () => {
    setActivePage(pageId);
    if (tabRef.current && tabContainerRef.current) {
      const tabRect = tabRef.current.getBoundingClientRect();
      const containerRect = tabContainerRef.current.getBoundingClientRect();

      const relativeX = tabRect.left - containerRect.left;

      setContextMenuData({ x: relativeX });
    }
  };

  const tabStyles = cn(
    "relative inline-flex border border-gray whitespace-nowrap cursor-pointer items-center justify-center gap-1 -tracking-[0.21px]",
    "rounded-lg px-2.5 py-1 text-sm font-medium leading-5",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-light",
    "disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
    active
      ? "bg-white text-dark border border-gray-light shadow-sm"
      : "bg-gray text-gray-darker hover:bg-gray-dark",
    "focus-visible:border-blue focus-visible:ring-offset-0 focus-visibles hadow-focus"
  );

  console.log(icon);

  return (
    <div
      ref={tabRef}
      aria-label={`${name} tab`}
      onClick={() => handleClick()}
      className={tabStyles}
    >
      <span
        className="inline-flex items-center gap-[6px]"
        onDoubleClick={() => handleRenamePage()}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsContextMenuOpen(true);
        }}
      >
        <Icon
          name={icon}
          className={cn(active ? "text-orange" : "text-[#8C93A1]")}
        />

        <span className="max-w-[100px] overflow-hidden text-ellipsis">
          {name}
        </span>
      </span>
      <div
        className={cn(
          "transition-all duration-200 flex items-center",
          active ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <MenuTrigger />
      </div>
    </div>
  );
}
