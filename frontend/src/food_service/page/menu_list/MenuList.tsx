import { useEffect, useState } from "react";
import { MenuInterface } from "../../interface/IMenu";
import { GetMenu } from "../../service/https/MenuAPI";
import { message } from "antd";
// import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MenuList.css";

interface MenuListProps {
  selectFoodCategory: string;
}


export default function MenuList({ selectFoodCategory }: MenuListProps) {
  const [menu, setMenu] = useState<MenuInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getMenus = async () => {
    const res = await GetMenu();
    if (res.status === 200) {
      setMenu(res.data);
    } else {
      setMenu([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
    <div className="menu-list-container" id='menu-list-container'>
        {contextHolder}
        {menu.length > 0 ? (
          menu
            .filter(
              (item) =>
                selectFoodCategory === "All" ||
                selectFoodCategory === item.FoodCategory?.Name
            )
            .map((item) => (
              <Link
                key={item.ID} // Ensure key is unique
                to="/login/food-service/menu-detail"
                state={{ menuDetailSelect: item }}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "auto",
                  height: "100%",
                }}
              >
                <div className="menu-item">
                  <img
                    src={item.ImageMenu}
                    alt={item.MenuName}
                    className="menu-item-image"
                  />
                  <div className="menu-item-info">
                    <div className="info">
                      <header>
                        <h1 className="menu-name">{item.MenuName}</h1>
                        <h1 className="menu-price">฿ {formatPrice(item.Price)}</h1>
                      </header>
                      {/* <p>{item.Description}</p> */}
                    </div>
                  </div>
                </div>

                <div className="menu-item-footer">
                  <div className="select-order">select</div>
                </div>
              </Link>
            ))
        ) : (
          <p className="no-menu">No menu items available.</p>
        )}
    </div>
    </>
  );
}
