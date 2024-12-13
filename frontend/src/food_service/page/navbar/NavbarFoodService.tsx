import { CgProfile } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import CruiseShipLogo from "../../../assets/cruise_ship_logo.jpg";
import { Link, Outlet } from "react-router-dom";

import "./NavbarFoodService.css";
// import LayoutFoodService from "../layout/LayoutFoodService";

const NavbarFoodService: React.FC = () => {
  return (
    <>
    <div className="food-service-container">
      <header className="navbar">
        <div>
          <img src={CruiseShipLogo} className="cruise-ship-logo" />
        </div>
        <div className="menu">
        <Link to="/">
          <CgProfile size={35} />
        </Link>
          <Link to="/login/food-service/order-summary">
            <TiShoppingCart size={35} />
          </Link>
        </div>
      </header>
      <div className="menu-container">
        <Outlet />
      </div>
      {/* <footer className="menu-footer">

      </footer> */}
    </div>
    </>
  );
};

export default NavbarFoodService;
