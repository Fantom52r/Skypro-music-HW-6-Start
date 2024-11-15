"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Header = () => {
  const [openedNavBar, setOpenedNavBar] = useState(false);
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<null | string>("");

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleClickToFavorites = () => {
    if (isAuth) {
      handleNavigate("/home?view=favorites");
    } else {
      toast.error(
        "Избранные треки доступны только авторизированным пользователям"
      );
    }
  };

  const handleClickLog = () => {
    if (isAuth) {
      localStorage.setItem("userName", "");
      localStorage.setItem("accessToken", "");
      localStorage.setItem("refreshToken", "");
      setIsAuth("");
    } else {
      handleNavigate("/login");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("userName");
      setIsAuth(storedUsername);
    }
  }, []);
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className="logo__image"
          src="/img/logo.png"
          alt="logo"
          height={17}
          width={113}
        />
      </div>
      <div
        onClick={() => setOpenedNavBar(!openedNavBar)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div className={openedNavBar ? styles.navMenu : styles.navMenuClose}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <button
              onClick={() => handleNavigate("/home?view=all")}
              className={styles.menuLink}
            >
              Главное
            </button>
          </li>
          <li className={styles.menuItem}>
            <button
              onClick={handleClickToFavorites}
              className={styles.menuLink}
            >
              Мой плейлист
            </button>
          </li>
          <li className={styles.menuItem}>
            {isAuth ? (
              <button className={styles.menuLink} onClick={handleClickLog}>
                Выйти
              </button>
            ) : (
              <button className={styles.menuLink} onClick={handleClickLog}>
                Войти
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
