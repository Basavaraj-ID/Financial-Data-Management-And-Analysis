import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/appLayout/Layout";
import Transactions from "./pages/Transactions";
import Message from "./pages/Message";
import Setting from "./pages/Setting";
import Analytics from "./pages/Analytics";
import Personal from "./pages/Personal";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={ <Layout />}>
            <Route path="/" element={<Navigate to='/dashboard' replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/message" element={<Message />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
