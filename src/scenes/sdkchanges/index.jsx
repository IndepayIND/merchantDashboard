import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {fetchPartnerDetailsAPI, updatePartnerDetailsAPI} from "../../data/api";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const SDKChanges = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [partnerDetails, setPartnerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    callback: ""
  });
  const [callback, setCallbackValue] = useState(partnerDetails.callback);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchPartnerDetails = async (navigate) => {
    try {
      return await fetchPartnerDetailsAPI(navigate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    validateField(name, event.target.value);
  };

  const validateField = (fieldName, value) => {
    let fieldError = "";

    if (fieldName === "callback") {
      if (!value) {
        fieldError = "Callback URL is required";
      } else if (!/^https:\/\/\S+$/.test(value)) {
        fieldError = "Invalid HTTPS URL";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: fieldError }));
  };

  useEffect(() => {
    fetchPartnerDetails().then((r) => {
      if (r) {
        setPartnerDetails({
          firstName: r.name || "",
          lastName: r.lastName || "",
          email: r.email || "",
          contact: r.mobileNumber || "",
          callback: r.callbackUrl || "",
        });
        setCallbackValue(r.callbackUrl || "");
      }
    });
  }, []);

  const handleFormSubmit = (values) => {
    updatePartnerDetailsAPI(callback, navigate);
  };

  return (
      <Box m="20px">
        <Header title="Profile" subtitle="Settings" />

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={partnerDetails}
        >
          {({
              touched,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="First Name"
                      value={partnerDetails.firstName}
                      disabled={true}
                      name="firstName"
                      sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Last Name"
                      value={partnerDetails.lastName}
                      name="lastName"
                      disabled={true}
                      sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      value={partnerDetails.email}
                      name="email"
                      disabled={true}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Contact Number"
                      value={partnerDetails.contact}
                      name="contact"
                      disabled={true}
                      sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Callback URL"
                      onBlur={handleBlur}
                      onChange={(event) => setCallbackValue(event.target.value)}
                      value={callback}
                      name="callback"
                      error={!!touched.callback && !!errors.callback}
                      helperText={touched.callback ? errors.callback : ""}
                      sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Save
                  </Button>
                </Box>
              </form>
          )}
        </Formik>
      </Box>
  );
};


export default SDKChanges;
