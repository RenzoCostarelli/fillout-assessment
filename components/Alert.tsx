"use client";

import useStore from "@/lib/store";
import { AlertTriangle, Trash } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

interface AlertProps {
  isOpen: boolean;
  pageId: string;
  toggleOpen: () => void;
}

export default function Alert({ isOpen, pageId, toggleOpen }: AlertProps) {
  const alertRef = useRef<HTMLDialogElement>(null);
  const { deletePage, setIsContextMenuOpen, pages } = useStore.getState();
  const p = pages.find((page) => page.id === pageId);
  const closeDialog = () => {};

  const handleDeletePage = () => {
    deletePage(pageId);
    setIsContextMenuOpen(false);
    toggleOpen();
  };

  return (
    <dialog ref={alertRef} onClose={closeDialog} open={isOpen}>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
        <motion.div
          className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md relative"
          initial={{ opacity: 0.8, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {p && (
            <>
              <div className="flex gap-2 items-center">
                <div className="bg-yellow-200 p-2 rounded-full text-orange">
                  <AlertTriangle />
                </div>
                <div>
                  <span className="font-medium text-dark">
                    Delete {p.name}?
                  </span>
                  <p className="text-sm">
                    All content from this page will be removed.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-white border border-gray-light px-2.5 py-1 rounded-md cursor-pointer"
                  type="button"
                  onClick={() => toggleOpen()}
                >
                  No
                </button>
                <button
                  type="button"
                  className="relative inline-flex border border-gray whitespace-nowrap cursor-pointer items-center justify-center gap-1 -tracking-[0.21px] bg-red text-white px-2.5 py-1 rounded-md"
                  onClick={() => handleDeletePage()}
                >
                  <Trash />
                  Yes
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </dialog>
  );
}
