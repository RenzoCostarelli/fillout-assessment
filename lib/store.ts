import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Page {
  id: string;
  name: string;
  content: string;
  icon: string;
  active?: boolean;
}

interface StoreState {
  selectedPage: string | null;
  setSelectedPage: (id: string | null) => void;
  pages: Page[];
  setPages: (pages: Page[]) => void;
  addPage: (page: Omit<Page, "id">, position?: number) => void;
  deletePage: (id: string) => void;
  movePage: (from: number, to: number) => void;
  setActivePage: (id: string) => void;
  activePage: string | null;
  clonePage: (id: string) => void;
  renamePage: (id: string, newName: string) => void;
  setDialogOpen: (isOpen: boolean) => void;
  isDialogOpen: boolean;
  newPagePosition?: number;
  setNewPagePosition: (position: number | undefined) => void;
  setIsRenaming: (isRenaming: boolean) => void;
  isRenaming: boolean;
  setIsContextMenuOpen: (isOpen: boolean) => void;
  isContextMenuOpen: boolean;
  setContextMenuData: (data: { x: number }) => void;
  contextMenuData: { x: number } | null;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      selectedPage: null,
      setSelectedPage: (id) => set({ selectedPage: id }),
      pages: [
        {
          id: "page-1",
          name: "Home",
          content: "This is the home page content.",
          icon: "info",
        },
        {
          id: "page-2",
          name: "Other",
          content: "This is the other page content.",
          active: true,
          icon: "file",
        },
        {
          id: "ending",
          name: "Ending",
          content:
            "This is the ending page content. This one cannot be deleted",
          active: false,
          icon: "ending",
        },
      ],
      setPages: (pages) => set({ pages }),
      addPage: (pageData, position) => {
        const newPage: Page = {
          id: Math.random().toString(),
          ...pageData,
        };
        const pages = [...get().pages];

        if (
          typeof position === "number" &&
          position >= 0 &&
          position <= pages.length
        ) {
          pages.splice(position, 0, newPage);
        } else {
          pages.push(newPage);
        }

        set({ pages });
      },
      movePage: (from, to) => {
        const pages = [...get().pages];
        if (to < 0 || to >= pages.length) return;
        const [moved] = pages.splice(from, 1);
        pages.splice(to, 0, moved);
        set({ pages });
      },
      deletePage: (idToDelete) => {
        const { pages, selectedPage } = get();
        const updatedPages = pages.filter((p) => p.id !== idToDelete);
        const newSelectedPage =
          selectedPage === idToDelete
            ? updatedPages[0]?.id || null
            : selectedPage;
        set({ pages: updatedPages, selectedPage: newSelectedPage });
      },
      setActivePage: (id) => {
        const pages = get().pages.map((page) => ({
          ...page,
          active: page.id === id,
        }));
        set({ pages, selectedPage: id, activePage: id });
        // Ensure the active page is set correctly
        if (id) {
          const activePage = pages.find((page) => page.id === id);
          if (activePage) {
            set({ activePage: activePage.id });
          }
        } else {
          set({ activePage: null });
        }
      },
      activePage: null,
      newPagePosition: undefined,
      setNewPagePosition: (position) => set({ newPagePosition: position }),
      clonePage: (id) => {
        const { pages } = get();
        const original = pages.find((p) => p.id === id);
        if (!original) return;

        const baseName = original.name.replace(/\s\+\d+$/, "");

        const count = pages.filter((p) => p.name.startsWith(baseName)).length;

        const newPage: Page = {
          id: Math.random().toString(),
          name: `${baseName} ${count + 1}`,
          icon: original.icon,
          content: original.content,
          active: false,
        };

        set({ pages: [...pages, newPage] });
      },
      renamePage: (id, newName) => {
        const { pages } = get();
        const updatedPages = pages.map((page) =>
          page.id === id ? { ...page, name: newName } : page
        );
        set({ pages: updatedPages });
      },
      setDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
      setIsRenaming: (isRenaming) => set({ isRenaming }),
      isDialogOpen: false,
      isRenaming: false,
      setIsContextMenuOpen: (isOpen) => set({ isContextMenuOpen: isOpen }),
      isContextMenuOpen: false,
      setContextMenuData: (data) => set({ contextMenuData: data }),
      contextMenuData: null,
    }),

    {
      name: "pages-storage", // clave de localStorage
      partialize: (state) => ({ pages: state.pages }), // solo persistimos `pages`
    }
  )
);

export default useStore;
