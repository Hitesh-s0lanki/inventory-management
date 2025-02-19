"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: Props) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div className="w-full px-3 py-1">
        <div
          className={`cursor-pointer flex items-center rounded-md ${
            isCollapsed ? "justify-center py-2" : "justify-start px-4 py-2"
          }
          hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
            isActive ? "bg-purple-300 text-white" : ""
          }
        }`}
        >
          <Icon className="w-6 h-6 !text-gray-700" />

          <span
            className={`${
              isCollapsed ? "hidden" : "block"
            } font-medium text-gray-700 text-md`}
          >
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SidebarLink;
