import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./screens/login/login";
import Registration from "./screens/registration/registration";
import LandingPage from "./screens/landingpage/landingpage";
import {CustomerDashboard} from "./screens/customer-portal/customerdashboard/customerDashboard";
import PlaceOrder from "./screens/customer-portal/addorder/placeorder";
import ProfilePage from "./screens/profile/profile";
import EditOrder from "./screens/customer-portal/editorder/editorder";
import AdminStaffPage from "./screens/adminstaffpage/adminstaffpage";
import AdminOrderPage from "./screens/adminorderpage/adminorderpage";
import Sdashboard from "./screens/staffdashboard/sdashboard";
import AdminDashboard from './screens/admindashboard/admindashboard';
import AdminUsers from './screens/adminuserspage/adminusers';
import StaffInfo from "./screens/staffdashboard/staffinfo";
import UserInfo from "./screens/staffdashboard/userinfo";
import AddStaff from "./screens/staffdashboard/addstaff";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/sdashboard" element={<Sdashboard/>} />
                    <Route path="/sdashboard/staffinfo" element={<StaffInfo />} />
                    <Route path="/sdashboard/userinfo" element={<UserInfo/>} />
                    <Route path="/staff/addstaff" element={<AddStaff/>} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/customer/customerdashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/profile" element={<ProfilePage />} />
                    <Route path="/customer/placeorder" element={<PlaceOrder/>} />
                    <Route path="/customer/editorder" element={<EditOrder/>} />
                    <Route path="/staffadmin" element={<AdminStaffPage/>} />
                    <Route path="/orderadmin" element={<AdminOrderPage/>} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;