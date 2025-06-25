import AddPageDialog from "@/components/AddPageDialog";

import SideBar from "@/components/SideBar";
import PageContent from "@/components/PageContent";
import Navigation from "@/components/Navigation";

export default function TestPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
      <SideBar />
      <div className="h-full w-full max-w-svw flex flex-col gap-4 col-start-4 col-end-13 bg-background p-4">
        <PageContent />
        <div className="relative flex gap-8  z-0 w-full">
          <Navigation />
        </div>
        <AddPageDialog />
      </div>
    </div>
  );
}
