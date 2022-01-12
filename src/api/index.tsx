// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type InvoiceType = {
  id: number;
  name: string;
  amount: string;
  due: string;
};

// Define a service using a base URL and expected endpoints
export const invoicesApi = createApi({
  reducerPath: "invoices",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Invoices"],
  endpoints: (builder) => ({
    getInvoices: builder.query<InvoiceType[], void>({
      query: (name) => `invoices`,
      providesTags: [{ type: "Invoices" }],
    }),
    getInvoice: builder.query<InvoiceType, string>({
      query: (invoiceId) => `invoices/${invoiceId}`,
      providesTags: [{ type: "Invoices" }],
    }),
    updateInvoices: builder.mutation<InvoiceType, InvoiceType>({
      query(invoice) {
        return {
          url: `invoices/${invoice.id}`,
          method: "PUT",
          body: invoice,
        };
      },
      invalidatesTags: [{ type: "Invoices" }],
    }),
    deleteInvoices: builder.mutation<InvoiceType, InvoiceType>({
      query(invoice) {
        return {
          url: `invoices/${invoice.id}`,
          method: "DELETE",
          body: invoice,
        };
      },
      invalidatesTags: [{ type: "Invoices" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetInvoicesQuery,
  useUpdateInvoicesMutation,
  useDeleteInvoicesMutation,
  useGetInvoiceQuery,
} = invoicesApi;
