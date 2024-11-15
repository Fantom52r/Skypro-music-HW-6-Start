import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TrackList from './TrackList';
import { TrackType } from '../../../types';

const mockStore = configureStore([]);

describe('TrackList component', () => {
  let store: any;
  let tracks: TrackType[];

  beforeEach(() => {
    tracks = [
      {
        _id: 35,
        name: 'Hard Metal Intro',
        author: 'Winniethemoog',
        release_date: '1991-09-06',
        genre: ['Рок музыка'],
        duration_in_seconds: 255,
        album: 'Hard Metal',
        logo: { type: 'Buffer', data: [] },
        track_file: 'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog__-_Hard_Metal_Intro.mp3',
        staredUser: [],
      },
      {
        _id: 34,
        name: 'Adrenelynne',
        author: 'Tim Kulig',
        release_date: '2007-05-14',
        genre: ['Рок музыка'],
        duration_in_seconds: 285,
        album: 'Adrenelynne',
        logo: { type: 'Buffer', data: [] },
        track_file: 'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Tim_Kulig_-_Adrenelynne.mp3',
        staredUser: [],
      },
    ];

    store = mockStore({
      tracks: {
        currentTrack: null,
        favoriteList: [],
        trackList: tracks,
      },
      player: {},
    });
  });

  it('should render a list of tracks', () => {
    render(
      <Provider store={store}>
        <TrackList tracks={tracks} togglePlay={jest.fn()} />
      </Provider>
    );

    expect(screen.getByText('Hard Metal Intro')).toBeInTheDocument();
    expect(screen.getByText('Winniethemoog')).toBeInTheDocument();
    expect(screen.getByText('Tim Kulig')).toBeInTheDocument();
  });
});
