"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className="flex mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const label = segment.replace(/-/g, " ");

          return (
            <li key={href} className="flex items-center">
              <svg className="w-3 h-3 text-slate-300 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              {isLast ? (
                <span className="text-xs font-bold text-slate-900 uppercase tracking-widest truncate max-w-[150px]">
                  {label}
                </span>
              ) : (
                <Link href={href} className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
