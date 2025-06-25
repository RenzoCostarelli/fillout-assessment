import Box from "./placeholders/Box";
import Circle from "./placeholders/Circle";

export default function SideBar() {
  return (
    <div className="hidden  md:block h-full col-start-1 col-end-4 p-5 bg-background border-r border-r-gray-100">
      <div className="grid grid-cols-2 gap-4 place-items-center">
        <Circle />
        <Box />
        <div className="col-span-2 w-full">
          <Box />
        </div>
        <Box />
        <Circle />
      </div>
    </div>
  );
}
