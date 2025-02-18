import React, { useEffect, useState } from "react";
import styles from "../TrackList/TrackList.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getAllFavoriteTracks } from "../../../API/TrackApi";
import { setFavoriteList } from "../../../store/features/trackSlice";

const Track = ({
  track,
  handleClickTrack,
  currentTrack,
  player,
  handleClickLike,
  timeFormat,
  handleClickDisLike,
  isAuthUser,
}) => {
  const favoriteTracks = useSelector(
    (state: RootState) => state.tracks.favoriteList
  );
  const isLiked = favoriteTracks.some((element) => element._id === track._id);
  const dispatch = useDispatch();

  const handleClickLikeTrack = () => {
    if (isAuthUser) {
      if (isLiked) {
        handleClickDisLike(track._id);
      } else {
        handleClickLike(track._id);
      }
    } else {
      toast.error("Необходимо авторизоваться");
    }
  };
  // const isAuthUser = useSelector((state: RootState) => state.auth.authState);
  // console.log(isAuthUser);

  return (
    <div key={track._id} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <button
            onClick={() => handleClickTrack(track)}
            className={styles.trackTitleImage}
          >
            {track._id === currentTrack?._id ? (
              <div
                className={
                  player.isPlaying ? styles.pulsingCircle : styles.staticCircle
                }
              ></div>
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </button>
          <div className="track__title-text">
            <a className={styles.trackTitleLink} href="http://">
              {track.name} <span className={styles.trackTitleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">
            {track.author}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">
            {track.album}
          </a>
        </div>
        <div className="track__time">
          <button
            className={styles.trackPlayLikeBtn}
            onClick={handleClickLikeTrack}
          >
            <svg
              className={`${styles.trackPlayLikeSvg} ${
                isLiked && styles.trackPlayLikeSvgActive
              }`}
            >
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </svg>
          </button>
          <span className={styles.trackTimeText}>
            {timeFormat(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;
