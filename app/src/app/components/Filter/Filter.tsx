"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Filter.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import {
  addAuthorsFilter,
  addDatesFilter,
  addGenresFilter,
  deleteAuthorsFilter,
  deleteDatesFilter,
  deleteGenresFilter,
} from "../../../store/features/filterSlice";

interface IsOpen {
  author: boolean;
  date: boolean;
  genre: boolean;
}

const Filter: React.FC = () => {
  const uniqFilters = useSelector((state: RootState) => state.filters);
  const [isShowList, setIsShowList] = useState<IsOpen>({
    author: false,
    date: false,
    genre: false,
  });
  const selectedAuthor = useSelector(
    (state: RootState) => state.filters.selectedAuthor
  );
  const selectedDates = useSelector(
    (state: RootState) => state.filters.selectedDates
  );
  const selectedGenres = useSelector(
    (state: RootState) => state.filters.selectedGenres
  );

  const dispatch = useDispatch();

  const handleClickAuthorBtn = (author) => {
    if (selectedAuthor.includes(author)) {
      dispatch(deleteAuthorsFilter(author));
    } else {
      dispatch(addAuthorsFilter(author));
    }
  };

  const handleClickDatesBtn = (date) => {
    if (selectedDates.includes(date)) {
      dispatch(deleteDatesFilter(date));
    } else {
      dispatch(addDatesFilter(date));
    }
  };

  const handleClickGenresBtn = (genre) => {
    if (selectedGenres.includes(genre)) {
      dispatch(deleteGenresFilter(genre));
    } else {
      dispatch(addGenresFilter(genre));
    }
  };

  const filterRef = useRef<HTMLDivElement>(null);

  const handleClickFilter = useCallback((selectedKey: keyof IsOpen) => {
    setIsShowList((prev) => ({
      ...prev,
      [selectedKey]: !prev[selectedKey],
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsShowList({ author: false, date: false, genre: false });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className={styles.centerBlockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.authorFilterBlock}>
        <button
          onClick={() => handleClickFilter("author")}
          className={`${styles.filterButton} ${styles.btnText} ${
            isShowList.author && styles.activeFilterButton
          }`}
        >
          исполнителю
        </button>
        {isShowList.author && (
          <div className={styles.filterBlock}>
            <ul className={styles.filterBlockList}>
              {uniqFilters.AUTORS.map((author) => (
                <li key={author}>
                  <button
                    onClick={() => handleClickAuthorBtn(author)}
                    className={`${styles.filterBlockListBtn} ${
                      selectedAuthor.includes(author) &&
                      styles.selectedButtonFilter
                    }`}
                  >
                    {author}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.dateFilterBlock}>
        <button
          onClick={() => handleClickFilter("date")}
          className={`${styles.filterButton} ${styles.btnText} ${
            isShowList.date && styles.activeFilterButton
          } `}
        >
          году выпуска
        </button>
        {isShowList.date && (
          <div className={styles.filterBlock}>
            <ul className={styles.filterBlockList}>
              {uniqFilters.DATES.map((date) => (
                <li key={date}>
                  <button
                    onClick={() => handleClickDatesBtn(date)}
                    className={`${styles.filterBlockListBtn} ${
                      selectedDates.includes(date) &&
                      styles.selectedButtonFilter
                    }`}
                  >
                    {date}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.genreFilterBlock}>
        <button
          onClick={() => handleClickFilter("genre")}
          className={`${styles.filterButton} ${styles.btnText} ${
            isShowList.genre && styles.activeFilterButton
          }`}
        >
          жанру
        </button>
        {isShowList.genre && (
          <div className={styles.filterBlock}>
            <ul className={styles.filterBlockList}>
              {uniqFilters.GENRES.map((genre) => (
                <li key={genre}>
                  <button
                    onClick={() => handleClickGenresBtn(genre)}
                    className={`${styles.filterBlockListBtn} ${
                      selectedGenres.includes(genre) &&
                      styles.selectedButtonFilter
                    }`}
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Filter);
