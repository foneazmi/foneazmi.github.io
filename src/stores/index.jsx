import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { global } from "./reducers";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "./middleware";

//? if got error delete this
import { invitation } from "../module/invitation/stores/reducer";

const reducer = combineReducers({
  global: persistReducer(
    {
      key: "global",
      storage,
      blacklist: ["loading", "_persist"],
    },
    global
  ),

  //? if got error delete this
  invitation,
});

export const store = configureStore({
  reducer,
  middleware: [loggerMiddleware, thunkMiddleware],
});

export const persistor = persistStore(store);
