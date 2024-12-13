
// import { useOrder } from "../../context/OrderContext";
// import OrderList from "../order_list/OrderList";
// import MenuList from "../menu_list/MenuList";
import MenuCategory from "../menu_category/MenuCategory";
import MenuContent from "../content/MenuContent";
import Header from "../header/Header";
import { useState } from "react";
import "./Menu.css";

const Menu: React.FC = () => {
  const [selectFoodCategory, setSelectFoodCategory] = useState<string>("All")
  // const { selectMenuList } = useOrder(); // Access Context
  // console.log("selectMenuList", selectMenuList);

  return (
    <>
        <Header />
        <MenuCategory selectFoodCategory={selectFoodCategory} setSelectFoodCategory={setSelectFoodCategory}/>
        <MenuContent selectFoodCategory={selectFoodCategory}/>
    </>
  );
};

export default Menu;
