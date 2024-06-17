import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
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
    const [settlementHistoryId, setSettlementHistoryId] = useState("");
    const [proceedResult, setProceedResult] = useState(null);
    const [settleResult, setSettleResult] = useState(null);
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
                setSettlementHistoryId(data.settlementHistoryId);
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
            console.log(settlementHistoryId);
            const data = await sendApproveSettlementDataAPI(selectedIds, navigate, partnerClientId, settlementHistoryId);
            if (data) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const sendApproveProceedSettlementData = async () => {
        try {
            const data = await sendApproveProceedSettlementDataAPI(selectedIds, navigate, partnerClientId, proceedResult.finalAmount, settlementHistoryId);
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

    const handleFinalSettleProceed = async () => {
        const result = await sendApproveProceedSettlementData();
        setSettleResult(result);
    };

    const handleConfirmCancel = () => {
        setOpenCancel(false);
        sendCancelSettlementData();
    };

    const handleBack = () => {
        setProceedResult(null);
        setSettleResult(null);
    };

    const sendCancelSettlementData = async () => {
        try {
            const data = await sendCancelSettlementDataAPI(selectedIds, navigate, partnerClientId, settlementHistoryId);
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
    }, []);

    useEffect(() => {
        setSelectedIds(transactionData.map((row) => row.id).join(','))
    }, [transactionData]);

    return (
        <Box m="20px">
            <Header title="Approve Settlement"/>
            <Box m="20px">
                <Grid container spacing={2}>
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
                m="30px 0 0 0"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Space between buttons
                    width: '100%', // Full width container
                }}
            >

                {!proceedResult && !settleResult ? (
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
                                <Button onClick={handleCloseProceed}
                                        sx={{color: 'white', bgcolor: colors.blueAccent[700]}}>
                                    No
                                </Button>
                                <Button onClick={handleConfirmProceed}
                                        sx={{color: 'white', bgcolor: colors.blueAccent[700]}} autoFocus>
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
                                <Button onClick={handleCloseCancel}
                                        sx={{color: 'white', bgcolor: colors.blueAccent[700]}}>
                                    No
                                </Button>
                                <Button onClick={handleConfirmCancel}
                                        sx={{color: 'white', bgcolor: colors.blueAccent[700]}} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : proceedResult && !settleResult ? (
                    <div>
                        <Typography variant="h3">
                            Final Amount: {proceedResult.finalAmount.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                        })}
                        </Typography>
                        <Typography variant="h3">
                            Bank Account Number of Merchant: {proceedResult.settlementBankDetails.accountNo}
                        </Typography>
                        <Typography variant="h3">
                            Bank Code of Merchant: {proceedResult.settlementBankDetails.bankCode}
                        </Typography>
                        <Typography variant="h3">
                            Bank Account Type of Merchant: {proceedResult.settlementBankDetails.accountType}
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
                            onClick={handleFinalSettleProceed}
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
                ) : (
                    <div>
                        <Typography variant="h3">
                            Settle Response: {settleResult.message ? settleResult.message : settleResult.status}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBack}
                            sx={{
                                bgcolor: colors.blueAccent[700],
                                fontWeight: 'bold',
                                fontSize: "16px",
                                color: colors.grey[100]
                            }}
                        >
                            Back
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
