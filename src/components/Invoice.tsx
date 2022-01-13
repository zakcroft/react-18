import {
  Suspense,
  useCallback,
  useMemo,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useParams, useNavigate } from "react-router-dom";

import invoicesApi, {
  InvoiceType,
  useGetInvoicesQuery,
  useDeleteInvoicesMutation,
  useUpdateInvoicesMutation,
  useGetInvoiceQuery,
} from "../api/";

export function Invoice() {
  let navigate = useNavigate();
  let { invoiceId = "" } = useParams();

  const [amount, updateAmount] = useState("");
  const {
    data: invoice,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetInvoiceQuery(invoiceId);

  const [updateInvoice] = useUpdateInvoicesMutation();
  const [deleteInvoice] = useDeleteInvoicesMutation();
  const updateInvoiceCb = useCallback(
    (invoice: InvoiceType, amount: string) =>
      updateInvoice({ ...invoice, amount }),
    [updateInvoice, amount]
  );

  // useEffect(() => {
  //   async () => {
  //     const done = await Promise.all(
  //       invoicesApi.util.getRunningOperationPromises()
  //     );
  //   };
  // }, [invoicesApi]);

  // const selectInvoice = useMemo(() => {
  //   // Return a unique selector instance  so that
  //   // the filtered results are correctly memoized
  //   return createSelector(
  //     (d: any) => {
  //       console.log("d====", d);
  //       return d;
  //     },
  //     (d: any, id: number) => id,
  //     (d: any, id: number) =>
  //       d.filter((invoice: InvoiceType) => invoice.id === id)
  //   );
  // }, []);

  // console.log(selectInvoice);

  // const { invoice } = useGetInvoicesQuery(undefined, {
  //   selectFromResult: ({ data }) => {
  //     return {
  //       invoice: data?.find(
  //         (invoice: InvoiceType) => invoice.id === Number(params.invoiceId)
  //       ),
  //     };
  //   },
  // });

  console.log("invoice===", invoice);

  return (
    <main className={"absolute left-1/2 top-1/4 -translate-x-1/2"}>
      <Suspense fallback={<h1>Loading invoice...</h1>}>
        <h2>Total Due: £{invoice?.amount}</h2>
        <p>
          {invoice?.name}: {invoice?.id}
        </p>
        <p>Due Date: {invoice?.due}</p>
      </Suspense>
      <div className="relative my-4">
        <input
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateAmount(e.target.value)
          }
          placeholder={"Cost"}
          type="number"
          id="email"
          name="cost"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <button
          className={
            "flex px-5 py-2 mx-auto mt-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600"
          }
          onClick={() => {
            if (invoice) {
              updateInvoiceCb(invoice, amount);
            }

            updateAmount("");
          }}
        >
          Update Cost
        </button>
      </div>
      <p>
        <button
          className={
            "flex px-5 py-2 mx-auto mt-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600"
          }
          onClick={() => {
            navigate("/react-router");
            if (invoice) {
              deleteInvoice(invoice);
            }
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
export default Invoice;
