import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItemOptionInterface } from "../interface/IMenuItemOption";
import { MenuInterface } from "../interface/IMenu";
import { OrderInterface } from "../interface/IOrder";
import { message } from "antd";
import { CreateOrder, GetOrder, GetOrderById, UpdateOrderById } from "../service/https/OrderAPI";
import { OrderDetailInterface } from "../interface/IOrderDetail";
import {
  CreateOrderDetail,
  DeleteOrderDetailById,
  GetOrderDetail,
  UpdateOrderDetailById,
} from "../service/https/OrderDetailAPI";
import {
  CreateOrderDetailMenuOption,
  GetOrderDetailMenuOptions,
} from "../service/https/OrderDetailMenuOption";
import { OrderDetailMenuOptionInterface } from "../interface/IOrderDetailMenuOption";

// Updated Order interface
export interface Order {
  MenuDetail: MenuInterface;
  Quantity: number;
  SelectedOptions: Record<string, MenuItemOptionInterface>;
  Amount: number; // New field for total price
}

interface OrderContextType {
  filteredOrderDetails: OrderDetailInterface[];
  filteredOrderDetailMenuOptions: OrderDetailMenuOptionInterface[];
  totalAmount: number;
  orderID: number;
  addItem: (order: Order) => void;
  removeItem: (MenuDetailID: number) => void;
  increaseQuantityItem: (OrderDetail: OrderDetailInterface,) => void;
  decreaseQuantityItem: (OrderDetail: OrderDetailInterface) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [filteredOrderDetails, setFilteredOrderDetails] = useState<OrderDetailInterface[]>([]);
  const [customerID, setCustomerID] = useState<number>();
  const [orderID, setOrderID] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [filteredOrderDetailMenuOptions, setFilteredOrderDetailMenuOptions] = useState<OrderDetailMenuOptionInterface[]>([]);

  useEffect(() => {
    if (orderID && filteredOrderDetails.length > 0) {
      updateTotalAmount(filteredOrderDetails);
    } else {
      loadData(); // โหลดข้อมูลเมื่อ Component ถูก mount หรือเมื่อ `orderID` และ `filteredOrderDetails` เปลี่ยนแปลงไปยังสถานะว่าง
    }
  }, [orderID]);
  
  

  const updateTotalAmount = async (orderDetail: OrderDetailInterface[]) => {
    if (!orderID || orderID === 0 || !customerID) {
      console.warn("OrderID or CustomerID is not set yet.");
      return; // หยุดการทำงานถ้า orderID ยังไม่ถูกตั้งค่า
    }
  
    const totalAmount = orderDetail.reduce((sum, detail) => sum + detail.Amount, 0);
  
    try {
      const updatedOrder: OrderInterface = {
        TotalAmount: totalAmount,
        OrderDate: new Date(),
        Status: "Pending",
        CustomerID: customerID,
      };
  
      const res = await UpdateOrderById(orderID, updatedOrder);
      if (res.status === 200) {
        setTotalAmount(totalAmount);
        message.success("Order total amount updated successfully.");
      } else {
        message.error("Failed to update order total amount.");
      }
    } catch (error) {
      console.error("Error updating total amount:", error);
    }
  };
  
  
  const loadData = async () => {
    const employeeDataString = localStorage.getItem("id");
  
    if (employeeDataString) {
      const employeeData = JSON.parse(employeeDataString);
      setCustomerID(employeeData);
  
      try {
        const [orderRes, orderDetailRes, menuOptionRes] = await Promise.all([
          GetOrder(),
          GetOrderDetail(),
          GetOrderDetailMenuOptions(),
        ]);
  
        if (orderRes.status === 200 && employeeData) {

          const pendingOrder = orderRes.data.find(
            (o: { ID: number; Status: string; CustomerID: number }) =>
              o.Status === "Pending" && o.CustomerID === Number(employeeData)
          );
  
          if (pendingOrder) {
            setOrderID(pendingOrder.ID);
  
            const filteredDetails = orderDetailRes.data.filter(
              (detail: OrderDetailInterface) =>
                detail.OrderID === pendingOrder.ID
            );
            setFilteredOrderDetails(filteredDetails);
  
            const filteredMenuOptions = menuOptionRes.data.filter(
              (menuOption: OrderDetailMenuOptionInterface) =>
                filteredDetails.some(
                  (detail: OrderDetailInterface) =>
                    detail.ID === menuOption.OrderDetailID
                )
            );
            setFilteredOrderDetailMenuOptions(filteredMenuOptions);
  
            // อัปเดต TotalAmount ในฐานข้อมูล
            await updateTotalAmount(filteredDetails);
            // ดึง TotalAmount ใหม่
            const orderByIdRes = await GetOrderById(pendingOrder.ID);
            if (orderByIdRes.status === 200) {
              setTotalAmount(orderByIdRes.data.TotalAmount);
            } else {
              console.error("Failed to fetch order by ID");
            }
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
  };
  
  
  const updateOrderDetail = async (existingOrderDetail: OrderDetailInterface, quantity: number) => {
    // คำนวณจำนวนใหม่
    const newQuantity = (existingOrderDetail.Quantity || 0) + quantity;
    
    // คำนวณราคาใหม่ (Price + Option Prices) * Quantity
    const relatedOptions = filteredOrderDetailMenuOptions.filter(
      (option) => option.OrderDetailID === existingOrderDetail.ID
    );
  
    const menuOptionPrices = relatedOptions.reduce(
      (total, option) => total + (option.MenuItemOption?.MenuOption?.ExtraPrice || 0),
      0
    );
  
    const newAmount = (existingOrderDetail.Menu?.Price || 0 + menuOptionPrices) * newQuantity;
  
    // สร้างอ็อบเจ็กต์ที่อัปเดตแล้ว
    const updatedOrderDetail: OrderDetailInterface = {
      ...existingOrderDetail,
      Quantity: newQuantity,
      Amount: newAmount, // อัปเดต Amount ด้วยค่าคำนวณใหม่
    };
  
    try {
      const res = await UpdateOrderDetailById(existingOrderDetail.ID!, updatedOrderDetail);
      if (res.status === 200) {
        message.success("Updated item quantity and amount successfully.");
      } else {
        message.error("Failed to update item quantity and amount.");
      }
    } catch (error) {
      console.error("Error updating order detail:", error);
    }
  };
  
  
  const createOrderDetail = async (newOrder: Order) => {
    if (!orderID) return;

    const orderDetailData: OrderDetailInterface = {
      Quantity: newOrder.Quantity,
      Amount: newOrder.Amount,
      MenuID: newOrder.MenuDetail.ID,
      OrderID: orderID,
    };
    const res = await CreateOrderDetail(orderDetailData);
    if (res.status === 201) {
      const newOrderDetailID = res.data.data.ID;
      message.success(res.data.message);
      await handleMenuOptions(newOrder, newOrderDetailID);
    } else {
      message.error(res.data.error);
    }
  };
  
  const createNewOrderDetail = async (newOrder: Order, orderid: number) => {
    const orderDetailData: OrderDetailInterface = {
      Quantity: newOrder.Quantity,
      Amount: newOrder.Amount,
      MenuID: newOrder.MenuDetail.ID,
      OrderID: orderid,
    };
    const res = await CreateOrderDetail(orderDetailData);
    if (res.status === 201) {
      const newOrderDetailID = res.data.data.ID;
      message.success(res.data.message);
      await handleMenuOptions(newOrder, newOrderDetailID);
    } else {
      message.error(res.data.error);
    }
  };
  
  const handleMenuOptions = async (newOrder: Order, newOrderDetailID: number) => {
    if (newOrder.SelectedOptions) {
      const menuOptions = Object.values(newOrder.SelectedOptions);
      const promises = menuOptions.map((option) =>
        CreateOrderDetailMenuOption({
          OrderDetailID: newOrderDetailID,
          MenuItemOptionID: option.ID,
        })
      );
      const menuOptionRes = await Promise.all(promises);
      if (menuOptionRes.every((res) => res.status === 201)) {
        message.success("Added menu options successfully.");
      } else {
        message.error("Failed to add some menu options.");
      }
    }
  };
  
  const addItem = async (newOrder: Order) => {
    const selectedOptionID = newOrder.SelectedOptions
      ? Object.values(newOrder.SelectedOptions)[0]?.ID
      : undefined;
  
    const existingOrderDetail = filteredOrderDetails.find((detail) => {
      const isMatchingMenuID = detail.MenuID === newOrder.MenuDetail.ID;
      const isMatchingOrderID = detail.OrderID === orderID;
      const isMatchingOptionID = selectedOptionID
        ? newOrder.SelectedOptions &&
          Object.values(newOrder.SelectedOptions).every((option) =>
            filteredOrderDetailMenuOptions.some(
              (existingOption) =>
                existingOption.MenuItemOptionID === option.ID &&
                existingOption.OrderDetailID === detail.ID
            )
          )
        : true;
  
      return isMatchingMenuID && isMatchingOrderID && isMatchingOptionID;
    });
  
    if (!orderID) {
      // ถ้าไม่มี orderID สำหรับ customer ให้สร้าง order ใหม่
      const newOrderData: OrderInterface = {
        OrderDate: new Date(),
        TotalAmount: 0, // ค่าเริ่มต้น
        Status: "Pending",
        CustomerID: customerID || 0,
      };
  
      const res = await CreateOrder(newOrderData);
      if (res.status === 201) {
        const createdOrderID = res.data.data.ID;
        setOrderID(createdOrderID);
        await createNewOrderDetail(newOrder, createdOrderID);
        console.log("NEW loadData add item")
        loadData();
      } else {
        message.error("Failed to create order.");
        return;
      }
    } else {
      // ถ้ามี orderID แล้ว
      if (existingOrderDetail) {
        await updateOrderDetail(existingOrderDetail, newOrder.Quantity);
      } else {
        await createOrderDetail(newOrder);
      }
    }
  
    // โหลดข้อมูลใหม่และอัปเดต TotalAmount

    await loadData();
  };
  
  
  
  const removeItem = async (orderDetailID: number) => {
    const res = await DeleteOrderDetailById(orderDetailID);
    if (res.status == 200) {
      message.success("order delete");
      await loadData();
    } else {
      message.error("Failed to add order detail to the database.");
    }
  };

  const increaseQuantityItem = async (OrderDetail: OrderDetailInterface) => {

    const newQuantity = OrderDetail.Quantity + 1;
    const newAmount = OrderDetail.Amount + (OrderDetail.Amount/ OrderDetail.Quantity);
  
    const orderDetailData: OrderDetailInterface = {
      ...OrderDetail,
      Quantity: newQuantity,
      Amount: newAmount,
    };
  
    if (OrderDetail.ID !== undefined) {
      const res = await UpdateOrderDetailById(OrderDetail.ID, orderDetailData);

      if (res.status === 200) {
        message.success("Quantity increased successfully");
        await loadData();
      } else {
        message.error("Failed to update order detail");
      }
    } else {
      console.error("OrderDetail.ID is undefined");
    }
  };
  
  const decreaseQuantityItem = async (OrderDetail: OrderDetailInterface) => {
    if (OrderDetail.Quantity > 1) {
      const newQuantity = OrderDetail.Quantity - 1;
      const newAmount = OrderDetail.Amount - (OrderDetail.Amount/ OrderDetail.Quantity);
  
      const orderDetailData: OrderDetailInterface = {
        ...OrderDetail,
        Quantity: newQuantity,
        Amount: newAmount,
      };
      if (OrderDetail.ID !== undefined) {
        const res = await UpdateOrderDetailById(OrderDetail.ID, orderDetailData);
  
        if (res.status === 200) {
          message.success("Quantity decreased successfully");
          await loadData();
        } else {
          message.error("Failed to update order detail");
        }
      } else {
        console.error("OrderDetail.ID is undefined");
      }
      
      
    } else {
      if (OrderDetail.ID !== undefined) {
        removeItem(OrderDetail.ID)
      } else {
        console.error("OrderDetail.ID is undefined");
      }
    }
  };

  return (
    <OrderContext.Provider
      value={{
        filteredOrderDetails,
        filteredOrderDetailMenuOptions,
        totalAmount,
        orderID,
        addItem,
        removeItem,
        increaseQuantityItem,
        decreaseQuantityItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
