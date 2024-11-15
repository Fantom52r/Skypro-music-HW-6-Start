"use client";
import React, { useState } from "react";
import "../../public/css/signin.css";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAccessToken, loginUser } from "../API/TrackApi";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/features/authSlice";

const AuthPages = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email: login, password });
      dispatch(setUserName(response.username));
      localStorage.setItem("userName", response.username);
      const token = await getAccessToken({ email: login, password });
      localStorage.setItem("accessToken",token.access)
      localStorage.setItem("refreshToken",token.refresh)
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </a>
            <input
              onChange={(e) => setLogin(e.target.value)}
              className={`${styles.modalInput} ${styles.login} `}
              type="text"
              name="login"
              placeholder="Почта"
              value={login}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.modalInput} ${styles.password}`}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
            />
            <button onClick={handleClickLogin} className={styles.modalBtnEnter}>
              Войти
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="registration">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
