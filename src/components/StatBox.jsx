import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" >
        <Box>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100], textAlign: 'center' }}
            >
                {icon}
            </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100], textAlign: 'center' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mt="2px">
      <Typography variant="h5" sx={{ color: colors.greenAccent[500], textAlign: 'center' }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
