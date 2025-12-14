
import { Route, Routes } from 'react-router'
import Login from './pages/auth/Login'
import PrivateRoute from './routes/PrivateRoute'
import { Toaster } from 'react-hot-toast'
import NotFound from './components/main/NotFound'
import Dashboard from './pages/Dashboard'

function App() {
 

  return (
    <div className=" w-screen h-screen">

    <Routes>
        <Route path="/login" element={<Login />} />
  
<Route element={<PrivateRoute allowedRoles={["authenticated","standard","supervisor", "admin"]} />}>
       <Route path="/" element={<Dashboard />} />
       
         <Route path="*" element={<NotFound />} /> 
       </Route>
       {/* <Route element={<PrivateRoute allowedRoles={[ "admin"]} />}>
         <Route path="/forms/list" element={<FormsPages />} />
         <Route path="/forms/:id" element={<AddFormPage />} />
          <Route path="/users/list" element={<UsersPage />} />
         <Route path="/users/:id" element={<AddEditUserPage />} />
         </Route> */}
      </Routes>  
       
      <Toaster position="top-center" reverseOrder={false} />
     </div>)
  
}

export default App
