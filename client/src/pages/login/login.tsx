import { useState, VFC, ChangeEvent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from 'src/shared/constants';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { singIn } from 'src/store/user/action';

import styles from './login.module.scss';

const LoginPage: VFC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();

  const { isFetching } = useAppSelector((store) => store.userReducer);

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmail(value);
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      dispatch(singIn({ email, password }));
    }
  };

  if (isFetching) {
    return <p>Fetching</p>;
  }

  return (
    <main className={styles.main}>
      <form onSubmit={onSubmit}>
        <label>
          <div>email:</div>
          <input name="email" type="email" value={email} onChange={handleEmailInputChange} />
        </label>
        <label>
          <div>password:</div>
          <input name="password" type="password" value={password} onChange={handlePasswordInputChange} />
        </label>
        <button type="submit">Log in</button>
      </form>
      <Link to={ROUTES.registration}>Sign up</Link>
    </main>
  );
};

export default LoginPage;
