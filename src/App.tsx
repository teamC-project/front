

import "./App.css";
import { Route, Routes } from "react-router";
import { AUTH_PATH, CUSTOMER_BOARD_PATH, MAIN_ON_PATH, SERVICE_PATH } from "./constant";
import ServiceContainer from "./layouts/ServiceContainer";
import Authentication from "./views/Authentication";
import Main from "./views/Main";
import Customer from "./views/Service/customer";

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
      <Route path={CUSTOMER_BOARD_PATH} element={<Customer />} />
      <Route path={MAIN_ON_PATH} element={<Main />} />
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
