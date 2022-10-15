import React, { useState, useRef, useEffect } from 'react';
import '../scss/player.scss';
import ReactPlayer from 'react-player';
import Time from './Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBars,
  faXmark,
  faRotateLeft,
  faPlay,
  faRotateRight,
  faVolumeHigh,
  faExpand,
  faCompress,
  faPause,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

const url = 'https://www.youtube.com/watch?v=pEfrdAtAmqk&ab_channel=Fireship';
const languages = ['Magyar', 'English', '日本', '>عر'];

function Player() {
  const [isHovered, setIsHovered] = useState(false);
  const [isInSettings, setIsInSettings] = useState(false);

  const [isLanguageOn, setIsLanguageOn] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const timelineRef = useRef();
  const volumeRef = useRef();
  const playerRef = useRef();
  const playerWrapper = useRef();

  const [playerState, setPlayerState] = useState({
    url: url,
    volume: 0.2,
    muted: false,
    playing: false,
    controls: false,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    duration: 0,
    pip: false,
    seeking: false,
    volumeSeeking: false,
    languages: [],
  });

  useEffect(() => {
    const state = window.localStorage.getItem('playerState');

    if (state !== null) {
      setPlayerState({
        ...playerState,
        muted: state.muted,
        volume: state.volume,
        languages: state.languages,
      });

      setIsLanguageOn(state.isLanguageOn);
    }

    volumeRef.current.style.setProperty('--volume-position', playerState.volume);
  }, []);

  useEffect(() => {
    const state = {
      muted: playerState.muted,
      volume: playerState.volume,
      languages: playerState.languages,
      isLanguageOn: isLanguageOn,
    };

    window.localStorage.setItem('playerState', JSON.stringify(state));
  }, [playerState.muted, playerState.volume]);

  const handleSettingsMenu = () => {
    setIsInSettings(!isInSettings);
  };

  const handlePlayPause = () => {
    setPlayerState({ ...playerState, playing: !playerState.playing });
  };

  const handleDuration = (duration) => {
    console.log('onDuration', duration);
    setPlayerState({ ...playerState, duration });
  };

  const handleProgress = (progress) => {
    if (!playerState.seeking) {
      setPlayerState({
        ...playerState,
        played: progress.played,
        playedSeconds: progress.playedSeconds,
        loaded: progress.loaded,
        loadedSeconds: progress.loadedSeconds,
      });

      timelineRef.current.style.setProperty('--progress-position', progress.played);

      timelineRef.current.style.setProperty('--load-position', progress.loaded);
    }
  };

  const handleSeekMouseDown = () => {
    setPlayerState({ ...playerState, seeking: true });
  };

  const handleSeekChange = (e) => {
    if (playerState.seeking) {
      const cursorPosition = timelineRef.current.getBoundingClientRect();
      const timelinePercent =
        Math.min(Math.max(0, e.pageX - cursorPosition.x), cursorPosition.width) /
        cursorPosition.width;

      timelineRef.current.style.setProperty('--progress-position', timelinePercent);
    }
  };

  const handleSeekMouseUp = (e) => {
    const cursorPosition = timelineRef.current.getBoundingClientRect();
    const timelinePercent =
      Math.min(Math.max(0, e.pageX - cursorPosition.x), cursorPosition.width) /
      cursorPosition.width;

    playerRef.current.seekTo(timelinePercent, 'fraction');

    setPlayerState({
      ...playerState,
      played: timelinePercent,
    });

    setPlayerState({ ...playerState, seeking: false });
  };

  const handleSeekClick = (e) => {
    const cursorPosition = timelineRef.current.getBoundingClientRect();
    const timelinePercent =
      Math.min(Math.max(0, e.pageX - cursorPosition.x), cursorPosition.width) /
      cursorPosition.width;

    setPlayerState({
      ...playerState,
      played: timelinePercent,
    });

    playerRef.current.seekTo(timelinePercent, 'fraction');

    timelineRef.current.style.setProperty('--progress-position', timelinePercent);
  };

  const handleVolumeMouseDown = () => {
    setPlayerState({ ...playerState, volumeSeeking: true });
  };

  const handleVolumeChange = (e) => {
    if (playerState.volumeSeeking) {
      const cursorPosition = volumeRef.current.getBoundingClientRect();
      const volumePercent =
        Math.min(Math.max(0, e.pageX - cursorPosition.x), cursorPosition.width) /
        cursorPosition.width;

      setPlayerState({ ...playerState, volume: volumePercent });

      volumeRef.current.style.setProperty('--volume-position', volumePercent);
    }
  };

  const handleVolumeMouseUp = () => {
    setPlayerState({ ...playerState, volumeSeeking: false });
  };

  const handleVolumeClick = (e) => {
    const cursorPosition = volumeRef.current.getBoundingClientRect();
    const volumePercent =
      Math.min(Math.max(0, e.pageX - cursorPosition.x), cursorPosition.width) /
      cursorPosition.width;

    setPlayerState({ ...playerState, volume: volumePercent });

    volumeRef.current.style.setProperty('--volume-position', volumePercent);
  };

  const handleToggleMute = () => {
    setPlayerState({ ...playerState, muted: !playerState.muted });
  };

  const handleForwardRewind = (seconds) => {
    if (Math.sign(seconds) === 1)
      playerRef.current.seekTo(playerState.playedSeconds + 10, 'seconds');
    if (Math.sign(seconds) === -1)
      playerRef.current.seekTo(playerState.playedSeconds - 10, 'seconds');
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    if (!isFullscreen) playerWrapper.current.requestFullscreen();
    if (isFullscreen) document.exitFullscreen();
  };

  const renderOverlay = () => {
    return (
      <div className={`player-overlay d-flex flex-column pt-2 ${isInSettings && 'invisible'}`}>
        {/* header */}
        <div className="d-flex">
          <div className="d-flex align-items-center px-3">
            <FontAwesomeIcon icon={faArrowLeft} />
            <div className="ps-1" style={{ fontSize: '12px' }}>
              Back
            </div>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-start flex-grow-1">
            <div className="player-title">Title - Season X</div>
            <div className="player-subtext">Episode name (part X)</div>
          </div>

          <div className="d-flex align-items-end flex-column justify-content-center px-3">
            <div className="player-logo">Notflix</div>

            <div
              onClick={handleSettingsMenu}
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ cursor: 'pointer' }}
            >
              <div className="pe-1" style={{ fontSize: '10px' }}>
                Settings
              </div>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </div>

        <div className="h-100 d-flex flex-column justify-content-end">
          {/* controls */}
          <div className="controls d-flex justify-content-center align-items-center px-3">
            <div
              onMouseMove={(e) => handleVolumeChange(e)}
              onMouseUp={() => handleVolumeMouseUp()}
              className="col-1 d-flex justify-content-start align-items-center gap-2 h-100"
            >
              <div onClick={handleToggleMute}>
                {playerState.muted && <FontAwesomeIcon icon={faVolumeMute} />}
                {!playerState.muted && <FontAwesomeIcon icon={faVolumeHigh} />}
              </div>
              <div
                ref={volumeRef}
                onClick={(e) => handleVolumeClick(e)}
                onMouseDown={() => handleVolumeMouseDown()}
                className={`volume-bar ${playerState.muted && 'invisible'}`}
              >
                <div className="indicator"></div>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2 w-100">
              <div
                onClick={() => handleForwardRewind(-10)}
                className="d-flex justify-content-center align-items-center controls-element"
              >
                <div className="skip-time">10</div>
                <FontAwesomeIcon icon={faRotateLeft} />
              </div>

              <div
                className="controls-element d-flex justify-content-center"
                onClick={handlePlayPause}
              >
                {!playerState.playing && <FontAwesomeIcon icon={faPlay} />}
                {playerState.playing && <FontAwesomeIcon icon={faPause} />}
              </div>

              <div
                onClick={() => handleForwardRewind(10)}
                className="d-flex justify-content-center align-items-center controls-element"
              >
                <FontAwesomeIcon icon={faRotateRight} />
                <div className="skip-time">10</div>
              </div>
            </div>

            <div onClick={handleToggleFullscreen} className="col-1 d-flex justify-content-end">
              {!isFullscreen && <FontAwesomeIcon icon={faExpand} style={{ fontSize: '16px' }} />}
              {isFullscreen && <FontAwesomeIcon icon={faCompress} style={{ fontSize: '16px' }} />}
            </div>
          </div>

          {/* timeline */}
          <div
            onMouseMove={(e) => handleSeekChange(e)}
            onMouseUp={(e) => handleSeekMouseUp(e)}
            className="w-100 timeline-container d-flex justify-content-between align-items-center"
          >
            <Time
              className="text-center time"
              seconds={playerState.duration * playerState.played}
            ></Time>
            <div className="w-100 d-flex justify-content-center">
              <div
                ref={timelineRef}
                onClick={(e) => handleSeekClick(e)}
                onMouseDown={() => handleSeekMouseDown()}
                className="timeline w-100"
              >
                <div className="indicator"></div>
              </div>
            </div>
            <Time className="text-center time" seconds={playerState.duration}></Time>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="settings-overlay pt-2 d-flex flex-column pt-2">
        <div
          onClick={handleSettingsMenu}
          className="d-flex align-items-center px-3 position-absolute"
          style={{ cursor: 'pointer', height: '52px' }}
        >
          <FontAwesomeIcon icon={faXmark} />
          <div className="ps-1" style={{ fontSize: '12px' }}>
            Close
          </div>
        </div>

        <div className="options d-flex justify-content-center text-center flex-column h-100">
          <div className="pb-3 header">Settings</div>

          <div className="d-flex justify-content-center gap-5">
            <div className="option-menu">
              <div className="category p-2">Language</div>
              <div className="options-list my-2">
                {playerState.languages.map((lang, index) => {
                  return (
                    <div key={index} className="p-1">
                      {lang}
                    </div>
                  );
                })}
              </div>
              <div className="d-flex justify-content-center">
                <div
                  onClick={() => setIsLanguageOn(true)}
                  className={`w-100 switch-on p-1 ${isLanguageOn && 'switch-active'}`}
                >
                  On
                </div>
                <div
                  onClick={() => setIsLanguageOn(false)}
                  className={`w-100 switch-off p-1 ${!isLanguageOn && 'switch-active'}`}
                >
                  Off
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={playerWrapper}
      className="player-wrapper h-75"
    >
      <div className={!isHovered ? 'invisible' : ''}>{renderOverlay()}</div>

      {isInSettings && renderSettings()}

      <ReactPlayer
        ref={playerRef}
        className="player"
        width="100%"
        height="100%"
        url={playerState.url}
        pip={playerState.pip}
        playing={playerState.playing}
        volume={playerState.volume}
        muted={playerState.muted}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />
    </div>
  );
}

export default Player;
