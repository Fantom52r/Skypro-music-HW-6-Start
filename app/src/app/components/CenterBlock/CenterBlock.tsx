"use client";
import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import TrackList from "../TrackList/TrackList";
import {
  getData,
  getAllFavoriteTracks,
  getTrackByCompilation,
} from "../../../API/TrackApi";
import { TrackType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setTracks, setFavoriteList } from "../../../store/features/trackSlice";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const CenterBlock = ({ togglePlay }) => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [currentTracks, setCurrentTracks] = useState<TrackType[]>([]);

  const trackList: TrackType[] = useSelector(
    (state: RootState) => state.tracks.trackList
  );
  const favoriteTracks: TrackType[] = useSelector(
    (state: RootState) => state.tracks.favoriteList
  );

  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const viewParam = searchParams?.get("view");
    let response;
    if (viewParam === "favorites") {
      const getFavoriteTracks = async () => {
        response = await getAllFavoriteTracks();
        if (response) {
          dispatch(setFavoriteList(response.data));
        }
      };
      setIsFavorites(true);
      getFavoriteTracks();
    } else if (viewParam?.split("/")[0] === "compilation") {
      const getTrackByCompilationId = async () => {
        response = await getTrackByCompilation(+viewParam?.split("/")[1]);
        if (response) {
          setCurrentTracks(
            trackList.filter((track) => response.data.items.includes(track._id))
          );
          console.log(
            trackList.filter((track) => response.data.items.includes(track._id))
          );
        }
      };
      getTrackByCompilationId();
      setIsFavorites(false);
    } else if (viewParam === "all") {
      const getAllTracks = async () => {
        const response = await getData();
        if (response) {
          dispatch(setTracks(response));
          setCurrentTracks(response);
        }
      };
      getAllTracks();
    }
  }, [dispatch, isFavorites, searchParams]);

  useEffect(() => {
    const getAllTracks = async () => {
      const response = await getData();
      if (response) {
        dispatch(setTracks(response));
        setCurrentTracks(response);
      }
    };
    getAllTracks();
  }, []);

  const tracksToDisplay = isFavorites ? favoriteTracks : currentTracks;

  return (
    <div className="main__centerblock centerblock">
      <Search />
      <h2 className="centerblock__h2">Треки</h2>
      <Filter />
      <div className="centerblock__content playlist-content">
        <div className="content__title playlist-title">
          <div className="playlist-title__col col01">Трек</div>
          <div className="playlist-title__col col02">Исполнитель</div>
          <div className="playlist-title__col col03">Альбом</div>
          <div className="playlist-title__col col04">
            <svg className="playlist-title__svg">
              <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <TrackList tracks={tracksToDisplay} togglePlay={togglePlay} />
      </div>
    </div>
  );
};

export default CenterBlock;
