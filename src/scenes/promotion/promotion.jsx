import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {fetchPromotionDataAPI} from "../../data/api";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        field: "id", headerName: "Tara_Payment_ID", minWidth: 300,
        flex: 1
    },
    {
        field: "mobileNumber", headerName: "Pay_ID", minWidth: 150,
        flex: 1
    },
    {
        field: "merchantName", headerName: "Applied_Partner", minWidth: 150,
        flex: 1
    },
    {
        field: "amount",
        headerName: "Discounted_Amount",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "unDiscountedAmount",
        headerName: "Original_Amount",
        minWidth: 150,
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "Payment_Date",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "successAt",
        headerName: "Payment_Success_Date",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "paymentStatus",
        headerName: "Payment_Status",
        minWidth: 150,
        flex: 1,
    },
    {
        field: "paymentMethod",
        headerName: "Payment_Method",
        minWidth: 150,
        flex: 1,
    },
    {
        field: "remarks",
        headerName: "Remarks",
        minWidth: 100,
        flex: 1,
    },
];

const Promotion = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [transactionData, setTransactionData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    const fetchPromotionData = async (navigate) => {
        try {
            const data = await fetchPromotionDataAPI(fromDate, toDate, selectedOption, searchText, '', navigate);
            console.log(data);
            if (data) {
                if (data.payments) {
                    setTransactionData(data.payments);
                } else {
                    setTransactionData("");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setSelectedOption("transactionId");
        handleFetchData();
    }, []);

    const handleFetchData = () => {
        if (!fromDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            setFromDate(`${year}-${month.toString().padStart(2, '0')}-01`);
        }

        // Check if toDate is empty or undefined
        if (!toDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            const day = currentDate.getDate();
            setToDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        }
        fetchPromotionData(navigate);
    };

    return (
        <Box m="20px">
            <Header title="Promotion Details" subtitle="List of Promotion" />
            <Box m="20px">
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1" style={{ fontSize: "16px" }}>
                            From:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            style={{ fontSize: "16px" }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" style={{ fontSize: "16px" }}>
                            To:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            style={{ fontSize: "16px" }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleFetchData}
                            sx={{ bgcolor: colors.blueAccent[700], fontSize: "16px", color: colors.grey[100] }}>
                            Fetch Data
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    overflowX: "scroll", // Make the Box horizontally scrollable
                    // Apply font size to the table cells
                    "& .MuiDataGrid-root .MuiDataGrid-cell": {
                        fontSize: "16px",
                    },
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
                        fontSize: "16px",
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
                        fontSize: "16px",
                    },
                }}
            >
                <DataGrid
                    rows={transactionData}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    autoHeight // Enable auto height to fit the content vertically
                    disableColumnMenu // Optionally disable the column menu if needed

                />
            </Box>
        </Box>
    );
};

export default Promotion;
