"use client";

import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";
import PlayerBar from "../components/PlayerBar/PlayerBar";
import { useState, useRef, useEffect } from "react";
import { TrackType } from "../../types";
import { getData } from "../../API/TrackApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPlay } from "../../store/features/playerSlice";
import { setFilters } from "../../store/features/filterSlice";
import { setCurrentTrack, setTracks } from "../../store/features/trackSlice";

const CenterBlock = dynamic(
  () => import("../components/CenterBlock/CenterBlock"),
  {
    ssr: false,
  }
);

export default function Home() {
  const player = useSelector((state: RootState) => state.player);
  const currentTrack = useSelector(
    (state: RootState) => state.tracks.currentTrack
  );
  const dispatch = useDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (track: TrackType) => {
    const audio = audioRef.current;
    if (audio && player.isPlaying && track.name === currentTrack?.name) {
      audio.pause();
      dispatch(setPlay(false));
    } else if (audio) {
      audio.play();
      dispatch(setPlay(true));
    }
  };

  const getUniqFilters = (res: TrackType[]) => {
    const uniqGenres = {};
    const uniqDates = {};
    const uniqAuthors = {};

    res.forEach((track) => {
      if (track.author !== "-") {
        uniqAuthors[track.author] = true;
      }
    });
    const listAuthors = Object.keys(uniqAuthors);

    res.forEach((track) => {
      uniqDates[track.release_date.slice(0, 4)] = true;
    });
    const listDates = Object.keys(uniqDates);

    res.forEach((track) => {
      track.genre.forEach((genre) => {
        uniqGenres[genre] = true;
      });
    });
    const listGenres = Object.keys(uniqGenres);

    dispatch(
      setFilters({
        AUTORS: listAuthors,
        DATES: listDates,
        GENRES: listGenres,
        selectedAuthor: [],
        selectedDates: [],
        selectedGenres: [],
      })
    );
  };

  useEffect(() => {
    const getDataTracks = async () => {
      const response: TrackType[] = await getData();
      dispatch(setTracks(response));
      dispatch(setCurrentTrack(response[0]));
      getUniqFilters(response);
    };
    getDataTracks();
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && player.isPlaying) {
      audio.play();
    }
    if (audio) {
      audio.loop = player.isLoop;
    }
  }, [currentTrack, player.isPlaying, player.isLoop]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = player.volume;
    }
  }, [player.volume]);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <Header />
            <CenterBlock togglePlay={togglePlay} />
            <SideBar />
          </main>
          <PlayerBar togglePlay={togglePlay} audioRef={audioRef} />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
