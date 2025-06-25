"use client";

import useStore from "@/lib/store";

export default function MenuTrigger() {
  const { setIsContextMenuOpen } = useStore.getState();

  const handleOpen = () => {
    setIsContextMenuOpen(true);
  };

  return (
    <>
      <button
        onClick={() => handleOpen()}
        className="cursor-pointer"
        aria-label="Open settings menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8.00001 3.16667C8.3682 3.16667 8.66668 2.86819 8.66668 2.5C8.66668 2.13181 8.3682 1.83334 8.00001 1.83334C7.63182 1.83334 7.33334 2.13181 7.33334 2.5C7.33334 2.86819 7.63182 3.16667 8.00001 3.16667Z"
            fill="#9DA4B2"
          />
          <path
            d="M8.00001 8.66667C8.3682 8.66667 8.66668 8.36819 8.66668 8C8.66668 7.63181 8.3682 7.33334 8.00001 7.33334C7.63182 7.33334 7.33334 7.63181 7.33334 8C7.33334 8.36819 7.63182 8.66667 8.00001 8.66667Z"
            fill="#9DA4B2"
          />
          <path
            d="M8.00001 14.1667C8.3682 14.1667 8.66668 13.8682 8.66668 13.5C8.66668 13.1318 8.3682 12.8333 8.00001 12.8333C7.63182 12.8333 7.33334 13.1318 7.33334 13.5C7.33334 13.8682 7.63182 14.1667 8.00001 14.1667Z"
            fill="#9DA4B2"
          />
          <path
            d="M8.00001 3.16667C8.3682 3.16667 8.66668 2.86819 8.66668 2.5C8.66668 2.13181 8.3682 1.83334 8.00001 1.83334C7.63182 1.83334 7.33334 2.13181 7.33334 2.5C7.33334 2.86819 7.63182 3.16667 8.00001 3.16667Z"
            stroke="#9DA4B2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.00001 8.66667C8.3682 8.66667 8.66668 8.36819 8.66668 8C8.66668 7.63181 8.3682 7.33334 8.00001 7.33334C7.63182 7.33334 7.33334 7.63181 7.33334 8C7.33334 8.36819 7.63182 8.66667 8.00001 8.66667Z"
            stroke="#9DA4B2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.00001 14.1667C8.3682 14.1667 8.66668 13.8682 8.66668 13.5C8.66668 13.1318 8.3682 12.8333 8.00001 12.8333C7.63182 12.8333 7.33334 13.1318 7.33334 13.5C7.33334 13.8682 7.63182 14.1667 8.00001 14.1667Z"
            stroke="#9DA4B2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
