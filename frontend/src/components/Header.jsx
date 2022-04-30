import React, { useEffect } from 'react';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaListAlt,
  FaHome,
  FaCalendarAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FcTimeline } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import decode from 'jwt-decode';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) onLogout();
    }
  }, [user]);

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Task Management</Link>
      </div>

      <ul>
        {user?.counter === 1 ? (
          <>
            <li>
              <Link to='/'>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to='calendar'>
                <FaCalendarAlt /> Calendar
              </Link>
            </li>
            <li>
              <Link to='projects'>
                <FaListAlt /> Projects
              </Link>
            </li>
            <li>
              <Link to='gantt'>
                <FcTimeline /> Timeline
              </Link>
            </li>
            {user.role && (
              <>
                <li>
                  <Link to='email'>
                    <MdEmail /> Bulk Email
                  </Link>
                </li>
                <li>
                  <Link to='newuser'>
                    <FaUser /> New User
                  </Link>
                </li>
              </>
            )}
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            {/* <li>
              <Link to='register'>
                <FaUser /> Register
              </Link>
            </li> */}
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
