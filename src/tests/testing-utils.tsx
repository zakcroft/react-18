import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement, ReactNode, FunctionComponent } from "react";
import { MemoryRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "../store/counterSlice";

const initState = {
  counter: {
    value: 0,
  },
};

const r = (
  ui: ReactElement,
  preloadedState = initState,
  {
    store = configureStore({
      reducer: { counter: counterSlice },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  };

  return render(ui, {
    wrapper: Wrapper as FunctionComponent,
    ...renderOptions,
  });
};

export * from "@testing-library/react";
export { r as render, userEvent };
