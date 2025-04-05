import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./modules/billStore";

//配置全局store

const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});

export default store;
