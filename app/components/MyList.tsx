"use client";

import { useEffect, useState } from "react";
import client from "../client";
import {
  ADD_MOVIE,
  GET_MOVIES_IN_LIST,
  GET_SINGLE_LIST,
} from "../queries/lists";
import { Col, Empty, Row, Space } from "antd";
import { Search } from "./Search";
import Image from "next/image";
import Link from "next/link";

export const MyList = ({ listId }: { listId: string }) => {
  const [listData, setListData] = useState<any>(null);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: GET_SINGLE_LIST,
        variables: { getMovieListId: parseInt(listId) },
      });

      setListData(data?.getMovieList);

      const {
        data: { getMovieListItems },
      } = await client.query({
        query: GET_MOVIES_IN_LIST,
        variables: { getMovieListItemsListId2: parseInt(listId) },
      });

      console.log({ getMovieListItems });

      setMovies(getMovieListItems);
    })();
  }, [listId]);

  const onMovieSelected = async (movieId: string) => {
    console.log(movieId);
    await client.mutate({
      mutation: ADD_MOVIE,
      variables: {
        imdbId: movieId,
        listId: parseInt(listId),
      },
    });
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <h1>{listData?.name}</h1>
        </Col>
        <Col span={24}>
          <Search onMovieSelected={onMovieSelected} />
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {(movies.length &&
              movies.map((movie) => (
                <Col span={6} key={movie.imdb_id}>
                  <Link href={`/movie/${movie.imdb_id}`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        gap: "10px",
                      }}
                    >
                      <Image
                        src={
                          movie.movie.Poster != "N/A" ? movie.movie.Poster : ""
                        }
                        alt={movie.movie?.Title}
                        width={256}
                        height={512}
                        style={{ borderRadius: "5px" }}
                      />
                    </div>
                  </Link>
                </Col>
              ))) || (
              <Empty description={"You have not added any movies yet"} />
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
