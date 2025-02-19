"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/components/header";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useEffect } from "react";

const columns: GridColDef[] = [
  { field: "name", headerName: "Product Name" },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    type: "number",
  },
];

const Inventory = () => {
  const apiRef = useGridApiRef();
  const { data: products, isError, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (apiRef.current && !isLoading) {
      apiRef.current?.autosizeColumns({
        expand: true,
      });
    }
  }, [apiRef, isLoading]);

  const autosizeOptions = {
    expand: true,
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Header name="Inventory" />
      <DataGrid
        apiRef={apiRef}
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row.productId}
        autosizeOptions={autosizeOptions}
        className="bg-white w-full shadow rounded-lg border border-gray-200 mt-5 !text-gray-700 p-5"
      />
    </div>
  );
};

export default Inventory;
