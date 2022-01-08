import {
  NavLink,
  Outlet,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { getInvoices } from "../api/invoices";

export function Invoices() {
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  console.log(location);
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
      <div className={"flex flex row items-center"}>
        <nav className={"p-4 border-solid border-r-2"}>
          {invoices
            .filter((invoice) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = invoice.name.toLowerCase();
              return name.startsWith(filter.toLowerCase());
            })
            .map((invoice) => (
              <NavLink
                className={`block m-5 hover:text-amber-300 hover:underline ${({
                  isActive,
                }: {
                  isActive: Boolean;
                }) => (isActive ? "red" : "blue")}`}
                to={`./${invoice.number}/${location.search}`}
                key={invoice.number}
              >
                {invoice.name} {invoice.number}
              </NavLink>
            ))}
        </nav>
        <Outlet />
      </div>
    </>
  );
}
