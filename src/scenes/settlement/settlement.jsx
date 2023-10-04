import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {fetchSettlementDataAPI} from "../../data/api";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StatBox from "../../components/StatBox";
import CustomDataGrid from "../../components/CustomDataGrid";

export const columns = [
    { field: "id", headerName: "Tara_Payment_ID", minWidth: 300},
    { field: "merchantName", headerName: "Merchant",  minWidth: 100},
    { field: "merchantID", headerName: "Merchant_ID",  minWidth: 100},
    { field: "subMerchantName", headerName: "Sub_Merchant_Name",  minWidth: 200},
    {
        field: "amount",
        headerName: "Amount",
        flex: 0.4, minWidth: 100
    },
    {
        field: "createdAt",
        headerName: "Txn_Date_Time",
        flex: 0.85,  minWidth: 200
    },
    {
        field: "remarks",
        headerName: "Remarks",
        flex: 1,minWidth: 200
    },
    {
        field: "paymentStatus",
        headerName: "Transaction_Status",
        flex: 0.5, minWidth: 150
    },
    {
        field: "paymentMethod",
        headerName: "Transaction_Type",
        flex: 0.5, minWidth: 150
    },
    {
        field: "mdrFee",
        headerName: "MDR_Fee",
        flex: 0.4, minWidth: 100
    },
    {
        field: "tax",
        headerName: "Tax",
        flex: 0.4, minWidth: 100
    },
    {
        field: "registrationPrincipalSource",
        headerName: "Registration_Source",
        flex: 0.4, minWidth: 200
    },
    {
        field: "settledAmount",
        headerName: "Settlement_Amount",
        flex: 0.4, minWidth: 200
    },
    {
        field: "partnerRefId",
        headerName: "Partner_Ref_ID",
        flex: 1.4, minWidth: 300
    },
];

const Settlement = (paymentMethodCategory) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [transactionData, setTransactionData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [totalCount, setTotalCount] = useState([]);
    const [totalAmount, setTotalAmount] = useState([]);
    const [totalPayID, setTotalPayID] = useState([]);
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    const fetchTransactionData = async (navigate) => {
        try {
            const data = await fetchSettlementDataAPI(fromDate, toDate, selectedOption, searchText, paymentMethodCategory, false,'', navigate);
            if (data && data.payments) {
                setTransactionData(data.payments);
                setTotalAmount(data.totalAmount ? data.totalAmount
                    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}) : 0);
                setTotalCount(data.successCount);
                setTotalPayID(data.mobileNumberCount);
            } else {
                setTransactionData([]);
                setTotalCount([]);
                setTotalPayID([]);
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
            <Header title={paymentMethodCategory === "indepayFastCheckOut" ? "Bank Account Details" : "Card Details"} subtitle="List of Transaction" />
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={totalAmount}
                        subtitle="Total Success Amount"
                    />
                </Box>
                <Box
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={totalCount}
                        subtitle="Total Success Count"
                    />
                </Box>
                <Box
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={totalPayID}
                        subtitle="Unique Pay IDs Interacted With System"
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
                    <MenuItem value="transactionId">
                        <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                            Transaction ID
                        </Typography>
                        </MenuItem>
                    <MenuItem value="mobileNumber">
                        <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                        Mobile Number
                        </Typography>
                    </MenuItem>
                    <MenuItem value="referenceId">
                        <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                        Reference ID
                        </Typography>
                    </MenuItem>
                </Select>

                {/* Search input */}
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
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
                <CustomDataGrid
                    rows={transactionData}
                    columns={columns}
                    fileName={paymentMethodCategory === "indepayFastCheckOut" ? "REPORT_BANK_INDEPAY" : "REPORT_CARD_INDEPAY"}
                />
            </Box>
        </Box>
    );
};

export default Settlement;
