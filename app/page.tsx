import { GET_LISTS } from "./queries/lists";
import client from "./client";
import { MovieList } from "./components/MovieLists";
import { email } from "./constants";

export default async function Home() {
  const { data } = await client.query({
    query: GET_LISTS,
    variables: { email },
    fetchPolicy: "no-cache",
  });

  return (
    <main>
      {data.getMovieLists.length === 0 && (
        <div>
          <h1>No Lists Found</h1>
          <button>Create a new list</button>
        </div>
      )}
      <h1 style={{ marginLeft: "24px", marginTop: 24 }}>
        Movie Lists ({data.getMovieLists.length})
      </h1>
      <MovieList />
    </main>
  );
}
