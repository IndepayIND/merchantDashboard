import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Import the Navigate component
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
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Cookies from "js-cookie";
import Settings from "./scenes/setting";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      navigate("/login");
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
              {/*<Route path="/team" element={<Team />} />*/}
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/virtual-account" element={<VirtualAccount />} />
              <Route path="/transactions/e-wallet" element={<EWallet />} />
              <Route path="/transactions/qris" element={<QRIS />} />
              <Route path="/transactions/netbanking" element={<Netbanking />} />
              <Route path="/transactions/direct-debit" element={<DirectDebit />} />
              <Route path="/transactions/credit-card" element={<CreditCard />} />
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
