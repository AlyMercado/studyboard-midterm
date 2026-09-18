"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/groups", label: "Groups" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">StudyBoard</span>
        <div className="flex gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "font-semibold text-teal-700"
                    : "text-gray-600 hover:text-teal-700"
                }
              >
                {link.label}
              </Link>
            );
          })}
          {status === "authenticated" && (
            <Link
              href="/groups/new"
              className={
                pathname === "/groups/new"
                  ? "font-semibold text-teal-700"
                  : "text-teal-950 hover:text-teal-700"
              }
            >
              New Group
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {status === "authenticated" ? (
          <>
            <span className="text-teal-950">Hello, {session.user?.name} </span>
            <button
              onClick={() => signOut(redirect("/login"))}
              className="text-teal-950 hover:text-teal-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-teal-950 hover:text-teal-700">
              Log In
            </Link>
            <Link href="/register" className="text-teal-950 hover:text-teal-700">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}