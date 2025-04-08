import { STARTUP_BY_ID_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import View from "@/components/View";

export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const md = markdownit();

  const { data: post } = await sanityFetch({
    query: STARTUP_BY_ID_QUERY,
    params: { id },
  });

  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");
  return (
    <>
      <section className="w-full bg-primary pattern flex justify-center items-center flex-col py-10 px-6 min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {post.title}
        </h1>
        <p className="font-medium text-[20px] text-white text-center break-words max-w-5xl">
          {post.description}
        </p>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="font-medium text-[20px] text-black">
                  {post.author.name}
                </p>
                <p className="font-medium text-[16px] text-black">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="font-medium text-[16px] bg-pink-100 px-4 py-2 rounded-full">
              {post.category}
            </p>
          </div>

          <h3 className="text-[30px] font-bold text-black">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-black-100 text-sm font-normal">
              No details provided
            </p>
          )}
        </div>

        <hr className=" border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        {/* Todo: Editor select startup category */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
