import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./AuthSlice";
import InboxReducer from "./InboxReducer";
import SentBoxReducer from "./SentBoxReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
     inboxReducer:InboxReducer,
     sentboxReducer:SentBoxReducer
  },
});

export default store;
