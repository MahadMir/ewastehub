import './App.css';
import { BrowserRouter, Route, Routes, useParams, redirect} from 'react-router-dom';
import Login from "./screens/login/login";
import Registration from "./screens/registration/registration";
import LandingPage from "./screens/landingpage/landingpage";
import {CustomerDashboard} from "./screens/customer-portal/customerdashboard/customerDashboard";
import PlaceOrder from "./screens/customer-portal/addorder/placeorder";
import ProfilePage from "./screens/profile/profile";
import EditOrder from "./screens/customer-portal/editorder/editorder";
import AdminStaffPage from "./screens/adminstaffpage/adminstaffpage";
import AdminOrderPage from "./screens/adminorderpage/adminorderpage";
import Sdashboard from "./screens/staffdashboard/StaffDashboard/sdashboard";
import AdminDashboard from './screens/admindashboard/admindashboard';
import AdminUsers from './screens/adminuserspage/adminusers';
import StaffInfo from "./screens/staffdashboard/StaffInfoPage/staffinfo";
import UserInfo from "./screens/staffdashboard/UserInfoPage/userinfo";
import ManageDevice from "./screens/staffdashboard/DeviceManagement/managedevice";
import AddStaff from "./screens/staffdashboard/StaffInfoPage/AddStaff/addstaff";
import AddUser from "./screens/staffdashboard/UserInfoPage/AddUser/adduser";
import {Orders} from "./screens/Order/orders";
import AdminDashboardDrawer from './screens/admindashboard/admindashboarddrawer';
import AdminStaffDrawer from './screens/adminstaffpage/adminstaffdrawer';
import AdminOrderDrawer from './screens/adminorderpage/adminorderdrawer';
import AdminUsersDrawer from './screens/adminuserspage/adminusersdrawer';
import FAQComponent from "./screens/landingpage/faq";
import OrderSuccess from './components/stripeordersuccess';
import GoogleLoginSuccess from './components/googleloginsuccess';
import {FcManager} from "react-icons/fc";
import ManagePayment from "./screens/staffdashboard/PaymentManagement/managePayment";
import ManageQR from "./screens/staffdashboard/QRCode/manageQr";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/ordersuccess/:orderId/" Component={OrderSuccess}/>
                    <Route path="/googlesuccess/:orderId/" Component={GoogleLoginSuccess}/>
                    <Route path="/sdashboard" element={<Sdashboard/>} />
                    <Route path="/sdashboard/staffinfo" element={<StaffInfo />} />
                    <Route path="/sdashboard/userinfo" element={<UserInfo/>} />
                    <Route path="/staff/addstaff" element={<AddStaff/>} />
                    <Route path="/user/adduser" element={<AddUser/>} />
                    <Route path="/sdashboard/managedevice" element={<ManageDevice/>} />
                    <Route path="/sdashboard/payment" element={<ManagePayment/>} />
                    <Route path="/sdashboard/qrcode" element={<ManageQR/>} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/customer/customerdashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/profile" element={<ProfilePage />} />
                    <Route path="/customer/placeorder" element={<PlaceOrder/>} />
                    <Route path="/customer/editorder" element={<EditOrder/>} />
                    <Route path="/admin/staff" element={<AdminStaffDrawer/>} />
                    <Route path="/admin/orders" element={<AdminOrderDrawer/>} />
                    <Route path="/admin/dashboard" element={<AdminDashboardDrawer />} />
                    <Route path="/admin/users" element={<AdminUsersDrawer />} />
                    <Route path="customer/orders" element={<Orders/>}/>
                    <Route path="/faq" element={<FAQComponent/>}/>

                </Routes>
            </div>
        </BrowserRouter>
    );


}


export default App;