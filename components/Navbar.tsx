import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className=" text-white px-5 py-3 font-work-sans shadow-sm bg-white">
      {/* This is the Navbar component */}
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={20} />
        </Link>

        <div className="items-center flex gap-5">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <h1 className="text-black">Dashboard</h1>
              </Link>

              <form
                className="bg-black text-white px-4 py-2 rounded"
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Sign Out</button>
              </form>

              <Link href={`/user/${session.user.id}`}>
                <span className="text-black">{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form
              className="bg-black text-white px-4 py-2 rounded"
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
