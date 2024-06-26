import {Box, Button, Grid, IconButton, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {fetchAffiliateDataAPI} from "../../data/api";
import {useNavigate} from "react-router-dom";
import StatBox from "../../components/StatBox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CustomDataGrid from "../../components/CustomDataGrid";

export const columns = [
    {
        field: "id",
        headerName: "Profile ID",
        flex: 0.6,
        minWidth: 70
    },
    {
        field: "firstName",
        headerName: "First Name",
        flex: 0.8,
        minWidth: 150
    },
    {
        field: "lastName",
        headerName: "Last Name",
        flex: 1,
        minWidth: 150
    },
    {
        field: "mobileNumber",
        headerName: "Mobile number",
        flex: 1,
        minWidth: 150
    },
    {
        field: "isKyc",
        headerName: "KYC Status",
        flex: 0.6,
        minWidth: 100
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 180
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
        minWidth: 150
    },
];

const Affiliate = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [affiliateData, setAffiliateData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [totalCount, setTotalCount] = useState([]);
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [customDateSelectedOption, setCustomDateSelectedOption] = useState("custom_time");
    const navigate = useNavigate();

    const fetchAffiliateData = async (fromDate, toDate, navigate) => {
        try {
            const data = await fetchAffiliateDataAPI(fromDate, toDate, selectedOption, searchText, '', navigate);
            if (data && data.affiliate) {
                setAffiliateData(data.affiliate);
                setTotalCount(data.successCount);
            } else {
                setAffiliateData([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setSelectedOption("mobileNumber");
        handleFetchData();
    }, []);

    const handleFetchData = () => {
        fetchAffiliateData(fromDate, toDate, navigate);
    };

    const handleSearch = () => {
        setFromDate('');
        setToDate('');
        fetchAffiliateData(fromDate, toDate, navigate);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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
                fetchAffiliateData(date1, date2, navigate);
                break;
            case "past_1_week" :
                const oneWeekAgo = new Date(today);
                oneWeekAgo.setDate(today.getDate() - 7);
                setFromDate(oneWeekAgo.toISOString().split("T")[0]);
                setToDate(today.toISOString().split("T")[0]);
                date1 = oneWeekAgo.toISOString().split("T")[0];
                date2 = today.toISOString().split("T")[0];
                fetchAffiliateData(date1, date2, navigate);
                break;
            case "past_1_month" :
                const oneMonthAgo = new Date(today);
                oneMonthAgo.setDate(today.getDate() - 30);
                setFromDate(oneMonthAgo.toISOString().split("T")[0]);
                setToDate(today.toISOString().split("T")[0]);
                date1 = oneMonthAgo.toISOString().split("T")[0];
                date2 = today.toISOString().split("T")[0];
                fetchAffiliateData(date1, date2, navigate);
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
                fetchAffiliateData(date1, date2, navigate);
                break;
            default:
                return;
        }
    }

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
                    gridColumn="span 2"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={totalCount}
                        subtitle="#of successful Onboarding "
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
                    <MenuItem value="mobileNumber">
                        <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                            Mobile Number
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
                    rows={affiliateData}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Affiliate;
