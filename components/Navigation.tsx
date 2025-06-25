"use client";
import useStore from "@/lib/store";
import AddPageButton from "./AddPageButton";
import List from "./List";
import { useEffect, useRef, useState } from "react";
import ContextMenu from "@/components/ContextMenu";
import { motion } from "framer-motion";
import Icon from "./Icon";

export default function Navigation() {
  const { pages } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setShowArrows(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [pages.length]);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    const amount = 150;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex w-full justify-between relative">
      {pages.length > 0 && (
        <div className="w-full overflow-hidden pr-2" ref={containerRef}>
          <List />
        </div>
      )}
      <div>
        <div className="flex items-center">
          {showArrows && (
            <div className="flex items-center">
              <button
                onClick={() => scroll("left")}
                aria-hidden="true"
                className="z-10 bg-background px-2 py-1 rounded-sm cursor-pointer"
              >
                <Icon
                  name="chevron"
                  className="h-5 rotate-180 text-gray-light hover:text-dark transition-colors"
                />
              </button>
              <button
                onClick={() => scroll("right")}
                ria-hidden="true"
                className="-10 bg-background px-2 py-1 rounded-sm cursor-pointer"
              >
                <Icon
                  name="chevron"
                  className="h-5 text-gray-light hover:text-dark transition-colors"
                />
              </button>
            </div>
          )}
          <AddPageButton />
        </div>
      </div>
      <ContextMenu />
      <div className="absolute w-full h-full inset-0 flex items-center -z-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
          }}
          className="h-[1.5px] w-full border border-dashed border-gray-light"
        ></motion.div>
      </div>
    </div>
  );
}
