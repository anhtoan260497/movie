import Head from "next/head";
import Carousel from "../components/Carousel";
import listFilms from "../api/listFilms";
import { limitItems } from "../helper";
import filmDetails from "../api/filmDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { listFilmFake } from "./api/fakeListFilm";
import RibbonLandscape from "../components/RibbonLandscape";

export default function Home({ listFilm  = listFilmFake}) {
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel listItems={listFilm} />
      <RibbonLandscape />
    </>
  );
}

export const getStaticProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_APP_MOVIE_TOKEN}`,
    },
  };

  const res = await fetch(listFilms.getListFilm("movie", "popular", 1), options);
  const data = await res.json();
  const listFilm = limitItems(data.results, 5);
  return {
    props: {
      listFilm: listFilm,
    },
  };
};


