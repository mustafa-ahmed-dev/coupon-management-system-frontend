import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import uiReducer from "./slices/uiSlice";
import * as Sentry from "@sentry/react";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optional: Configure what state to capture
  actionTransformer: (action) => {
    // Don't capture sensitive actions
    if (action.type.includes("password") || action.type.includes("token")) {
      return { ...action, payload: "[Filtered]" };
    }
    return action;
  },
  stateTransformer: (state) => {
    // Don't capture sensitive state
    return {
      ...state,
      auth: {
        ...state.auth,
        token: state.auth.token ? "[Filtered]" : null,
      },
    };
  },
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
