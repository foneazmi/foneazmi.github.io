import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { global } from "./reducers";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "./middleware";
import { encryptTransform } from "redux-persist-transform-encrypt";

const reducer = combineReducers({
  global: persistReducer(
    {
      key: "global",
      storage,
      transforms: [
        encryptTransform({
          secretKey: "ini apa",
          onError: function (error) {
            console.log(error);
          },
        }),
      ],
    },
    global
  ),
});

export const store = configureStore({
  reducer,
  middleware: [loggerMiddleware, thunkMiddleware],
});

export const persistor = persistStore(store);
