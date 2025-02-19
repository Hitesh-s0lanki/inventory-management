"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/components/header";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useEffect } from "react";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const apiRef = useGridApiRef();
  const { data: users, isError, isLoading } = useGetUsersQuery();

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

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Header name="Inventory" />
      <DataGrid
        apiRef={apiRef}
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row.userId}
        autosizeOptions={autosizeOptions}
        className="bg-white w-full shadow rounded-lg border border-gray-200 mt-5 !text-gray-700 p-5"
      />
    </div>
  );
};

export default Users;
