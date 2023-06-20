import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Import the Navigate component
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
import Transactions from "./scenes/transactions";
import Login from "./scenes/login";
import Logout from "./scenes/logout";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
import Cookies from "js-cookie";

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
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              {/*<Route path="/invoices" element={<Invoices />} />*/}
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
