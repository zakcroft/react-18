import { useMemo } from "react";
import {
  NavLink,
  Outlet,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { InvoiceType, useGetInvoicesQuery } from "../api/";
import { useAppSelector, useAppDispatch } from "../store/hooks";

export function Invoices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((s) => s.invoices);
  const dispatch = useAppDispatch();
  const { data: invoices = [] } = useGetInvoicesQuery();

  const sortedInvoices = useMemo(
    () =>
      invoices.slice().sort((a: InvoiceType, b: InvoiceType) => a.id - b.id),
    [invoices]
  );

  return (
    <>
      <div className={"flex justify-center text-black"}>
        <input
          placeholder={"Search name"}
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter, custom: "test" });
            } else {
              setSearchParams({});
            }
          }}
        />
      </div>
      <div className={"flex flex row items-center relative"}>
        <nav className={"p-4 border-solid border-r-2"}>
          {sortedInvoices
            .filter((invoice: InvoiceType) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = invoice.name.toLowerCase();
              return name.startsWith(filter.toLowerCase());
            })
            .map((invoice: InvoiceType) => (
              <NavLink
                className={`block m-5 hover:text-amber-300 hover:underline ${({
                  isActive,
                }: {
                  isActive: Boolean;
                }) => (isActive ? "red" : "blue")}`}
                to={`./${invoice.id}/${location.search}`}
                key={invoice.id}
              >
                {invoice.name} {invoice.id}
              </NavLink>
            ))}
        </nav>
        <Outlet />
      </div>
    </>
  );
}
