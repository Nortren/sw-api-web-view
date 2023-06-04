import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import MainLayout from '../connectors/MainLayout/MainLayout';
import { store } from '../store/store';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  );
};

export default App;
