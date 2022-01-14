import { rest } from "msw";
import { setupServer } from "msw/node";

import dbInvoices from "../db/dbBackup.json";

const handlers = [
  rest.get("/invoices", (req, res, ctx) => {
    return res(ctx.json(dbInvoices));
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json({ name: `Next pokemon ${id}` }), ctx.delay(150));
  }),
];

export const server = setupServer(...handlers);
