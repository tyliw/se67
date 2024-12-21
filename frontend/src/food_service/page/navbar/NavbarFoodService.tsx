import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import CruiseShipLogo from "../../../assets/cruise_ship_logo.jpg";
import { Link, Outlet } from "react-router-dom";

import "./NavbarFoodService.css";
import { useOrder } from "../../context/OrderContext";
// import LayoutFoodService from "../layout/LayoutFoodService";

const NavbarFoodService: React.FC = () => {
  const {filteredOrderDetails} = useOrder();

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
            <div className="cart-container">
              <LuShoppingCart size={35} />
              {filteredOrderDetails.length > 0 && <span>{filteredOrderDetails.length}</span>}
            </div>
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
