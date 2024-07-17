"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Profile from "./profile";
import Auth from "./auth";
import Links from "./links";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const { username, email, id } = session?.user || {};

  return (
    <header className="min-h-[61px] bg-black border-b-[1px] !border-gray-800 sticky top-0 z-10">
      <nav className="container px-4 lg:px-6 py-2.5 flex justify-between items-start">
        <Link href="/">
          <Image
            src="/logo.svg"
            height={40}
            width={40}
            alt="Flowbite Logo"
            className="select-none"
          />
        </Link>

        {session && <Links />}
        {session ? (
          <Profile username={username} email={email} signOut={signOut} />
        ) : (
          <Auth />
        )}
      </nav>
    </header>
  );
}
