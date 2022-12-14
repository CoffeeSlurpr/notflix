import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { NavLink, Link } from 'react-router-dom';
import Avatar from './Avatar';

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav>
      <div className="w-75 mx-auto d-flex py-4 justify-content-between align-items-center">
        <div className="d-flex gap-5 left-nav">
          <NavLink className={'glow'} to={'/'} end>
            For you
          </NavLink>
          <NavLink className={'glow'} to={'/movies'}>
            Movies
          </NavLink>
          <NavLink
            className={'glow'}
            to={'/series'}
            style={{ fontWeight: '500' }}
          >
            Series
          </NavLink>
        </div>
        <div>
          <Link className="logo" to={'/'}>
            Notflix
          </Link>
        </div>
        <div className="d-flex gap-5 right-nav">
          {isLoggedIn ? (
            <Avatar />
          ) : (
            <NavLink className={'glow'} to={'/login'}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
