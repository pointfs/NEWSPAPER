import { Outlet } from "react-router-dom";
// import NavBar from './navBar/NavBar';
import Footer from './footer/Footer';


const LayoutPublic = () => {
  return (
    <div>
        {/* <NavBar/> */}
        {/* <main> */}
        <Outlet/>
        {/* </main> */}
    </div>
    
  )
}

export default LayoutPublic