import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import View from "@/components/View";
import { client } from "@/sanity/lib/client";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPost }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");
  return (
    <>
      <section className="w-full bg-gradient-to-r from-[#2E5BFF] to-[#00C1D4] pattern flex justify-center items-center flex-col py-10 px-6 min-h-[230px]">
        <p className="tag text-[#E2E8F0]">{formatDate(post?._createdAt)}</p>

        <h1 className="uppercase bg-[#1A365D] px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {post.title}
        </h1>
        <p className="font-medium text-[20px] text-white text-center break-words max-w-5xl">
          {post.description}
        </p>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-10 max-w-7xl mx-auto">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-gray-100 shadow-sm">
          <Image
            src={post.image}
            alt="thumbnail"
            className="object-cover w-full h-full"
            width={700} // Increased for better quality
            height={294} // 16:9 aspect ratio
            priority
          />
        </div>

        <div className="space-y-6 mt-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-3 items-center hover:opacity-80 transition-opacity group"
            >
              <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-blue-500 group-hover:border-blue-600 transition-colors"
                />
              </div>

              <div>
                <p className="font-medium text-lg sm:text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                  {post.author.name}
                </p>
                <p className="font-medium text-gray-500 text-sm sm:text-base">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <span className="font-medium text-sm sm:text-base bg-blue-50 text-blue-600 px-4 py-2 rounded-full whitespace-nowrap">
              {post.category}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Pitch Details
          </h3>

          {parsedContent ? (
            <article
              className="prose prose-sm sm:prose-base max-w-4xl font-work-sans text-gray-600"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-gray-400 text-sm font-normal">
              No details provided
            </p>
          )}
        </div>

        <hr className="border-t-2 border-dashed border-gray-200 max-w-4xl my-8 md:my-10 mx-auto" />

        {editorPost?.length > 0 && (
          <div className=" max-w-4xl mx-auto">
            <p className="font-semibold text-[30px] text-black">Editor Picks</p>
            <ul className="grid sm:grid-cols-2 gap-5">
              {editorPost.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense
          fallback={<Skeleton className="w-full h-8 bg-gray-100 rounded" />}
        >
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
