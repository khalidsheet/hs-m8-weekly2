import client from "@/app/client";
import { GET_MOVIE_DETAILS } from "@/app/queries/lists";
import Image from "next/image";

export default async function getSingleMovieDetailsPage({ params }: any) {
  const { imdbid } = params;

  const { data } = await client.query({
    query: GET_MOVIE_DETAILS,
    variables: { searchMovieByIdId: imdbid },
  });

  console.log({ data });

  return (
    <div className="container">
      <h1 className="text-4xl font-bold">Movie Details</h1>
      <div className="flex flex-col justify-center py-2">
        <div className="flex mt-16 w-full space-x-6 space-y-6 flex-1 px-20">
          <Image
            src={data?.searchMovieById?.Poster}
            alt="Picture of the author"
            width={256}
            height={1024}
            className="rounded-xl mb-4"
          />

          <div>
            <h1 className="text-6xl font-bold -mt-6 mb-5">
              {data?.searchMovieById?.Title}
            </h1>
            <p className="mt-3 text-2xl flex items-center space-x-4">
              <span>{data?.searchMovieById?.Year} </span>
              <span className="bg-blue-400 text-sm py-1 px-6 rounded-full">
                {data?.searchMovieById?.Rated}
              </span>
            </p>
            <p className="mt-3 text-xl">
              {data?.searchMovieById?.Runtime} - {data?.searchMovieById?.Genre}
            </p>
            <p className="mt-3 text-xl">
              Director: {data?.searchMovieById?.Director}
            </p>
            <p className="mt-3 text-xl">
              Writer: {data?.searchMovieById?.Writer}
            </p>
            <p className="mt-3 text-xl">
              Actors: {data?.searchMovieById?.Actors}
            </p>
            <p className="mt-3 text-xl">
              Awards: {data?.searchMovieById?.Awards}
            </p>
            <p className="mt-3 text-xl">
              imdbRating: {data?.searchMovieById?.imdbRating}
            </p>
            <p className="mt-3 text-xl">
              imdbVotes: {data?.searchMovieById?.imdbVotes}
            </p>
            <p className="mt-3 text-xl">{data?.searchMovieById?.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
