import React from "react";
import styles from "./Search.module.css";
import { useDispatch } from "react-redux";
import { setSearchInputText } from "../../../store/features/filterSlice";


const Search = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        onChange={(event) => dispatch(setSearchInputText(event.target.value))}
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
};

export default Search;
