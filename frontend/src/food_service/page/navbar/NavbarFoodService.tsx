import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { LuShoppingCart } from "react-icons/lu";
import CruiseShipLogo from "../../../assets/cruise_ship_logo.jpg";
import { Link, Outlet } from "react-router-dom";

import { useOrder } from "../../context/OrderContext";
import { CustomerInterface } from "../../../interfaces/ICustomer";
import { GetUsersById } from "../../../services/https";
import { Button, message, Tooltip } from "antd";
import "./NavbarFoodService.css";
import UnauthorizedAccess from "../unauthorized_access/UnauthorizedAccess";

const NavbarFoodService: React.FC = () => {
  const { filteredOrderDetails, tripPayment, searchInput, setSearchInput } = useOrder();
  const [user, setUser] = useState<CustomerInterface>();
  const [isLogin, setIsLogin] = useState<string>();
  const [messageApi, contextHolder] = message.useMessage();
  
  const handleChange = (value: string) => {
    setSearchInput(value);
  };

  const getUser = async (id: number) => {
    const res = await GetUsersById(id);
    if (res.status === 200) {
      setUser(res.data);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };
  
  useEffect(() => {
    const savedData = localStorage.getItem("id");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      getUser(parsedData);
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("isLogin");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setIsLogin(parsedData);
    }
  }, [tripPayment]);

  if (!tripPayment || isLogin == "false") {
    return <UnauthorizedAccess />;
  }
  
  return (
    <>
    {contextHolder}
    <div className="food-service-container">
      <nav className="navbar">
        <div>
          <Link to="/food-service/login/menu/order">
            <img src={CruiseShipLogo} className="cruise-ship-logo" />
          </Link>
        </div>
        <div className="menu">
          <div className="user-container">
            <Tooltip
              className="custom-tooltip"
              title={
                <>
                  <Button
                    className="logout-button"
                    type="primary"
                    danger
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/food-service/login";
                    }}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                  >
                    Log out
                  </Button>
                </>
              }
              placement="bottom"
              overlayStyle={{ width:"10%", gap: "12px" }}
            >
              <div>
                <AiOutlineUser size={30} />
                <span>{user?.first_name} {user?.last_name}</span>
              </div>
            </Tooltip>

          </div>
          <div className="search-container">
            <LuSearch className="search-icon" size={30} />
            <input 
              // type="text" 
              placeholder="Search Menu"
              value={searchInput}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <Link to="/food-service/login/menu/order-summary">
            <div className="cart-container">
              <LuShoppingCart size={30} />
              {filteredOrderDetails.length > 0 && (
                <span>
                  {filteredOrderDetails.reduce((total, order) => total + (order.Quantity || 0), 0)}
                </span>
              )}
            </div>
          </Link>
        </div>
      </nav>
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
