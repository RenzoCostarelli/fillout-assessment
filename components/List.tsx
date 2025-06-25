"use client";

import { Reorder, AnimatePresence, stagger } from "framer-motion";
import useStore from "@/lib/store";
import Tab from "./Tab";
import { useRef } from "react";

export default function PageList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pages, setPages, setNewPagePosition, setDialogOpen } = useStore();

  function handleAddPage(position: number) {
    setNewPagePosition(position);
    setDialogOpen(true);
  }

  return (
    <div className="relative w-full">
      <div className="w-full" ref={containerRef}>
        <AnimatePresence mode="popLayout">
          <Reorder.Group
            axis="x"
            values={pages}
            onReorder={setPages}
            className="flex w-full"
          >
            {pages.map((page, index) => (
              <Reorder.Item
                key={page.id}
                value={page}
                initial={{ scale: 0.8, opacity: 0, y: -3 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="flex items-center"
              >
                <Tab
                  name={page.name}
                  pageId={page.id}
                  active={page.active}
                  icon={page.icon}
                  index={index}
                  tabContainerRef={
                    containerRef as React.RefObject<HTMLDivElement>
                  }
                />

                {pages.length - 1 > index && (
                  <button
                    className="group hover:px-4 px-3 transition-all cursor-pointer"
                    onClick={() => handleAddPage(index + 1)}
                  >
                    <span className="flex items-center w-4 justify-center border border-gray-light aspect-square text-black rounded-full bg-white shadow-md overflow-hidden opacity-0 -rotate-45 group-hover:rotate-0 group-hover:opacity-100 transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M4 1.167v2.833M4 4v2.833M4 4H1.167M4 4h2.833"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </AnimatePresence>
      </div>
    </div>
  );
}
