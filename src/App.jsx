import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import SignIn from "./pages/AuthPages/SignIn.tsx";
import SignUp from "./pages/AuthPages/SignUp.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import UserProfiles from "./pages/UserProfiles.tsx";
import Calendar from "./pages/Calendar.tsx";
import BasicTables from "./pages/Tables/BasicTables.tsx";
import FormElements from "./pages/Forms/FormElements.tsx";
import TotalClubs from "./components/custom/TotalClubs.jsx";
import TotalDoctors from "./components/custom/TotalDoctors.jsx";
import TotalSportsPerson from "./components/custom/TotalSportsPerson.jsx";
import TotalProducts from "./components/custom/TotalProducts.jsx";
import TotalCategory from "./components/custom/TotalCategories.jsx";

import Blank from "./pages/Blank.tsx";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop.tsx";
import Home from "./pages/Dashboard/Home.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import cookie from "js-cookie";

const PublicRoute = ({ children }) => {
  const token = cookie.get("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/form-elements" element={<FormElements />} />
              <Route path="/basic-tables" element={<BasicTables />} />
              <Route path="/total-clubs" element={<TotalClubs />} />
              <Route path="/total-doctors" element={<TotalDoctors />} />
              <Route path="/total-sports-person" element={<TotalSportsPerson />} />
              <Route path="/total-products" element={<TotalProducts />} />
              <Route path="/total-categories" element={<TotalCategory />} />

            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}
