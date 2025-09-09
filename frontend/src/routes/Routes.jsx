// Importing new components
// import Black from "../pages/Black";
// import BlueGrey from "../pages/BlueGrey";
// import GraphiteGrey from "../pages/GraphiteGrey";
// import Pebble from "../pages/Pebble";
// import SilverGrey from "../pages/SilverGrey";
// import StoneGrey from "../pages/StoneGrey";
// import Sp144 from "../pages/Sp144";
import Home from "../pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import SharePage from "../pages/SharePage";
import Van from "../pages/Van";
import RegistrationForm from "../components/auth/RegistrationForm"
import LoginPage from "../components/auth/LoginPage"
import ProfilePage from "../components/profile-page/ProfilePage"
import AccountPage from '../pages/AccountPage';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/protected-route/ProtectedRoute';
import GoogleCallback from "../components/google-auth/GoogleCallback"
import VanLayout from "../pages/Layout"
// import ModelDataForm from "../pages/modelDataForm";
import AddData from "../components/add-data/AddData";

const AppRoutes = () => {


  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layout" element={<VanLayout />} />
            <Route path="/van" element={<Van />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/add-data" element={<AddData />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rendering-library"
              element={
                <AccountPage />
              }
            />
            <Route path="/google-callback" component={GoogleCallback} />
            <Route path="/share" element={<SharePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
