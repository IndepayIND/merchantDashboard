import {useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"; // Import the Navigate component
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Transactions from "./scenes/transactions";
import VirtualAccount from "./scenes/transactions/virtualAccount";
import EWallet from "./scenes/transactions/ewallet";
import QRIS from "./scenes/transactions/qris";
import Netbanking from "./scenes/transactions/netbanking";
import DirectDebit from "./scenes/transactions/directDebit";
import CreditCard from "./scenes/transactions/creditcard";
import Login from "./scenes/login";
import Logout from "./scenes/logout";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import Cookies from "js-cookie";
import Settings from "./scenes/setting";
import BankAccountSettlement from "./scenes/settlement/bankAccount";
import KYCDetails from "./scenes/kyc";
import PromotionDetails from "./scenes/promotion";
import StoreDetails from "./scenes/store";
import RevenueSharingReport from "./scenes/revenue-sharing";
import PromotionData from "./scenes/promotion-data/promotionData";
import MISUploaderRoute from "./scenes/mis-uploader";
import CreditCardSettlement from "./scenes/settlement/creditCard";
import SDKChanges from "./scenes/sdkchanges";
import {fetchPartnerDetailsAPI} from "./data/api";
import {containsSubstring, RouteEnum} from "./routeEnum";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const [dashboardRoute, setDashboardRoute] = useState([]);

  const fetchPartnerDetails = async (navigate) => {
    try {
      return await fetchPartnerDetailsAPI(navigate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      fetchPartnerDetails().then(r => {
        if (r && r.name) {
          setDashboardRoute(r.dashboardRoutes);
        }
      })
    }
  }, [navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {Cookies.get("accessToken") ? <Sidebar /> : null} {/* Conditionally render the Sidebar component */}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {containsSubstring(dashboardRoute, RouteEnum.transactionRoute) && (
                  <>
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/transactions/virtual-account" element={<VirtualAccount />} />
                    <Route path="/transactions/e-wallet" element={<EWallet />} />
                    <Route path="/transactions/qris" element={<QRIS />} />
                    <Route path="/transactions/netbanking" element={<Netbanking />} />
                    <Route path="/transactions/direct-debit" element={<DirectDebit />} />
                    <Route path="/transactions/credit-card" element={<CreditCard />} />
                  </>
              )}

              {containsSubstring(dashboardRoute, RouteEnum.settelementRoute) && (
                  <>
                    <Route path="/settlement/bank-account" element={<BankAccountSettlement />} />
                    <Route path="/settlement/credit-card" element={<CreditCardSettlement />} />
                  </>
              )}

              {containsSubstring(dashboardRoute, RouteEnum.kycRoute) && (
                  <Route path="/kyc-details" element={<KYCDetails />} />
              )}

              {containsSubstring(dashboardRoute, RouteEnum.promotionRoute) && (
                  <Route path="/promotion-details" element={<PromotionDetails />} />
              )}

              {containsSubstring(dashboardRoute, RouteEnum.storeRoute) && (
                  <Route path="/store-details" element={<StoreDetails />} />
              )}

              {containsSubstring(dashboardRoute, RouteEnum.revenueReport) && (
                  <Route path="/revenue-sharing-report" element={<RevenueSharingReport />} />
              )}

              {containsSubstring(dashboardRoute, RouteEnum.promoDataRoute) && (
                  <Route path="/promotion-data" element={<PromotionData />} />
              )}

              {containsSubstring(dashboardRoute, RouteEnum.mistUploaderRoute) && (
                  <Route path="/mis-uploader" element={<MISUploaderRoute />} />
              )}
              <Route path="/sdk-changes" element={<SDKChanges />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              {/*<Route path="/form" element={<Form />} />*/}
              {/*<Route path="/bar" element={<Bar />} />*/}
              {/*<Route path="/pie" element={<Pie />} />*/}
              {/*<Route path="/line" element={<Line />} />*/}
              {/*<Route path="/faq" element={<FAQ />} />*/}
              {/*<Route path="/calendar" element={<Calendar />} />*/}
              {/*<Route path="/geography" element={<Geography />} />*/}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
