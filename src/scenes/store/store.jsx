import {Box, Button, Grid, IconButton, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {fetchPromotionDataAPI, fetchStoreDataAPI} from "../../data/api";
import { useNavigate } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export const columns = [
    {
        field: "id",
        headerName: "Tara_Store_ID",
        minWidth: 300,
        flex: 1
    },
    {
        field: "name",
        headerName: "store_name",
        minWidth: 150,
        flex: 1
    },
    {
        field: "metadata",
        headerName: "metadata",
        minWidth: 150,
        flex: 1
    },
    {
        field: "storeTPReferenceId",
        headerName: "storeTPReferenceId",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "address",
        headerName: "address",
        minWidth: 150,
        flex: 1
    },
    {
        field: "latitude",
        headerName: "latitude",
        minWidth: 150,
        flex: 1
    },
    {
        field: "longitude",
        headerName: "longitude",
        minWidth: 150,
        flex: 1
    },
    {
        field: "storeRating",
        headerName: "storeRating",
        minWidth: 150,
        flex: 1
    },
    {
        field: "registration_status",
        headerName: "registration_status",
        minWidth: 200,
        flex: 1
    },
    {
        field: "status",
        headerName: "status",
        minWidth: 150,
        flex: 1
    },
    {
        field: "catalogue",
        headerName: "catalogue_name",
        minWidth: 200,
        flex: 1
    },
    {
        field: "registerStore",
        headerName: "registerStore",
        minWidth: 150,
        flex: 1
    },
    {
        field: "customerId",
        headerName: "customerId",
        minWidth: 150,
        flex: 1
    },
    {
        field: "subIndustryId",
        headerName: "subIndustryId",
        minWidth: 150,
        flex: 1
    },
    {
        field: "deliveryPartner",
        headerName: "deliveryPartner",
        minWidth: 150,
        flex: 1
    },
    {
        field: "createdDateTime",
        headerName: "createdDateTime",
        minWidth: 200,
        flex: 1
    },
    {
        field: "updatedDateTime",
        headerName: "updatedDateTime",
        minWidth: 200,
        flex: 1
    },
    {
        field: "industry",
        headerName: "industry_id",
        minWidth: 200,
        flex: 1
    },
    {
        field: "client",
        headerName: "client_name",
        minWidth: 150,
        flex: 1
    },
    {
        field: "storeImageId",
        headerName: "storeImageId",
        minWidth: 150,
        flex: 1
    },
    {
        field: "storeLogoId",
        headerName: "storeLogoId",
        minWidth: 150,
        flex: 1
    },
    {
        field: "tpLogoUrl",
        headerName: "tpLogoUrl",
        minWidth: 150,
        flex: 1
    },
    {
        field: "principalCustomerProfileId",
        headerName: "principalCustomerProfileId",
        minWidth: 200,
        flex: 1
    },
    {
        field: "ratingCount",
        headerName: "ratingCount",
        minWidth: 150,
        flex: 1
    },
    {
        field: "orderModes",
        headerName: "orderModes",
        minWidth: 150,
        flex: 1
    },
    {
        field: "uniqueName",
        headerName: "uniqueName",
        minWidth: 150,
        flex: 1
    },
    {
        field: "additionalData",
        headerName: "additionalData",
        minWidth: 150,
        flex: 1
    },
    {
        field: "storeImageUrl",
        headerName: "storeImageUrl",
        minWidth: 150,
        flex: 1
    },
    {
        field: "integration_id",
        headerName: "integration_id",
        minWidth: 150,
        flex: 1
    },
    {
        field: "storeLogoUrl",
        headerName: "storeLogoUrl",
        minWidth: 150,
        flex: 1
    },
    {
        field: "integrationId",
        headerName: "integrationId",
        minWidth: 150,
        flex: 1
    },
    {
        field: "merchantWebsiteUrl",
        headerName: "merchantWebsiteUrl",
        minWidth: 200,
        flex: 1
    },
    {
        field: "subIndustryList",
        headerName: "subIndustryList",
        minWidth: 150,
        flex: 1
    },
    {
        field: "deliverySupported",
        headerName: "deliverySupported",
        minWidth: 150,
        flex: 1
    }
];

const Store = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [storeData, setStoreData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    const fetchStoreData = async (navigate) => {
        try {
            const data = await fetchStoreDataAPI(fromDate, toDate, selectedOption, searchText, '', navigate);
            if (data && data.store) {
                const storeData = data.store.map((storeItem) => {
                    if (typeof storeItem === 'object' && 'id' in storeItem) {
                        return stringifyObjectKeys(storeItem);
                    }
                    return storeItem;
                });
                console.log(data.store);
                setStoreData(data.store);
            } else {
                setStoreData([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setSelectedOption("storeName");
        handleFetchData();
    }, []);

    const handleFetchData = () => {
        fetchStoreData(navigate);
    };

    const handleSearch = () => {
        setFromDate('');
        setToDate('');
        fetchStoreData(navigate);
        setSearchText('');
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Function to recursively stringify keys in an object
    function stringifyObjectKeys(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                if (Array.isArray(obj[key])) {
                    obj[key] = obj[key].map((item) => {
                        if (typeof item === 'object' && item !== null) {
                            return stringifyObjectKeys(item);
                        }
                        return item;
                    });
                } else {
                    obj[key] = JSON.stringify(obj[key]).replace(/\\/g, '');
                }
            } else if (typeof obj[key] !== 'string') {
                obj[key] = JSON.stringify(obj[key]).replace(/\\/g, '');
            }
        }
        return obj;
    }

    return (
        <Box m="20px">
            <Header title="Store Details" subtitle="List of Promotion" />
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
                    <MenuItem value="storeName">
                        <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                            Store Name
                        </Typography>
                    </MenuItem>
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
                    rows={storeData}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Store;
