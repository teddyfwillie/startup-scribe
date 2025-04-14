import React, { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/lib/queries";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";

export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();
  return (
    <>
      <section className="w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10">
        <div className="w-full px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-[#2E5BFF] border-[5px] border-[#1A365D] shadow-lg rounded-[30px] relative z-0 h-fit max-lg:w-full">
          <div className="w-full bg-white border-[5px] border-[#1A365D] rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-[#1A365D] after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0 before:-skew-y-6 before:w-full before:h-[60px] before:bg-[#1A365D] before:-z-[1] before:rounded-[20px] shadow-lg">
            <h3 className="text-2xl font-bold text-[#2D3748] uppercase text-center line-clamp-1">
              {user.name}
            </h3>
            <Image
              src={user.image}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full object-cover border-[3px] border-[#2E5BFF] mt-2"
            />
            <p className="text-[#4A5568] mt-1">@{user?.username}</p>
            <p className="mt-2 text-center font-normal text-sm text-[#718096]">
              {user?.bio}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-5 lg:mt-5 w-full">
            <p className="text-[30px] font-bold text-[#2D3748]">
              {session?.id === id ? "Your" : "All"} startups
            </p>
            <ul className="grid sm:grid-cols-2 gap-5">
              <Suspense fallback={<p className="text-[#4A5568]">Loading...</p>}>
                <UserStartups id={id} />
              </Suspense>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
