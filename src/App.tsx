import React, { useState, useTransition, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Batching from "./components/Batching";

import {
  PageLayout,
  Home,
  UseDeferredValue,
  StartTransition,
  NoMatch,
  Invoices,
  Invoice,
} from "./components";

import "./css/main.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="batching" element={<Batching />} />
            <Route path="startTransition" element={<StartTransition />} />
            <Route path="useDeferredValue" element={<UseDeferredValue />} />
            <Route path="react-router" element={<Invoices />}>
              <Route
                index
                element={
                  <main
                    className={"absolute left-1/2 top-1/4 -translate-x-1/2"}
                  >
                    <p>Select an invoice</p>
                  </main>
                }
              />
              <Route path=":invoiceId" element={<Invoice />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
