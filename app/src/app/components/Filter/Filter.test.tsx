import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Filter from './Filter';
import {
  addAuthorsFilter,
  deleteAuthorsFilter,
} from '../../../store/features/filterSlice';

const mockStore = configureStore([]);

describe('Filter component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      filters: {
        AUTORS: ['Author 1', 'Author 2'],
        DATES: ['2021', '2022'],
        GENRES: ['Rock', 'Pop'],
        selectedAuthor: [],
        selectedDates: [],
        selectedGenres: [],
      },
    });
    store.dispatch = jest.fn();
  });

  const renderWithProvider = (store: any) =>
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

  it('selects and deselects author filter', () => {
    const { rerender } = renderWithProvider(store);

    const authorButton = screen.getByText(/исполнителю/i);
    fireEvent.click(authorButton);

    const authorOption = screen.getByText('Author 1');

    fireEvent.click(authorOption);
    expect(store.dispatch).toHaveBeenCalledWith(addAuthorsFilter('Author 1'));

    store = mockStore({
      filters: {
        AUTORS: ['Author 1', 'Author 2'],
        selectedAuthor: ['Author 1'],
        selectedDates: [],
        selectedGenres: [],
      },
    });
    store.dispatch = jest.fn();
    rerender(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    fireEvent.click(authorOption);
    expect(store.dispatch).toHaveBeenCalledWith(deleteAuthorsFilter('Author 1'));
  });
});