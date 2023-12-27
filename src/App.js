import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import Home from "./Component/Home/Home";
import { Route, Navigate, Routes } from 'react-router-dom'
import { userInputs } from './formSource'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/userSlice'
import { useEffect } from "react";
import { auth, db } from './DB/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import ForgetPassword from "./Component/Login/ForgetPassword";
import PageNotFound from './Component/PageNotFound/PageNotFound'
import LandingPage from './Component/Landing/LandingPage'
import UserProFile from "./Component/UserProFile/UserProFile";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        await getUserData(userAuth.uid)
      }
      else {
        dispatch(logout())
      }
    });
    const getUserData = async (id) => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef)
      dispatch(login({
        email: docSnap.data().email,
        name: docSnap.data().name,
        profession: docSnap.data().profession,
        img: docSnap.data().img,
        uid: id,
      }))
    }

  }, [dispatch]);

  const RequireAuth = ({ children }) => {
   return localStorage.getItem('logIn') ? children : <Navigate to="/login" />
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="/" index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="register" element={<Register inputs={userInputs} title="Registration" />} />
          <Route path="/*" element={<PageNotFound/>} />
          <Route path="/home" element={
            <RequireAuth>
              <Home />
            </RequireAuth>}
          />
          <Route path="/profile/:id" element={
            <RequireAuth>
              <UserProFile />
            </RequireAuth>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
