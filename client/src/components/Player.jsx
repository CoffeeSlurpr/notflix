import React, { useState } from 'react';
import '../scss/player.scss';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBars,
  faXmark,
  faRotateLeft,
  faPlay,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';

const url = 'https://www.youtube.com/watch?v=pEfrdAtAmqk&ab_channel=Fireship';
const languages = ['Magyar', 'English', '日本', '>عر'];

function Player() {
  const [isHovered, setIsHovered] = useState(false);
  const [isInSettings, setIsInSettings] = useState(false);

  const [isSubtitleOn, setIsSubtitleOn] = useState(false);
  const [isLanguageOn, setIsLanguageOn] = useState(false);

  const handleIsSwitchActive = (boolean) => {
    if (boolean) return 'switch-active';
    if (!boolean) return '';
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
    console.log('hovered');
  };

  const handleSettingsMenu = () => {
    setIsInSettings(!isInSettings);
  };

  const renderOverlay = () => {
    return (
      <div
        className={`player-overlay d-flex flex-column pt-2 ${
          isInSettings && 'invisible'
        }`}
      >
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
          <div className="controls d-flex justify-content-center align-items-center gap-2">
            <div className="d-flex justify-content-center align-items-center">
              <div className="skip-time">10</div>
              <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            <FontAwesomeIcon icon={faPlay} />
            <div className="d-flex justify-content-center align-items-center">
              <FontAwesomeIcon icon={faRotateRight} />
              <div className="skip-time">10</div>
            </div>
          </div>

          {/* timeline */}
          <div className="w-100 timeline-container d-flex justify-content-between align-items-center">
            <div className="text-center col-1">0:00</div>
            <div className="w-100 d-flex justify-content-center">
              <div className="timeline w-100">
                <div className="indicator"></div>
              </div>
            </div>
            <div className="text-center col-1">-0:00</div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="settings-overlay pt-2">
        <div
          onClick={handleSettingsMenu}
          className="d-flex align-items-center px-3 position-absolute"
          style={{ cursor: 'pointer' }}
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
              <div className="category p-2">Subtitle</div>
              <div className="options-list my-2">
                {languages.map((lang) => {
                  return <div className="p-1">{lang}</div>;
                })}
              </div>
              <div className="d-flex justify-content-center">
                <div
                  onClick={() => setIsSubtitleOn(true)}
                  className={`w-100 switch-on p-1 ${
                    isSubtitleOn && 'switch-active'
                  }`}
                >
                  On
                </div>
                <div
                  onClick={() => setIsSubtitleOn(false)}
                  className={`w-100 switch-off p-1 ${
                    !isSubtitleOn && 'switch-active'
                  }`}
                >
                  Off
                </div>
              </div>
            </div>

            <div className="option-menu">
              <div className="category p-2">Language</div>
              <div className="options-list my-2">
                {languages.map((lang) => {
                  return <div className="p-1">{lang}</div>;
                })}
              </div>
              <div className="d-flex justify-content-center">
                <div
                  onClick={() => setIsLanguageOn(true)}
                  className={`w-100 switch-on p-1 ${
                    isLanguageOn && 'switch-active'
                  }`}
                >
                  On
                </div>
                <div
                  onClick={() => setIsLanguageOn(false)}
                  className={`w-100 switch-off p-1 ${
                    !isLanguageOn && 'switch-active'
                  }`}
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
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="player-wrapper h-75"
    >
      {isHovered && renderOverlay()}

      {isInSettings && renderSettings()}

      <ReactPlayer className="player" width="100%" height="100%" url="" />
    </div>
  );
}

export default Player;
