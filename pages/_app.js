import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";

// redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookmarks from "../reducers/bookmarks";
import user from "../reducers/user";
import hiddenArticles from "../reducers/hiddenArticles";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { useState } from "react";
import Connexion from "../components/Connexion";

const reducers = combineReducers({ bookmarks, user, hiddenArticles });
const persistConfig = { key: "morningnews", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  const [isPopupConnexionVisible, setIsPopupConnexionVisible] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Global News Nexus</title>
        </Head>
        <div className="px-8 max-w-7xl mx-auto pb-5 lg:pb-10">
          <Header
            setIsPopupConnexionVisible={setIsPopupConnexionVisible}
            isPopupConnexionVisible={isPopupConnexionVisible}
          />
          {isPopupConnexionVisible && (
            <Connexion
              setIsPopupConnexionVisible={setIsPopupConnexionVisible}
            />
          )}
          <Component {...pageProps} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
