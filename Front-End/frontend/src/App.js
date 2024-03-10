import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Login from "./screens/login/login";
import Registration from "./screens/registration/registration";
import LandingPage from "./screens/landingpage/landingpage";
import AdminStaffPage from './screens/adminstaffpage/adminstaffpage';
import AdminOrderPage from './screens/adminorderpage/adminorderpage';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/staffadmin" element={<AdminStaffPage />} />
                    <Route path="/orderadmin" element={<AdminOrderPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;