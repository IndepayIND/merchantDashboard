import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import {useEffect, useState} from "react";
import {fetchTransactionDataAPI} from "../../data/api";
import { ReactComponent as IDRIcon } from '../../components/assets/idr.svg';
import { SvgIcon } from '@mui/material';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactionData, setTransactionData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);

  const fetchTransactionData = async (navigate) => {
    try {
      let fromDate;
      let toDate;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const day = currentDate.getDate();
      fromDate = (`${year}-${month.toString().padStart(2, '0')}-01`);
      toDate = (`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      const data = await fetchTransactionDataAPI(fromDate, toDate, '', '', '', '', navigate);
      if (data) {
        setTransactionData(data.payments);
        setTotalAmount(data.totalAmount ? data.totalAmount
            .toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}) : 0);
        setTotalCount(data.successCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const CustomIcon = (props) => (
      <SvgIcon {...props}>
        <IDRIcon style={{ color: colors.greenAccent[500] }}/>
      </SvgIcon>
  );

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
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

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
          </Box>
          <Box height="500px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

      {/*  <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
        >
          <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
              <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
              >
                <Box>
                  <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
          ))}
      </Box>*/}
      </Box>
    </Box>
  );
};

export default Dashboard;
