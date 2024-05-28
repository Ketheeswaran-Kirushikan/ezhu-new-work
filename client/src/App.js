import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landingpage from "./pages/home/landingpage";
import Header from "./pages/home/homeComponents/Header/Header";
import Career from "./pages/home/homeComponents/career/Career";
import About from "./pages/home/homeComponents/about/About";
import Contact from "./pages/home/homeComponents/contact/Contact";
import Login from "./pages/loginpage/loginpage";
import Signup from "./pages/signup page/skillWorkerSignup/signup";
import Investor from "./pages/signup page/investorSignup/inverstor";
import ScreenPop from "./pages/signup page/screenPop/screenpop";
import Dashboard from "./pages/admin.pages/admin-dashboard/dashboard";
import SkilledWorkerDashboard from "./pages/admin.pages/admin-skilledworker/skilledmanagment";
import InvestorManagement from "./pages/admin.pages/admin-investors/investormanagment";
import SkillWorkerProfile from "./pages/userProfile/skillworkerprofile";
import CardForm from "./components/Payment/CardForm";
import ProfileEdit from "./components/profilePage/profileEdit/ProfileEdit";
import ProfileView from "./components/profilePage/profileEdit/ProfileView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/career" element={<Career />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skillworker" element={<Signup />} />
        <Route path="/investor" element={<Investor />} />
        <Route path="/screenpop" element={<ScreenPop />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/skilledworkermanagement"
          element={<SkilledWorkerDashboard />}
        />
        <Route path="/investormanagement" element={<InvestorManagement />} />
        <Route path="/skillworkerprofile" element={<SkillWorkerProfile />} />
        <Route path="/cardForm/:userId" element={<CardForm />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/profileview" element={<ProfileView />} />
      </Routes>
    </Router>
  );
}

export default App;
