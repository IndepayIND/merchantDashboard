import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Cookies from "js-cookie";

const PaymentTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contactsData, setContactsData] = useState([]);

    const columns = [
        { field: "id", headerName: "Payment ID", flex: 0.5 },
        { field: "merchantName", headerName: "Merchant Name" },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
        },
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            flex: 1,
        },
        {
            field: "paymentMethod",
            headerName: "Payment Method",
            flex: 1,
        },
        {
            field: "partnerRefId",
            headerName: "Partner Ref ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "successAt",
            headerName: "Success At",
            flex: 1,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = Cookies.get('accessToken');
                const refreshToken = Cookies.get('refreshToken');
                const response = await fetch(
                    "https://dev.tara.app/v0.1/tara/pgrouter/dashboard/txn?fromDate=2023-06-10&toDate=2023-06-12",
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setContactsData(data.data);
                } else {
                    //TODO call refresh token api
                    console.log(data.errorDescription);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contactsData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default PaymentTable;
