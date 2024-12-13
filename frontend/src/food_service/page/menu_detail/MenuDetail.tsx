import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GetMenuItemOptions } from "../../service/https/MenuItemOption";
import { message } from "antd";
// import { Order, useOrder } from "../../context/OrderContext";
import { MenuItemOptionInterface } from "../../interface/IMenuItemOption";
import { IoChevronBackSharp } from "react-icons/io5";
import "./index.css";
import { Order, useOrder } from "../../context/OrderContext";

const MenuDetail: React.FC = () => {
  const { addItem } = useOrder();
  const location = useLocation();
  const { menuDetailSelect } = location.state || {};

  const [quantity, setQuantity] = useState<number>(1);
  const [menuItemOptions, setMenuItemOptions] = useState<MenuItemOptionInterface[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, MenuItemOptionInterface>>({});
  const [messageApi] = message.useMessage();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const getMenuItemOption = async () => {
    const res = await GetMenuItemOptions();
    if (res.status === 200) {
      setMenuItemOptions(res.data);
    } else {
      setMenuItemOptions([]);
      setError(res.data.error);
    }
  };

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "error",
        content: error,
      });
    }
  }, [error, messageApi]);

  useEffect(() => {
    if (success) {
      messageApi.open({
        type: "success",
        content: "Order has been added successfully!",
      });
    }
  }, [success, messageApi]);

  const filteredOptions = menuItemOptions.filter(
    (option) => option.MenuID === menuDetailSelect?.ID
  );

  const groupedOptions = filteredOptions.reduce((acc, item) => {
    const optionName = item.MenuOption?.OptionName;
    if (optionName) {
      if (!acc[optionName]) acc[optionName] = [];
      acc[optionName].push(item);
    }
    return acc;
  }, {} as Record<string, MenuItemOptionInterface[]>);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    setQuantity((prevQuantity) =>
      action === "increase" ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1)
    );
  };

  const handleOptionChange = (optionName: string, option: MenuItemOptionInterface) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: option,
    }));
  };

  const handleAddOrder = () => {
    if (!menuDetailSelect || quantity < 1) {
      setError("Please select a valid quantity before adding to the order.");
      return;
    }

    // Check if all option groups have selected options
    for (const optionName in groupedOptions) {
      if (!selectedOptions[optionName]) {
        setError(`Please select an option for ${optionName}.`);
        return;
      }
    }

    // Calculate Amount by adding the price of selected options
    let amount = menuDetailSelect.Price || 0;
    Object.values(selectedOptions).forEach(option => {
      amount += option.MenuOption?.ExtraPrice || 0;
    });

    const orderData: Order = {
      MenuDetail: menuDetailSelect,
      Quantity: quantity,
      SelectedOptions: selectedOptions,
      Amount: amount * quantity, // Total price for this order
    };
    console.log("selectedOptions: ",selectedOptions)
    addItem(orderData);
    setSuccess(true);
  };

  useEffect(() => {
    getMenuItemOption();
  }, []);

  // Check if all groups have selected options
  const isButtonDisabled = Object.keys(groupedOptions).some(
    (optionName) => !selectedOptions[optionName]
  );

  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  return (
    <div className="menu-detail-layout">
      <Link to={"/login/food-service/order"}>
        <IoChevronBackSharp 
          size={30}
          className="back-to-menu"
        />
      </Link>
      <section className="menu-detail-container">
        <div>

          <img src={menuDetailSelect?.ImageMenu} alt={menuDetailSelect.MenuName} />
            <div className="menu-detail-info">
              <h1>{menuDetailSelect?.MenuName}</h1>
              <hr />
              <p>{menuDetailSelect?.Description}</p>
            </div>
        </div>

        <div className="menu-detail-content-container">
          <div className="menu-detail-content">

            <div className="menu-detail-option">
              {Object.keys(groupedOptions).map((optionName) => (
                <div key={optionName} className="option-group">
                  <h2>{optionName}</h2>
                  <div className="option-group-content">
                    {groupedOptions[optionName].map((option) => (
                      <label key={option.ID} style={{width:"auto"}}>
                        <div
                          className={`menu-option ${
                            selectedOptions[optionName]?.ID === option.ID ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={optionName}
                            value={option.MenuOption?.OptionValue}
                            checked={selectedOptions[optionName]?.ID === option.ID}
                            onChange={() => handleOptionChange(optionName, option)}
                            style={{ display: "none" }}
                          />
                          <span className="option-value">
                            {option.MenuOption?.OptionValue}
                          </span>
                          <span className="option-extra-price">
                            + {option.MenuOption?.ExtraPrice} ฿
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <section>
              <div className="menu-detail-quantity-container">
                <h1>Quantity</h1>
                <div className="menu-detail-quantity-control">
                  <button
                    className="menu-detail-minus-button"
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    -
                  </button>
                  <input
                    className="menu-detail-quantity"
                    name="quantity"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="menu-detail-plus-button"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="menu-detail-footer">
                {/* <h1 className="menu-detail-price">฿ {menuDetailSelect?.Price}</h1> */}
              
                <Link to="/login/food-service/order" style={{ width: "auto" }}>
                  <button
                    className={`menu-detail-add-order-button ${isButtonDisabled ? "disabled" : ""}`}
                    onClick={handleAddOrder}
                    disabled={isButtonDisabled}
                  >
                    <span className="menu-detail-total-price">
                    Add order ฿ {formatPrice(Object.values(selectedOptions).reduce((acc, option) => acc + ((option.MenuOption?.ExtraPrice|| 0) * quantity ), 0) + (menuDetailSelect?.Price || 0) * quantity)}
                    </span>
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuDetail;
