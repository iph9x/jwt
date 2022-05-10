import React from 'react';

import { useAppDispatch, useAppSelector } from 'src/store/store';
import { getUsers, logout } from 'src/store/user/action';

import styles from './main.module.scss';

const MainPage: React.VFC = () => {
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((store) => store.userReducer);

  const handleUsersLoadButtonClick = () => {
    dispatch(getUsers());
  };

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <main className={styles.main}>
      <h1>main</h1>
      <button type="button" onClick={handleUsersLoadButtonClick}>
        Load users
      </button>
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li>{user}</li>
          ))}
        </ul>
      )}
      <button type="button" onClick={handleLogoutButtonClick}>
        Logout
      </button>
    </main>
  );
};

export default MainPage;
