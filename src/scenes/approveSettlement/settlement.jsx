import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";
import {useEffect, useState} from "react";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {
    fetchAllCredentialDetailsAPI,
    fetchApproveSettlementDataAPI,
    sendApproveProceedSettlementDataAPI,
    sendApproveSettlementDataAPI,
    sendCancelSettlementDataAPI,
} from "../../data/api";
import {useNavigate} from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {DataGrid} from "@mui/x-data-grid";
import {CheckBox} from "@mui/icons-material";

export const columns = [
    {field: "id", headerName: "Tara_Payment_ID", minWidth: 300},
    {field: "merchantName", headerName: "Merchant", minWidth: 100},
    {field: "merchantID", headerName: "Merchant_ID", minWidth: 100},
    {field: "subMerchantName", headerName: "Sub_Merchant_Name", minWidth: 200},
    {
        field: "amount",
        headerName: "Amount",
        flex: 0.4, minWidth: 100
    },
    {
        field: "createdAt",
        headerName: "Txn_Date_Time",
        flex: 0.85, minWidth: 200
    },
    {
        field: "remarks",
        headerName: "Remarks",
        flex: 1, minWidth: 200
    },
    {
        field: "paymentStatus",
        headerName: "Transaction_Status",
        flex: 0.5, minWidth: 150
    },
    {
        field: "settlementStatus",
        headerName: "Settlement_Status",
        flex: 0.5, minWidth: 250
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

const ApproveSettlement = (paymentMethodCategory) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [transactionData, setTransactionData] = useState([]);
    const [openProceed, setOpenProceed] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [partnerData, setpartnerData] = useState([]);
    const [partnerClientId, setPartnerClientId] = useState("");
    const [proceedResult, setProceedResult] = useState(null);
    const [partnerSelectedOption, setPartnerSelectedOption] = useState("None");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [customDateSelectedOption, setCustomDateSelectedOption] = useState("custom_time");
    const navigate = useNavigate();

    const [selectedIds, setSelectedIds] = useState('');

    const fetchAllPartnerDetails = async (navigate) => {
        try {
            return await fetchAllCredentialDetailsAPI(navigate);
        } catch (error) {
            console.log(error);
        }
    };

    async function handlePartnerSelectedOption(value) {
        if (partnerData) {
            const partnerObject = partnerData.find(item => item.id === value);
            if (partnerObject) {
                setPartnerClientId(partnerObject.clientId);
                fetchTransactionData(fromDate, toDate, navigate, partnerObject.clientId);
            } else {
                setTransactionData([]);
            }
        }
    }

    const fetchTransactionData = async (fromDate, toDate, navigate, partnerClientId) => {
        try {
            const data = await fetchApproveSettlementDataAPI(fromDate, toDate, selectedOption, searchText,
                paymentMethodCategory, '', navigate, partnerClientId);
            if (data && data.payments) {
                setTransactionData(data.payments);
                setSelectedIds(transactionData.map((row) => row.id).join(','));
            } else {
                setTransactionData([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendApproveSettlementData = async () => {
        try {
            const data = await sendApproveSettlementDataAPI(selectedIds, navigate, partnerClientId);
            if (data) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendApproveProceedSettlementData = async () => {
        try {
            const data = await sendApproveProceedSettlementDataAPI(selectedIds, navigate, partnerClientId, proceedResult.finalAmount);
            if (data) {
                await fetchTransactionData(fromDate, toDate, navigate, partnerClientId);
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickOpenProceed = () => {
        setOpenProceed(true);
    };

    const handleClickOpenCancel = () => {
        setOpenCancel(true);
    };

    const handleCloseProceed = () => {
        setOpenProceed(false);
    };

    const handleCloseCancel = () => {
        setOpenCancel(false);
    };

    const handleConfirmProceed = async () => {
        setOpenProceed(false);
        const result = await sendApproveSettlementData();
        console.log(result);
        setProceedResult(result);
    };

    const handleConfirmCancel = () => {
        setOpenCancel(false);
        sendCancelSettlementData();
    };

    const handleBack = () => {
        setProceedResult(null);
    };

    const sendCancelSettlementData = async () => {
        try {
            const data = await sendCancelSettlementDataAPI(selectedIds, navigate, partnerClientId);
            if (data) {
                await fetchTransactionData(fromDate, toDate, navigate, partnerClientId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setSelectedOption("transactionId");
        fetchAllPartnerDetails().then(r => {
            setpartnerData(r);
        });
        handleFetchData();
    }, []);

    useEffect(() => {
        setSelectedIds(transactionData.map((row) => row.id).join(','))
    }, [transactionData]);

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
        fetchTransactionData(fromDate, toDate, navigate, partnerClientId);
    };

    const handleSearch = () => {
        setFromDate('');
        setToDate('');
        fetchTransactionData(fromDate, toDate, navigate, partnerClientId);
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
                fetchTransactionData(date1, date2, navigate, partnerClientId);
                break;
            case "past_1_week" :
                const oneWeekAgo = new Date(today);
                oneWeekAgo.setDate(today.getDate() - 7);
                setFromDate(oneWeekAgo.toISOString().split("T")[0]);
                setToDate(today.toISOString().split("T")[0]);
                date1 = oneWeekAgo.toISOString().split("T")[0];
                date2 = today.toISOString().split("T")[0];
                fetchTransactionData(date1, date2, navigate, partnerClientId);
                break;
            case "past_1_month" :
                const oneMonthAgo = new Date(today);
                oneMonthAgo.setDate(today.getDate() - 30);
                setFromDate(oneMonthAgo.toISOString().split("T")[0]);
                setToDate(today.toISOString().split("T")[0]);
                date1 = oneMonthAgo.toISOString().split("T")[0];
                date2 = today.toISOString().split("T")[0];
                fetchTransactionData(date1, date2, navigate, partnerClientId);
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
                fetchTransactionData(date1, date2, navigate, partnerClientId);
                break;
            default:
                return;
        }
    }

    return (
        <Box m="20px">
            <Header title="Approve Settlement"/>

            <Box m="20px">
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1" style={{fontSize: "16px"}}>
                            From:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            style={{fontSize: "16px"}}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" style={{fontSize: "16px"}}>
                            To:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            style={{fontSize: "16px"}}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleFetchData}
                            sx={{bgcolor: colors.blueAccent[700], fontSize: "16px", color: colors.grey[100]}}>
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
                            sx={{ml: 2, color: "#fff"}}
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
                            sx={{ml: 2, color: "#fff"}}
                        >
                            <MenuItem value="None">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    Select Merchant
                                </Typography>
                            </MenuItem>
                            {partnerData.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                        {item.remarks}
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
                    sx={{ml: 2, color: "#fff"}}
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
                    sx={{ml: 2, flex: 1}}
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                />
                <IconButton type="button" sx={{p: 1}} onClick={handleSearch}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            <Box
                m="30px 0 0 0"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Space between buttons
                    width: '100%', // Full width container
                }}
            >

                {!proceedResult ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpenProceed}
                            sx={{
                                bgcolor: colors.blueAccent[700],
                                fontWeight: 'bold',
                                fontSize: "16px",
                                color: colors.grey[100]
                            }}
                        >
                            Proceed
                        </Button>
                        <Dialog
                            open={openProceed}
                            onClose={handleCloseProceed}
                        >
                            <DialogTitle>Confirm Proceed</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to proceed with these payments?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseProceed} color="primary">
                                    No
                                </Button>
                                <Button onClick={handleConfirmProceed} color="primary" autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpenCancel}
                            sx={{
                                bgcolor: colors.blueAccent[700],
                                fontWeight: 'bold',
                                fontSize: "16px",
                                color: colors.grey[100]
                            }}
                        >
                            Cancel
                        </Button>
                        <Dialog
                            open={openCancel}
                            onClose={handleCloseCancel}
                        >
                            <DialogTitle>Confirm Cancellation</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to cancel these payments?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseCancel} color="primary">
                                    No
                                </Button>
                                <Button onClick={handleConfirmCancel} color="primary" autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    <div>
                        <Typography variant="h3">
                            Final Amount: {proceedResult.finalAmount.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                        })}
                        </Typography>
                        <Typography variant="h3">
                            Bank Account Number: {proceedResult.bankAccountNumber}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBack}
                            sx={{
                                bgcolor: colors.blueAccent[700],
                                marginTop: '20px',
                                marginBottom: '20px',
                                fontWeight: 'bold',
                                fontSize: "16px",
                                color: colors.grey[100]
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={sendApproveProceedSettlementData}
                            sx={{
                                bgcolor: colors.blueAccent[700],
                                marginTop: '20px',
                                marginBottom: '20px',
                                fontWeight: 'bold',
                                fontSize: "16px",
                                color: colors.grey[100],
                                marginLeft: '10px'
                            }}
                        >
                            Settle
                        </Button>
                    </div>
                )}
            </Box>
            <Box
                m="5px 0 0 0"
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
                    rows={transactionData}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        BaseCheckbox: CustomCheckbox,
                    }}
                    selectionModel={selectedIds}
                />
            </Box>
        </Box>
    );
};

function CustomCheckbox(props) {
    return <CheckBox {...props} checked={true} disabled/>;
}

export default ApproveSettlement;
