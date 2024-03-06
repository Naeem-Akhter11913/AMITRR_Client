import './App.css';
import { Route, Routes } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/content/Dashboard';
import SignInUser from './components/UserLoginRegister/SignInUser';
import SignUpUser from './components/UserLoginRegister/SignUpUser';
import UserDashboard from './components/content/UserDashboard';
import "react-toastify/dist/ReactToastify.css";
import Admin from './components/adminLogin/Admin';
import QuestionsInput from './components/adminLogin/QuestionsInput';



function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<SignInUser />} />       
        <Route path='/register' element={<SignUpUser />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/userD' element={<UserDashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/adminQues' element={<QuestionsInput />} />
      </Routes>
    </div>
  );
}

export default App;
