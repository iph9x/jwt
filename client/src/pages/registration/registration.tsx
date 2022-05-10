import { useState, VFC, ChangeEvent, SyntheticEvent } from 'react';

import { useAppDispatch } from 'src/store/store';
import { singUp } from 'src/store/user/action';

import styles from './registration.module.scss';

const RegistrationPage: VFC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();

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

    dispatch(singUp({ email, password }));
  };

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
        <button type="submit">Sign up</button>
      </form>
    </main>
  );
};

export default RegistrationPage;
