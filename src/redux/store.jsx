import { configureStore } from '@reduxjs/toolkit';
import candidatesReducer from './candidatesReducer';
import commentsReducer from './commentsReducer';

const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    comments: commentsReducer,
  },
});

export default store;
