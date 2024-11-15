"use client";

import React, { useState } from "react";
import "../app/styles/globals.css";
import styles from "./registration.module.css";
import Image from "next/image";
import { registerUser } from "../API/TrackApi";
import { useRouter } from "next/router";
import { setUserName } from "../store/features/authSlice";
const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [doublePassword, setDoublePassword] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const router = useRouter();
  const handleClickRegistration = async (e) => {
    e.preventDefault();
    if (password.length < 7) {
      toast.error("пароль должен содержать не менее шести символов");
      return;
    }
    if (password === doublePassword) {
      const response = await registerUser({ username, email, password });
      if (response) {
        router.push("/login");
      }
    } else {
      toast.error("Пароли не совпадают");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
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
              onChange={(e) => setUserName(e.target.value)}
              className={`${styles.modalInput} ${styles.login}`}
              type="text"
              name="name"
              placeholder="Имя Пользователя"
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.modalInput} ${styles.login}`}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.modalInput} ${styles.passwordFirst}`}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <input
              onChange={(e) => setDoublePassword(e.target.value)}
              className={`${styles.modalInput} ${styles.passwordDouble}`}
              type="password"
              name="password"
              placeholder="Повторите пароль"
            />
            <button
              onClick={handleClickRegistration}
              className={styles.modalBtnSignupEnt}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
