import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import App from "./App";
  import Home from "./pages/Home";
  import EmpLogin from "./pages/EmpLogin";
  import PatLogin from "./pages/PatLogin";
  import EmpHome from "./pages/EmpHome";
  import PatSignUp from "./pages/PatSignUp";
  import EmpSignUp from "./pages/EmpSignUp";
  import NewApp from "./pages/NewApp";
  import { PatientLoader, EmployeeLoader, NewPatientLoader } from "./loaders";
  import { createPatient, updatePatient, deletePatient, addAppointment, updateAppointment, deleteAppointment } from "./actions";
import UpdateApp from "./pages/UpdApp";
  
  const router = createBrowserRouter(
    createRoutesFromElements
    (<Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/EmpLog" element={<EmpLogin />} />
        <Route path="/PatLog" element={<PatLogin />} />
        <Route path="/EmpHome" element={<EmpHome />} />
        <Route path="/PatSignUp" element={<PatSignUp />}/>
        <Route path="/EmpSignUp" element={<EmpSignUp />}/>
        <Route path="/NewApp" element={<NewApp />}/>
        <Route path="/UpdApp/:appointmentId" element={<UpdateApp />}/>
      
      </Route>
    )
  );
  
  export default router;