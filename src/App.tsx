import React, { useState, useTransition, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Batching from "./components/Batching";

import {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="batching" element={<Batching />} />
          <Route path="startTransition" element={<StartTransition />} />
          <Route path="useDeferredValue" element={<UseDeferredValue />} />
          <Route path="react-router" element={<Invoices />}>
            <Route
              index
              element={
                <main className={"absolute left-1/2 top-1/4 -translate-x-1/2"}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route path="*" element={<NoMatch />} />

          {/*<Route path="startTransition" element={<StartTransition />} />*/}
          {/*<Route index element={<StartTransition />} />*/}
          {/*<Route path="teams" element={<Teams />}>*/}
          {/*  <Route path=":teamId" element={<Team />} />*/}
          {/*  <Route path="new" element={<NewTeamForm />} />*/}
          {/*  <Route index element={<LeagueStandings />} />*/}
          {/*</Route>*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
