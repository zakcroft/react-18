import { useParams, useNavigate } from "react-router-dom";

import { getInvoice, deleteInvoice } from "../api/invoices";

export function Invoice() {
  let navigate = useNavigate();
  let params = useParams();
  let invoice = getInvoice(Number(params.invoiceId));
  return (
    <main className={"absolute left-1/2 top-1/4 -translate-x-1/2"}>
      <h2>Total Due: {invoice?.amount}</h2>
      <p>
        {invoice?.name}: {invoice?.number}
      </p>
      <p>Due Date: {invoice?.due}</p>
      <p>
        <button
          className={
            "flex px-5 py-2 mx-auto mt-6 text-white bg-indigo-500 rounded border-0 focus:outline-none hover:bg-indigo-600"
          }
          onClick={() => {
            deleteInvoice(invoice?.number);
            navigate("/react-router");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
export default Invoice;
