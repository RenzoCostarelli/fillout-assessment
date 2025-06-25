"use client";
import useStore from "@/lib/store";
import { useEffect, useRef, useState } from "react";

export default function AddPageDialog({ position }: { position?: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState({ name: "" });

  const {
    addPage,
    setDialogOpen,
    setIsRenaming,
    isDialogOpen,
    newPagePosition,
    isRenaming,
    activePage,
    pages,
  } = useStore();

  useEffect(() => {
    if (isRenaming && activePage) {
      const activePageData = pages.find((page) => page.id === activePage);
      if (activePageData) {
        setForm({ name: activePageData.name });
      }
    }
  }, [isRenaming, activePage, pages]);

  useEffect(() => {
    if (isDialogOpen) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [isDialogOpen]);

  function handleAddPage(position: number, label: string) {
    addPage(
      { name: label, content: "", icon: "file", active: false },
      position
    );
  }
  function openDialog() {
    dialogRef.current?.show();
  }

  function closeDialog() {
    setForm({ name: "" });
    setIsRenaming(false);
    setDialogOpen(false);
    dialogRef.current?.close();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.name.trim() === "") return;
    if (isRenaming && activePage) {
      useStore.getState().renamePage(activePage, form.name);
      setForm({ name: "" });
      setIsRenaming(false);
      closeDialog();
      return;
    }

    const newPosition = newPagePosition ?? pages.length + 1;
    handleAddPage(newPosition, form.name);
    setForm({ name: "" });
    closeDialog();
  }

  return (
    <>
      <dialog ref={dialogRef} onClose={closeDialog}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
          <div className="w-max bg-white p-4 rounded-md shadow-md relative">
            <form method="dialog" onSubmit={handleSubmit}>
              <h2 className="mb-2">
                {isRenaming ? "Rename page" : "Name your new page"}
              </h2>
              <input
                type="text"
                placeholder="Page Name"
                value={form.name}
                onChange={(e) => setForm({ name: e.target.value })}
                className="border border-gray-light rounded-md p-2 w-full mb-4"
                required
              />
              <div className="flex justify-between">
                <button
                  onClick={closeDialog}
                  type="button"
                  className="cursor-pointer px-4 py-1 bg-gray-50 rounded-md hover:bg-gray-light transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-blue text-white px-4 py-1 rounded-md"
                >
                  {isRenaming ? "Rename page" : "Add page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
