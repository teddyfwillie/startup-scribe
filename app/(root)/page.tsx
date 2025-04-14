import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUP_QUERIES } from "@/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERIES, params });

  return (
    <>
      <section className="w-full bg-gradient-to-r from-[#2E5BFF] to-[#00C1D4] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <h1 className="uppercase bg-[#1A365D] px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="font-semibold text-[30px] text-[#2D3748]">
          {query ? `Search results for "${query}"` : `All Startups`}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="text-[#718096]">No results found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
