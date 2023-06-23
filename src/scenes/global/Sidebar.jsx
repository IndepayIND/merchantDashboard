import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AppsIcon from '@mui/icons-material/Apps';
import logo from '../../components/logo512.png';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Box
      sx={{
          height : "110vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                  <img
                      src={logo}
                      alt="Point of Sale"
                      style={{ width: "20px", height: "20px" }} // Adjust the width and height as needed
                  />
                  <Typography variant="h3" color={colors.grey[100]}>
                  Tara|Indepay
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Sirclo
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Merchant Dashboard
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

              <SubMenu
                  title="Transactions"
                  icon={<PaymentsIcon />}
                  selected={selected}
              >
                  <Item
                      title="All"
                      icon={<AppsIcon />}
                      to="/transactions"
                      selected={selected}
                      setSelected={setSelected}
                  />

                  <Item
                      title="Credit Card"
                      icon={<CreditCardIcon />}
                      to="/transactions/credit-card"
                      selected={selected}
                      setSelected={setSelected}
                  />
                  <Item
                      title="Virtual Account"
                      to="/transactions/virtual-account"
                      icon={<AccountBalanceWalletIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                  />
                  <Item
                      title="E Wallet"
                      to="/transactions/e-wallet"
                      icon={<WalletIcon />}
                      selected={selected}
                      setSelected={setSelected}
                  />
                  <Item
                      title="QRIS"
                      to="/transactions/qris"
                      icon={<QrCode2Icon />}
                      selected={selected}
                      setSelected={setSelected}
                  />
                  <Item
                      title="Direct Debit"
                      to="/transactions/direct-debit"
                      icon={<AccountBalanceIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                  />
                  <Item
                      title="Net Banking"
                      to="/transactions/netbanking"
                      icon={<LanguageIcon/>}
                      selected={selected}
                      setSelected={setSelected}
                  />
              </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
