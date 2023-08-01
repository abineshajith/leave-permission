import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store.js';
import { Provider } from 'react-redux';
import {createBrowserRouter,
        createRoutesFromElements,
        Route,
        RouterProvider} from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import PrivateRoute from './Components/PrivateRoute.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import HomeScreen from './Screen/HomeScreen.jsx';
import LoginScreen from './Screen/LoginScreen.jsx';
import RegisterScreen from './Screen/RegisterScreen.jsx';
import ProfileScreen from './Screen/ProfileScreen.jsx';
import Leavepermission from './Screen/Leavepermission.jsx';
import Leavestatus from './Screen/Leaveststus.jsx';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<HomeScreen/>}/>
    <Route path='/Login' element={<LoginScreen />} />
    <Route path='/register' element={<RegisterScreen />} />
    {/* {private routes} */}
    <Route path='' element={<PrivateRoute/>}>
    <Route path='/profile' element={<ProfileScreen />} />
    <Route path='/leavepermission' element={<Leavepermission />} />
    <Route path='/leavestatus' element={<Leavestatus />} />
    </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
)
