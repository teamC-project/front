

import "./App.css";
<<<<<<< HEAD
import { Route, Routes } from "react-router";
import { AUTH_PATH, CUSTOMER_BOARD_PATH, MAIN_ON_PATH, SERVICE_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication from "./views/Authentication";
import Main from "./views/Main";
import Customer from "./views/Service/customer";
=======
import { useCookies } from "react-cookie";
import { Route, Routes, useNavigate } from "react-router";
import { AUTH_PATH, MAIN_OFF_PATH, MAIN_ON_PATH, SERVICE_PATH, SIGN_IN_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication from "./views/Authentication";
import Login from "./views/Login";
>>>>>>> dc3240f761f9ac893a84d296d8c373ebd4d6e66d

// // component: root 경로 컴포넌트 //
// function Index() {

//   //                    state                    //
//   const [cookies] = useCookies();

//   //                    function                    //
//   const navigator = useNavigate();

//   //                    effect                    //
//   useEffect(() => {
//     const accessToken = cookies.accessToken;
//     if (accessToken) navigator(MAIN_ON_PATH);
//     else navigator(MAIN_OFF_PATH);
//   }, []);

//   //                    render                    //
//   return <></>;
// }

function App() {
  return (
    <Routes >
<<<<<<< HEAD
      <Route path={CUSTOMER_BOARD_PATH} element={<Customer />} />
      <Route path={MAIN_ON_PATH} element={<Main />} />
=======
      <Route path={SIGN_IN_PATH} element={<Login />} />
>>>>>>> dc3240f761f9ac893a84d296d8c373ebd4d6e66d
      {/* <Route index element={<Index />} /> */}
      <Route path={AUTH_PATH} element={<Authentication />} />
      <Route path={SERVICE_PATH} element={<ServiceContainer />} >
        
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/* <Route path={AUTH_PATH} element={<Authentication />} /> */}
      {/*  */}
      {/*  */}

      </Route>
    </Routes>
  );
}

export default App;