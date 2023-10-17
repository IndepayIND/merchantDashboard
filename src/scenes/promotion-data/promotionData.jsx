import {Box, Grid, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {fetchAllCredentialDetailsAPI} from "../../data/api";
import {useNavigate} from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

const PromotionData = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [credentialData, setCredentialData] = useState([]);
    const [partnerSelectedOption, setPartnerSelectedOption] = useState("None");
    const [partnerSelectedOptionId, setPartnerSelectedOptionId] = useState("None");
    const [formData, setFormData] = useState({
        header3: {
            en: '',
            id: '',
        },
        subHeader1: {
            en: '',
            id: '',
        },
        buttonText: {
            en: '',
            id: '',
        },
        lastScreenData: {
            headerText: {
                en: '',
                id: '',
            },
            bodyText: {
                en: '',
                id: '',
            },
            buttonText: {
                en: '',
                id: '',
            },
        },
    });

    const navigate = useNavigate();

    const fetchAllCredentialDetails = async (navigate) => {
        try {
            return await fetchAllCredentialDetailsAPI(navigate);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (field, lang, value) => {
        // Update the state with the edited value
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                [lang]: value,
            },
        }));
    };

    const handleSave = async () => {
        // Make a PUT request to update the API with formData
        // Replace 'yourApiEndpoint' with the actual API endpoint
        // const data = await fetchPromotionDataAPI(formData, navigate);
        fetch('yourApiEndpoint', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Data updated:', data);
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };
    useEffect(() => {
        fetchAllCredentialDetails().then(r => {
            setCredentialData(r);
        })
    }, []);

    async function handleCredentialSelectedOption(value) {
        if (credentialData) {
            const credentialObject = credentialData.find(item => item.id === value);
            if (credentialObject) {
                setFormData(credentialObject.clientAppData.splashScreenData);
            }
        }
    }

    const handleLastScreenDataChange = (field, lang, value) => {
        // Update the state for lastScreenData
        setFormData((prevData) => ({
            ...prevData,
            lastScreenData: {
                ...prevData.lastScreenData,
                [field]: {
                    ...prevData.lastScreenData[field],
                    [lang]: value,
                },
            },
        }));
    };

    return (
        <Box m="20px">
            <Header title="Promotion Text Details" subtitle="Promotion Text Details" />
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
            </Box>
            <Box>
                {credentialData && <Grid>
                    <Select
                        value={partnerSelectedOption}
                        onChange={(e) => {
                            setPartnerSelectedOption(e.target.value)
                            handleCredentialSelectedOption(e.target.value)
                        }}
                        sx={{ ml: 2, color: "#fff" }}
                    >
                        <MenuItem value="None">
                            <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                None
                            </Typography>
                        </MenuItem>
                        {credentialData.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                <Typography sx={{ color: colors.grey[100], textAlign: 'center' }}>
                                    {item.remarks}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>}
            </Box>
            <Box>
                <table>
                    <thead>
                    <tr>
                        <th>Field name</th>
                        <th>English</th>
                        <th>Indonesia</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(formData).map((field) => (
                        <tr key={field}>
                            <td>
                                <label>{field}</label>
                            </td>
                            <td>
                                {field === 'lastScreenData' ? (
                                    Object.keys(formData[field]).map((lastScreenField) => (
                                        <tr key={lastScreenField}>
                                            <td>
                                                <label>{lastScreenField}</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={formData[field][lastScreenField].en}
                                                    onChange={(e) =>
                                                        handleLastScreenDataChange(lastScreenField, 'en', e.target.value)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={formData[field][lastScreenField].id}
                                                    onChange={(e) =>
                                                        handleLastScreenDataChange(lastScreenField, 'id', e.target.value)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                value={formData[field].en}
                                                onChange={(e) => handleInputChange(field, 'en', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={formData[field].id}
                                                onChange={(e) => handleInputChange(field, 'id', e.target.value)}
                                            />
                                        </td>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={handleSave}>Save</button>
            </Box>

        </Box>
    );
};

export default PromotionData;
