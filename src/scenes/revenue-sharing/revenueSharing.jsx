import {Box, Button, Grid, IconButton, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {fetchAllPartnerDetailsAPI, fetchRevenueDataAPI, loginAPI} from "../../data/api";
import {useNavigate} from "react-router-dom";
import StatBox from "../../components/StatBox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CustomDataGrid from "../../components/CustomDataGrid";

export const columns = [

    {
        field: "mobileNumber",
        headerName: "Mobile_number",
        flex: 0.75, minWidth: 200
    },
    { field: "merchantID", headerName: "Merchant_ID",  minWidth: 100},
    { field: "merchantName", headerName: "Merchant Name",  minWidth: 140},
    {
        field: "amount",
        headerName: "Original_amt",
        flex: 0.4, minWidth: 100
    },
    {
        field: "mdrInPercentage",
        headerName: "MDR",
        flex: 0.4, minWidth: 100
    },
    {
        field: "mdrFee",
        headerName: "MDR_Amt",
        flex: 0.4, minWidth: 100
    },
    {
        field: "settledAmount",
        headerName: "Net_Amount",
        flex: 0.4, minWidth: 200
    },
    {
        field: "revenueSharingInPercentage",
        headerName: "percentage_fee",
        flex: 1.4, minWidth: 100
    },
    {
        field: "revenueSharing",
        headerName: "amount_fee",
        flex: 1.4, minWidth: 100
    },
    {
        field: "createdAt",
        headerName: "Txn Date Time",
        flex: 0.85,  minWidth: 200
    }
];

const RevenueSharing = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [transactionData, setTransactionData] = useState([]);
    const [partnerData, setpartnerData] = useState([]);
    const [partnerToken, setPartnerToken] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [totalCount, setTotalCount] = useState([]);
    const [revenueAmountLast1Month, setRevenueAmountLast1Month] = useState([]);
    const [revenueAmountMTD, setRevenueAmountMTD] = useState([]);
    const [totalAmount, setTotalAmount] = useState([]);
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [partnerSelectedOption, setPartnerSelectedOption] = useState("None");
    const [customDateSelectedOption, setCustomDateSelectedOption] = useState("custom_time");
    const navigate = useNavigate();

    const fetchAllPartnerDetails = async (navigate) => {
        try {
            return await fetchAllPartnerDetailsAPI(navigate);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchRevenueSharingData = async (fromDate, toDate, navigate, partnerToken) => {
        try {
            const data = await fetchRevenueDataAPI(fromDate, toDate, selectedOption, searchText, null, '', navigate, partnerToken);
            if (data && data.payments) {
                setTransactionData(data.payments);
                setTotalAmount(data.totalAmount ? data.totalAmount
                    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}) : 0);
                setTotalCount(data.successCount);
                setRevenueAmountLast1Month(data.revenueAmountLast1Month ? data.revenueAmountLast1Month
                    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}) : 0);
                setRevenueAmountMTD(data.revenueAmountMTD ? data.revenueAmountMTD
                    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}) : 0);
                setSearchText("");
            } else {
                setTransactionData([]);
                setTotalCount([]);
                setTotalAmount([]);
                setRevenueAmountLast1Month([]);
                setRevenueAmountMTD([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setSelectedOption("transactionId");
        handleFetchData();
        fetchAllPartnerDetails().then(r => {
            setpartnerData(r);
        })
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
        fetchRevenueSharingData(fromDate, toDate, navigate, partnerToken);
    };

    const handleSearch = () => {
        setFromDate('');
        setToDate('');
        fetchRevenueSharingData('', '', navigate, partnerToken);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    async function handlePartnerSelectedOption(value) {
        if (partnerData) {
            const partnerObject = partnerData.find(item => item.id === value);
            if (partnerObject) {
                const data = await loginAPI(partnerObject.clientId, partnerObject.clientKey);
                if (data) {
                    setPartnerToken(data.token);
                    console.log(partnerToken);
                    fetchRevenueSharingData(fromDate, toDate, navigate, data.token);
                }
            } else {
                setTransactionData([]);
                setTotalCount([]);
                setTotalAmount([]);
                setRevenueAmountLast1Month([]);
                setRevenueAmountMTD([]);
            }
        }
    }

    async function handleCustomDateSelectedOption(value) {
        const today = new Date();
        let date1;
        let date2;
        switch (value) {
            case "past_1_day" :
                const oneDayAgo = new Date(today);
                oneDayAgo.setDate(today.getDate() - 1);
                setToDate(today.toISOString().split("T")[0]);
                setFromDate(oneDayAgo.toISOString().split("T")[0]);
                date1 = oneDayAgo.toISOString().split("T")[0];
                date2 = today.toISOString().split("T")[0];
                fetchRevenueSharingData(date1, date2, navigate, partnerToken);
                break;
            case "past_1_week" :
                const oneWeekAgo = new Date(today);
                oneWeekAgo.setDate(today.getDate() - 7);
                setFromDate(oneWeekAgo.toISOString().split("T")[0]);
                setToDate(today.toISOString().split("T")[0]);
                date1 = oneWeekAgo.toISOString().split("T")[0];
                date2 = today.toISOString().split("T")[0];
                fetchRevenueSharingData(date1, date2, navigate, partnerToken);
                break;
            case "past_1_month" :
                const oneMonthAgo = new Date(today);
                oneMonthAgo.setDate(today.getDate() - 30);
                setFromDate(oneMonthAgo.toISOString().split("T")[0]);
                setToDate(today.toISOString().split("T")[0]);
                date1 = oneMonthAgo.toISOString().split("T")[0];
                date2 = today.toISOString().split("T")[0];
                fetchRevenueSharingData(date1, date2, navigate, partnerToken);
                break;
            case "past_mtd" :
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1; // Months are zero-based
                setFromDate(`${year}-${month.toString().padStart(2, '0')}-01`);
                setToDate(today.toISOString().split("T")[0]);
                date1 = `${year}-${month.toString().padStart(2, '0')}-01`;
                console.log(date1);
                date2 = today.toISOString().split("T")[0];
                fetchRevenueSharingData(date1, date2, navigate, partnerToken);
                break;
        }
    }

    return (
        <Box m="20px">
            <Header title= "Revenue Sharing Report" subtitle="List of Transaction" />
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
                        subtitle="#of success transactions that is applied revenue sharing"
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
                        title={revenueAmountLast1Month}
                        subtitle="Total Revenue Sharing(Past 30 Days)"
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
                        title={revenueAmountMTD}
                        subtitle="Total Revenue Sharing(Month Till Date)"
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
                    <Grid>
                        <Select
                            value={customDateSelectedOption}
                            onChange={(e) => {
                                setCustomDateSelectedOption(e.target.value)
                                handleCustomDateSelectedOption(e.target.value)
                            }}
                            sx={{ ml: 2, color: "#fff" }}
                        >
                            <MenuItem value="custom_time">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    Custom Time
                                </Typography>
                            </MenuItem>
                            <MenuItem value="past_1_day">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    Past 1 Day
                                </Typography>
                            </MenuItem>
                            <MenuItem value="past_1_week">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    Past 1 Week
                                </Typography>
                            </MenuItem>
                            <MenuItem value="past_1_month">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    Past 1 Month
                                </Typography>
                            </MenuItem>
                            <MenuItem value="past_mtd">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    MTD(Month Till Date)
                                </Typography>
                            </MenuItem>
                        </Select>
                    </Grid>
                    {partnerData && <Grid>
                        <Select
                            value={partnerSelectedOption}
                            onChange={(e) => {
                                setPartnerSelectedOption(e.target.value)
                                handlePartnerSelectedOption(e.target.value)
                            }}
                            sx={{ ml: 2, color: "#fff" }}
                        >
                            <MenuItem value="None">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    Select Merchant
                                </Typography>
                            </MenuItem>
                            {partnerData.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    <Typography sx={{ color: colors.grey[100], textAlign: 'center' }}>
                                        {item.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>}
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
                />
            </Box>
        </Box>
    );
};

export default RevenueSharing;
