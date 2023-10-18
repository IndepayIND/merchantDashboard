import {Box, Button, Grid, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {fetchAllPartnerDetailsAPI, uploadMisAPI} from "../../data/api";
import {useNavigate} from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const MISUploader = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [partnerData, setpartnerData] = useState([]);
    const [partnerSelectedOption, setPartnerSelectedOption] = useState("None");
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // Check if the selected file is a CSV
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
        } else {
            alert('Please select a valid CSV file.');
        }
    };

    useEffect(() => {
        setPartnerSelectedOption("None");
        fetchAllPartnerDetails().then(r => {
            setpartnerData(r);
        })
    }, []);

    const fetchAllPartnerDetails = async (navigate) => {
        try {
            return await fetchAllPartnerDetailsAPI(navigate);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpload = async () => {
        if (file && partnerSelectedOption !== "None") {
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('file', file);
            const data = await uploadMisAPI(formData, partnerSelectedOption, navigate);
            console.log(data);
        } else {
            alert('Please select a CSV file and Partner from the Drop down before uploading.');
        }
    };

    return (
        <Box m="20px">
            <Header title= "Revenue MIS Uploader" subtitle="" />
            <Box m="20px">
                <Grid container spacing={2}>
                    {partnerData && <Grid>
                        <input type="file" accept=".csv" onChange={handleFileChange} />
                        <Select
                            value={partnerSelectedOption}
                            onChange={(e) => {
                                setPartnerSelectedOption(e.target.value)
                            }}
                            sx={{ ml: 2, color: "#fff" }}
                        >
                            <MenuItem value="None">
                                <Typography sx={{color: colors.grey[100], textAlign: 'center'}}>
                                    None
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

                        <Button
                            variant="contained"
                            onClick={handleUpload}
                            sx={{ bgcolor: colors.blueAccent[700], fontSize: "16px", color: colors.grey[100] }}>
                            Upload File
                        </Button>
                    </Grid>}
                </Grid>
            </Box>
        </Box>
    );
};

export default MISUploader;
