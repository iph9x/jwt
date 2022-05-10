import { useEffect } from 'react';

import { Router } from './router';
import { getAccessToken } from './shared/lib';
import { useAppDispatch } from './store/store';
import { checkAuth } from './store/user/action';
import './styles/index.scss';

const App: React.VFC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getAccessToken()) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return <Router />;
};

export default App;
