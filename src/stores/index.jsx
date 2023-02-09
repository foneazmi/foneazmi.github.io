import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { global } from "./reducers";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "./middleware";
// import { encryptTransform } from "redux-persist-transform-encrypt";
// const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const reducer = combineReducers({
  global: persistReducer(
    {
      key: "global",
      storage,
      blacklist: ["loading", "_persist"],
      // transforms: [
      //   encryptTransform({
      //     secretKey: SECRET_KEY,
      //     onError: function (error) {
      //       console.log(error);
      //     },
      //   }),
      // ],
    },
    global
  ),
});

export const store = configureStore({
  reducer,
  middleware: [loggerMiddleware, thunkMiddleware],
});

export const persistor = persistStore(store);
