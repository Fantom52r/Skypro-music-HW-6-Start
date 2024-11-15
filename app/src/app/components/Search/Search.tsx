import React from 'react'
import styles from "./Search.module.css"


const Search = () => {
  return (
    <div className={styles.centerblockSearch}>
    <svg className={styles.searchSvg}>
      <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
    </svg>
    <input
      className={styles.searchText}
      type="search"
      placeholder="Поиск"
      name="search"
    />
  </div>
  )
}

export default Search
