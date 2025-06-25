"use client";

import { FC, SVGProps } from "react";
import Info from "@/app/assets/icons/info.svg";
import File from "@/app/assets/icons/file.svg";
import Ending from "@/app/assets/icons/ending.svg";
import Copy from "@/app/assets/icons/copy.svg";
import Trash from "@/app/assets/icons/trash.svg";
import Rename from "@/app/assets/icons/rename.svg";
import Flag from "@/app/assets/icons/flag.svg";
import Duplicate from "@/app/assets/icons/duplicate.svg";
import Chevron from "@/app/assets/icons/chevron.svg";

const iconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  info: Info,
  file: File,
  ending: Ending,
  copy: Copy,
  trash: Trash,
  rename: Rename,
  flag: Flag,
  duplicate: Duplicate,
  chevron: Chevron,
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof iconMap;
}

export default function Icon({ name, ...props }: IconProps) {
  const SvgIcon = iconMap[name];
  return <SvgIcon {...props} />;
}
