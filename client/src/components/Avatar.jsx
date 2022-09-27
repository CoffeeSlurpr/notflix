import React from 'react';
import { Dropdown } from 'react-bootstrap';

const background =
  'https://m.media-amazon.com/images/M/MV5BNzdkZjM4MDMtZTg3OS00NWRhLWJhMmItMzE5OWVlYjdjNTZjXkEyXkFqcGdeQXVyOTM5NDY1MzU@._V1_.jpg';

function Avatar() {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          variant="none"
          id="dropdown-basic"
          className="avatar glow"
          style={{ backgroundImage: `url(${background})` }}
        ></Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu-center">
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Avatar;
