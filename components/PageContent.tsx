"use client";

import useStore, { Page } from "@/lib/store";
import { useEffect, useState } from "react";

export default function PageContent() {
  const [page, setPage] = useState<Page>();
  const { pages, activePage } = useStore();
  useEffect(() => {
    const p = pages.find((page) => page.id === activePage);
    setPage(p);
  }, [pages, activePage]);
  return (
    <div className="h-full w-full bg-white rounded-md border border-gray-light p-4">
      {page && page.content !== "" ? page.content : "No content for this page"}
    </div>
  );
}
