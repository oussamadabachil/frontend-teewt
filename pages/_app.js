import "../styles/globals.css";
import Head from "next/head";
import logged from "../reducers/logged";
import { Provider } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducerLocal = combineReducers({ logged });

const persistConfig = { key: "hackatweet", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducerLocal),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>Teewt</title>
            <meta meta name="viewport" content="width=device-width, user-scalable=no" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
