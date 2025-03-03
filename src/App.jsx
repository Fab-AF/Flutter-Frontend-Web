import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Changed to react-router-dom
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store.js'; // Import the Redux store
import SignIn from "./pages/AuthPages/SignIn.tsx";
import SignUp from "./pages/AuthPages/SignUp.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import UserProfiles from "./pages/UserProfiles.tsx";
import Calendar from "./pages/Calendar.tsx";
import BasicTables from "./pages/Tables/BasicTables.tsx";
import FormElements from "./pages/Forms/FormElements.tsx";
import TotalClubs from "./components/custom/TotalClubs.tsx";
import TotalDoctors from "./components/custom/TotalDoctors.tsx"; // Added import for TotalDoctors
import TotalSportsPerson from "./components/custom/TotalSportsPerson.tsx"; // Added import for TotalSportsPerson
import Blank from "./pages/Blank.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import { ScrollToTop } from "./components/common/ScrollToTop.tsx";
import Home from "./pages/Dashboard/Home.tsx";


export default function App() {
  return (
    <Provider store={store}> {/* Wrap the Router with Provider */}
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/dashboard" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />


            {/* Charts */}
            <Route path="/total-clubs" element={<TotalClubs />} />
            <Route path="/total-doctors" element={<TotalDoctors />} />
            <Route
              path="/total-sports-person"
              element={<TotalSportsPerson />}
            />
          </Route>

          {/* Auth Layout */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}
