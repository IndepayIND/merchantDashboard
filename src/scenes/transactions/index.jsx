import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { fetchTransactionData, fetchTransactionDataByOption } from "../../data/api";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StatBox from "../../components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

export const columns = [
    { field: "id", headerName: "Transaction ID", flex: 1.4 },
    { field: "merchantName", headerName: "Merchant", flex: 0.5 },
    {
        field: "amount",
        headerName: "Amount",
        flex: 0.4,
    },
    {
        field: "mobileNumber",
        headerName: "Mobile number",
        flex: 0.75,
    },
    {
        field: "paymentStatus",
        headerName: "Status",
        flex: 0.5,
    },
    {
        field: "paymentMethod",
        headerName: "Method",
        flex: 0.5,
    },
    {
        field: "partnerRefId",
        headerName: "Partner Ref ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex: 0.85,
    },
    {
        field: "successAt",
        headerName: "Success At",
        flex: 0.85,
    },
];

const PaymentTable = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [contactsData, setContactsData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const fetchTransactionDataByDate = async (navigate) => {
        try {
            const data = await fetchTransactionData(fromDate, toDate, navigate);
            if (data) {
                // console.log(data);
                setContactsData(data.payments);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTransactionDataByOptionSelected = async (navigate) => {
        try {
            const data = await fetchTransactionDataByOption(selectedOption, searchText, navigate);
            if (data) {
                // console.log(data);
                setContactsData(data.payments);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedOption("transactionId");
        fetchTransactionDataByDate(navigate);
    }, []);

    const handleFetchData = () => {
        fetchTransactionDataByDate(navigate);
    };

    const handleSearch = () => {
        fetchTransactionDataByOptionSelected(navigate);
        if (searchText.trim() !== "" && selectedOption.trim() !== "") {
            setSearchText("");
        }
    };

    return (
        <Box m="20px">
            <Header title="Transaction Details" subtitle="List of Transaction" />
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="12,361"
                        subtitle="Emails Sent"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <EmailIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="431,225"
                        subtitle="Sales Obtained"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <PointOfSaleIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Box>
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
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                {/* Dropdown component */}
                <Select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    sx={{ ml: 2, color: "#fff" }}
                >
                    <MenuItem value="transactionId">Transaction ID</MenuItem>
                    <MenuItem value="mobileNumber">Mobile Number</MenuItem>
                    <MenuItem value="referenceId">Reference ID</MenuItem>
                </Select>

                {/* Search input */}
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
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
                    rows={contactsData}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default PaymentTable;
