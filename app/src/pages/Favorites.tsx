"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getAllFavoriteTracks } from "../API/TrackApi";
import { setFavoriteList } from "../store/features/trackSlice";
import CenterBlock from "../app/components/CenterBlock/CenterBlock";
import { useRouter } from "next/router";

const FavoritesPage = ({ togglePlay }) => {
  const dispatch = useDispatch();
  const favoriteTracks = useSelector(
    (state: RootState) => state.tracks.favoriteList
  );
  const router = useRouter();
  const isAuthUser = useSelector((state: RootState) => !!state.auth.userName);

  useEffect(() => {
    if (!isAuthUser) {
      router.push("/signin");
    }
  }, [isAuthUser, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getAllFavoriteTracks();
        dispatch(setFavoriteList(response.data));
      } catch (error) {
        console.error("Error fetching favorite tracks:", error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  return (
    <div>
      <h1>Избранные треки</h1>
      <CenterBlock togglePlay={togglePlay} />
    </div>
  );
};

export default FavoritesPage;
