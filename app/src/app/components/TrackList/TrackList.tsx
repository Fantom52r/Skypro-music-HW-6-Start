"use client";
import React, { useEffect, useState } from "react";
import styles from "./TrackList.module.css";
import { TrackType } from "../../../types";
import {
  setCurrentTrack,
  setFavoriteList,
} from "../../../store/features/trackSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  addFavoriteTrack,
  deleteFavoriteTrack,
  getAllFavoriteTracks,
} from "../../../API/TrackApi";
import Track from "../track/Track";

const TrackList = ({ tracks, togglePlay }) => {
  const [isAuthUser, setIsAuthUser] = useState<string | null>(null);

  const selectedAuthor = useSelector(
    (state: RootState) => state.filters.selectedAuthor
  );
  const selectedDates = useSelector(
    (state: RootState) => state.filters.selectedDates
  );
  const selectedGenres = useSelector(
    (state: RootState) => state.filters.selectedGenres
  );

  const currentTrack: TrackType | null = useSelector(
    (state: RootState) => state?.tracks.currentTrack
  );

  const favoriteTracks = useSelector(
    (state: RootState) => state.tracks.favoriteList
  );

  const trackList = useSelector((state: RootState) => state.tracks.trackList);
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  const timeFormat = (digit: number) => {
    let minutes = Math.floor(digit / 60);
    let seconds = digit % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleClickTrack = (track: TrackType) => {
    dispatch(setCurrentTrack(track));
    togglePlay(track);
  };

  const handleClickLike = async (id: string) => {
    await addFavoriteTrack(id);
    const newFavoriteList = await getAllFavoriteTracks();
    dispatch(setFavoriteList(newFavoriteList.data));
  };

  const handleClickDisLike = async (id: string) => {
    await deleteFavoriteTrack(id);
    const newFavoriteList = await getAllFavoriteTracks();
    dispatch(setFavoriteList(newFavoriteList.data));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authUser = localStorage.getItem("userName");
      setIsAuthUser(authUser);
    }
  }, [isAuthUser, dispatch]);
  useEffect(() => {}, [favoriteTracks, trackList]);

  const filteredTracks = tracks.filter((track) => {
    if (selectedAuthor.length > 0 && !selectedAuthor.includes(track.author))
      return false;
    if (selectedDates.length > 0 && !selectedDates.includes(track.release_date.slice(0, 4)))
      return false;
    if (selectedGenres.length > 0 && !track.genre.some((el)=> selectedGenres.includes(el)))
      return false;
    return true;
  });

  console.log(selectedAuthor, selectedDates, selectedGenres,tracks);

  return (
    <div className={styles.contentPlaylist}>
      {filteredTracks?.map((track: TrackType) => (
        <Track
          key={track._id}
          track={track}
          handleClickTrack={handleClickTrack}
          currentTrack={currentTrack}
          player={player}
          handleClickLike={handleClickLike}
          timeFormat={timeFormat}
          favoriteTracks={favoriteTracks}
          handleClickDisLike={handleClickDisLike}
          isAuthUser={isAuthUser}
        />
      ))}
    </div>
  );
};

export default TrackList;
