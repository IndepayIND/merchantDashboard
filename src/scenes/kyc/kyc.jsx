import { Box, Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {fetchKYCDataAPI} from "../../data/api";
import { useNavigate } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid";

export const columns = [
    {
        field: "id", headerName: "Merchant ID", minWidth: 300,
        flex: 1
    },
    {
        field: "merchantName", headerName: "Owner Name", minWidth: 100,
        flex: 1
    },
    {
        field: "subMerchantName", headerName: "Phone No", minWidth: 100,
        flex: 1
    },
    {
        field: "amount",
        headerName: "Email",
        minWidth: 100,
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "NIK / ID Number",
        minWidth: 100,
        flex: 1,
    },
    {
        field: "remarks",
        headerName: "KTP Name",
        minWidth: 300,
        flex: 1,
    },
    {
        field: "paymentStatus",
        headerName: "Date of Birth",
        minWidth: 100,
        flex: 1,
    },
    {
        field: "paymentMethod",
        headerName: "KTP Address",
        minWidth: 100,
        flex: 1,
    },
    {
        field: "mdrFee",
        headerName: "Bank Account",
        minWidth: 100,
        flex: 1
    },
    {
        field: "tax",
        headerName: "Account Name",
        minWidth: 100,
        flex: 1
    },
    {
        field: "settledAmount",
        headerName: "Bank Name",
        minWidth: 100,
        flex: 1
    },
    {
        field: "partnerRefId",
        headerName: "Shop Name",
        minWidth: 100,
        flex: 1.8,
    },
    {
        field: "partnerRefId",
        headerName: "Shop Category",
        minWidth: 100,
        flex: 1.8,
    },
    {
        field: "partnerRefId",
        headerName: "Shop Address",
        minWidth: 100,
        flex: 1.8,
    },
];

const KYC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [transactionData, setTransactionData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    const fetchTransactionData = async (navigate) => {
        try {
            const data = await fetchKYCDataAPI(fromDate, toDate, selectedOption, searchText, '', navigate);
            if (data) {
                setTransactionData(data);
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
        fetchTransactionData(navigate);
    };

    const handleSearch = () => {
        setFromDate('');
        setToDate('');
        fetchTransactionData(navigate);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box m="20px">
            <Header title="KYC Details" subtitle="List of Transaction" />
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
                <CustomDataGrid
                    rows={transactionData}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default KYC;
