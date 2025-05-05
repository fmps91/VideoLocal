
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import React, { createContext, useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { SignupPage } from './pages/SignUp/SignUpPage';
import useAuthStore from './store/authStore';
import Navbar from "./components/navbar/navbar";
import { useNavigate } from 'react-router-dom';
import { VideoListPage } from "./pages/videoList/VideoListPage";
import { ListPage } from "./pages/ListVideo/ListPage";
import { VideoPage } from "./pages/videoPlayer/VideoPage";
import FileUpload from "./pages/FileUpload/FileUpload";

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';




function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { login, loading, user, data, error } = useAuthStore();
  //const { list, loading,error } = videoStore();

  //const ctx = useContext(MyContext);

  //const { valor,setValor } = ctx;

  const navigate = useNavigate();

  const handleSearch = async (name) => {
    try {

      navigate('/home/' + name)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <AuthProvider>
      <Navbar onSearch={handleSearch}  />
      
        <Routes>

          <Route path='/' element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
           }/>

          <Route path='/file' element={
            <PrivateRoute>
              <FileUpload/>
            </PrivateRoute>
          }/>

          <Route path='/login' element={<LoginPage /> } />
          <Route path='/signup' element={<SignupPage /> } />
          
          <Route path='/home/:name' element={
          <PrivateRoute>
            <VideoListPage />
          </PrivateRoute>
          } />

          <Route path='/video/:id' element={
            <PrivateRoute>
              <VideoPage/>
            </PrivateRoute>
          } />


          <Route path='/videos/:id' element={
            <PrivateRoute>
              <ListPage/>
            </PrivateRoute>
          } />

          {/* <Route path='/notifications' element={authUser ? <NotificationPage/> : <Navigate to="/login"/>} />
   <Route path='/profile/:username' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} /> */}
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
