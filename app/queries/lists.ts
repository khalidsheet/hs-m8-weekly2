import { gql } from "@apollo/client";

export const GET_LISTS = gql`
  query Query($email: String!) {
    getMovieLists(email: $email) {
      created_at
      email
      id
      name
    }
  }
`;

export const ADD_LIST = gql`
  mutation CreateList($input: CreateListInput!) {
    createList(input: $input) {
      id
      name
    }
  }
`;

export const GET_SINGLE_LIST = gql`
  query MovieLists($getMovieListId: Int!) {
    getMovieList(id: $getMovieListId) {
      name
    }
  }
`;

export const GET_MOVIES = gql`
  query MovieLists($title: String!) {
    searchMovieByTitle(title: $title) {
      Poster
      Title
      imdbID
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation Mutation($imdbId: String!, $listId: Int!) {
    addMovie(imdbId: $imdbId, listId: $listId) {
      id
    }
  }
`;

export const GET_MOVIES_IN_LIST = gql`
  query Query($getMovieListItemsListId2: Int!) {
    getMovieListItems(listId: $getMovieListItemsListId2) {
      imdb_id
      id
      movie {
        Genre
        Title
        Poster
        Year
        imdbRating
      }
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  query SearchMovieById($searchMovieByIdId: String!) {
    searchMovieById(id: $searchMovieByIdId) {
      Title
      Year
      Rated
      Released
      Runtime
      Genre
      Director
      Writer
      Actors
      Plot
      Language
      Country
      Awards
      Poster
      Metascore
      imdbRating
      imdbVotes
      imdbID
      Type
      DVD
      BoxOffice
      Production
      Website
      Response
    }
  }
`;
