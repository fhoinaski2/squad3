import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Index from '../pages/Home/Index/Index';
import AdminLogin from '../pages/Admin/AdminLogin/AdminLogin';
import PrivateRoute from '../components/PrivateRoute';
import CadastrarProduto from '../pages/Admin/Products/Products';
import typeUserEnum from '../constants/enums/typeUserEnum';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import Login from "../pages/Auth/Login/Login";
import Dashbord from '../pages/Admin/Dashboard/Dashboard';
import RegisterUser from "../pages/Auth/Register/RegisterUser"
import DashBoardIndex from '../pages/Admin/DashBoardIndex/DashBoardIndex';
import Sales from '../pages/Admin/Sales/Sales';
import AllUsers from '../pages/Admin/AllUsers/AllUsers';
import TableAllProducts from '../components/Table/TableAllProducts';
import Profile from '../pages/Client/Profile/Profile';
import CreateUser from '../pages/Admin/Users/CreateUser';
import Cart from '../pages/Client/Cart/Cart';




export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/user" element={<Login />} />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/profile"
          element={
            <PrivateRoute accessControl>
              <Profile />
            </PrivateRoute>
          }/>

          <Route path="/cart" element={<Cart />}/>

        <Route path='/admin/dashboard'
          element={
            <PrivateRoute accessControl={typeUserEnum.ADMIN}>
              <Dashbord
              />
            </PrivateRoute>
          }>
          <Route path='resumo' element={<DashBoardIndex />} />
          <Route path='register/products' element={<CadastrarProduto />} />
          <Route path='sales' element={<Sales />} />
          <Route path='products' element={<TableAllProducts />} />
          <Route path='register/user' element={<CreateUser />} />
          <Route path='users' element={<AllUsers />} />

        </Route>


        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

