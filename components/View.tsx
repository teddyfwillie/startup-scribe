import React from "react";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { after } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  //Todo: Update views when user views the startup
  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-3 -right-2">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-pink-100 px-4 py-2 rounded-lg capitalize">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
