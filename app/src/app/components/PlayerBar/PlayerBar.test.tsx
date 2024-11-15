import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlayerBar from './PlayerBar';
import { TrackType } from '../../../types';

const mockStore = configureStore([]);

describe('PlayerBar component', () => {
  let store: any;
  let tracks: TrackType[];
  let togglePlayMock: jest.Mock;
  let audioRef: React.RefObject<HTMLAudioElement>;

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
        track_file: 'https://example.com/hard-metal.mp3',
        staredUser: [],
      },
    ];

    store = mockStore({
      player: {
        isPlaying: false,
        isShuffle: false,
        isLoop: false,
        volume: 0.5,
      },
      tracks: {
        currentTrack: tracks[0],
        favoriteList: [],
      },
    });

    togglePlayMock = jest.fn();
    audioRef = createRef<HTMLAudioElement>();
  });

  it('should render player bar correctly', () => {
    render(
      <Provider store={store}>
        <PlayerBar togglePlay={togglePlayMock} audioRef={audioRef} />
      </Provider>
    );

    expect(screen.getByText('Hard Metal Intro')).toBeInTheDocument();
    expect(screen.getByText('Winniethemoog')).toBeInTheDocument();

    const playButton = screen.getByLabelText('play');
    expect(playButton).toBeInTheDocument();
  });

  it('should handle play button click', () => {
    render(
      <Provider store={store}>
        <PlayerBar togglePlay={togglePlayMock} audioRef={audioRef} />
      </Provider>
    );

    const playButton = screen.getByLabelText('play');
    fireEvent.click(playButton);

    expect(togglePlayMock).toHaveBeenCalled();
  });
});
