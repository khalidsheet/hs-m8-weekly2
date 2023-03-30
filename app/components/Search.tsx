"use client";
import { AutoComplete, Input } from "antd";
import { useEffect, useState } from "react";
import client from "../client";
import { GET_MOVIES } from "../queries/lists";
import Image from "next/image";

export interface MovieItemOption {
  Poster: string;
  Title: string;
  imdbID: string;
}

export const renderSearchMovieItem = ({
  option,
}: {
  option: MovieItemOption;
}) => {
  return {
    label: option && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <Image
          src={option.Poster != "N/A" ? option.Poster : ""}
          alt={option.Title}
          width={34}
          height={64}
          style={{ borderRadius: "5px" }}
        />
        <span>{option.Title}</span>
      </div>
    ),
    value: option.imdbID,
  };
};

export const Search = ({
  onMovieSelected,
}: {
  onMovieSelected: (movieId: string) => void;
}) => {
  const [options, setOptions] = useState<any[]>([{}]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: GET_MOVIES,
        variables: { title: value },
      });
      setOptions(data.searchMovieByTitle);
    })();
  }, [value]);

  const onSearch = (searchText: string) => {
    setValue(searchText);
  };

  const onSelect = async (data: any) => onMovieSelected(data);

  return (
    <div>
      <AutoComplete
        options={options?.map((option) => renderSearchMovieItem({ option }))}
        style={{
          width: "100%",
          height: "100%",
        }}
        onSelect={onSelect}
        onSearch={onSearch}
      >
        <Input.Search
          size="large"
          placeholder="Search our movie library"
          enterButton
        />
      </AutoComplete>
    </div>
  );
};
