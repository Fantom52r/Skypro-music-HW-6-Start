"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setUserLogOut } from "../../../store/features/authSlice";
import {
  getCompilation,
  getTrackByCompilation,
  getTrackById,
} from "../../../API/TrackApi";
import { useRouter } from "next/navigation";
import { Compilation } from "../../../types";
import {
  setCompilationList,
  setCurrentTrack,
  setTracks,
} from "../../../store/features/trackSlice";

const PICTURES_LINKS = [
  "/img/playlist01.png",
  "/img/playlist02.png",
  "/img/playlist03.png",
];

const SideBar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [compilations, setCompilations] = useState([]);
  const isAuth = useSelector((state: RootState) => state.auth.authState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClickNavigate = async (path) => {
    router.push(path);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("userName");
      setUsername(storedUsername);
    }
  }, [username]);

  useEffect(() => {
    const getCompilationSideBar = async () => {
      try {
        const response = await getCompilation();
        dispatch(setCompilationList(response.data));
        setCompilations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCompilationSideBar();
  }, []);

  const handleClickLogOut = () => {
    localStorage.setItem("userName", "");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    setUsername(null);
  };

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{username ? "Выйти" : ""}</p>
        <Link
          href="login"
          onClick={handleClickLogOut}
          className={styles.sidebarIcon}
        >
          <svg>
            <use xlinkHref="img/icon/sprite.svg#logout"></use>
          </svg>
        </Link>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          {compilations.map((compilation: Compilation, index) => (
            <div key={compilation?._id} className={styles.sidebarItem}>
              <button
                onClick={() =>
                  handleClickNavigate(
                    `/home/?view=compilation/${compilation?._id}`
                  )
                }
                className={styles.sidebarLink}
              >
                <Image
                  className={styles.sidebarImg}
                  src={PICTURES_LINKS[index]}
                  alt="day's playlist"
                  width={250}
                  height={170}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
