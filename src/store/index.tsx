import { configureStore } from "@reduxjs/toolkit";

// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import counter from "./counterSlice";
import { invoicesApi } from "../api/";
import { pokemonApi } from "../api/axios";

console.log("invoicesApi", invoicesApi);

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    counter,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      invoicesApi.middleware,
      pokemonApi.middleware,
    ]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
