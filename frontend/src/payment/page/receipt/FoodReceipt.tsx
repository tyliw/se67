import { useEffect, useState } from "react";
import { CustomerInterface } from "../../../interfaces/ICustomer";
import { FoodServicePaymentInterface } from "../../interface/IFoodServicePayment";
import { OrderDetailInterface } from "../../../food_service/interface/IOrderDetail";
import { GetOrderDetail } from "../../../food_service/service/https/OrderDetailAPI";
import { GetUsersById } from "../../../services/https";
import { GetFoodServicePaymentById } from "../../service/https/FoodServicePaymentAPI";
import { message } from "antd";
import "./FoodReceipt.css";
import { FaPrint } from "react-icons/fa6";
import dayjs from "dayjs";

function FoodReceipt() {
  const [foodServicePaymentID, setFoodServicePaymentID] = useState<number>();
  const [foodServicePayment, setFoodServicePayment] = useState<FoodServicePaymentInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [customer, setCustomer] = useState<CustomerInterface>()
  const [orderDetail, setOrderDetail] = useState<OrderDetailInterface[]>([]);
  // const [order, setOrder] = useState<OrderInterface[]>([]);


  const total = foodServicePayment?.Price ? foodServicePayment.Price : 0;
  const vat = total ? (total - total / 1.07) : 0;
  const subtotal = total && vat ? total - vat : 0;
  
  const formattedDate = foodServicePayment?.PaymentDate
  ? dayjs(foodServicePayment.PaymentDate).format("DD/MM/YYYY") // Adjust format as needed
  : "N/A";

  const getOrderDetail = async () => {
    const res = await GetOrderDetail();
    if (res.status === 200) {
      setOrderDetail(res.data);
    } else {
      setOrderDetail([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };


  const getFoodServicePaymentById = async () => {
    if (!foodServicePaymentID) return;
    const res = await GetFoodServicePaymentById(foodServicePaymentID);
    if (res.status === 200) {
      setFoodServicePayment(res.data);
      console.log("res.data.Order.CustomerID",res.data.Order.CustomerID)
      getCustomerByID(res.data.Order.CustomerID)
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const getCustomerByID = async (customerID: number) => {
    const res = await GetUsersById(customerID);
      if (res.status === 200) {
        setCustomer(res.data);
      } else {
        messageApi.open({
          type: "error",
          content: res?.data?.error || "Unknown error",
        });
      }
  };
  

  useEffect(() => {
    // Load foodServicePaymentID from localStorage
    const savedData = localStorage.getItem("foodServicePaymentID");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFoodServicePaymentID(parsedData);
    }

    // Once foodServicePaymentID is set, fetch the necessary data
    if (foodServicePaymentID !== undefined) {
      getOrderDetail();
      getFoodServicePaymentById();
    }
  }, [foodServicePaymentID]); // This effect runs once foodServicePaymentID changes

  if (foodServicePaymentID === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }
  
  // Filter order details where OrderID matches the OrderID in foodServicePayment
  const filteredOrderDetails = orderDetail.filter((detail) => foodServicePayment?.OrderID === detail.OrderID);
  

  return (
    <section className="food-receipt-container">
      {contextHolder}
      <FaPrint className="print-icon" size={45} onClick={() => window.print()}/>
      <div className="customer-detail-container">
        <div className="customer-detail">
          <h1>Bill To</h1>
          <div className="customer-info">
            <span className="name">{customer?.FirstName} {customer?.LastName}</span>
            <span className="address">4312 Wood Road New York, NY 100031</span>
          </div>
        </div>
        <div className="receipt-detail">
          <div className="receipt-info">
            <h1>RECEIPT</h1>
            <p>#{foodServicePayment?.ID}</p>
          </div>
          <div className="receipt-info">
            <h1>RECEIPT DATE</h1>
            <p>{formattedDate}</p>
          </div>
          <div className="receipt-info">
            <h1>PAYMENT METHOD</h1>
            <p>{foodServicePayment?.PaymentMethod}</p>
          </div>
        </div>
      </div>

      <table className="table-order-details">
        <thead>
          <tr>
            <th className="description">Description</th>
            <th className="quantity">Quantity</th>
            <th className="amount">Unit Price</th>
            <th className="amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrderDetails.map((detail, index) => (
            <tr key={detail.ID}>
              <td className="menu-name">{index + 1}. {detail.Menu?.MenuName}</td>
              <td className="quantity">{detail.Quantity}</td>
              <td className="unit-price">{(detail.Amount / detail.Quantity).toFixed(2)}</td>
              <td className="amount">{detail.Amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary-container">
        <div className="summary-item">
          <span className="header">Promotion code</span>
          <span className="detail">- 0.00</span>
        </div>
        <div className="summary-item">
          <span className="header">VAT 7%</span>
          <span className="detail">{vat.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="header">Subtotal</span>
          <span className="detail">{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="header">Total</span>
          <span className="detail">{total.toFixed(2)}</span>
        </div>
      </div>
      <hr />
      <div className="description-receipt">
          <p>This e-tax invoice/e-receipt is prepared by Cruise Ship and submitted electronically to the Revenue Department.</p>
          <p>Please carefully check the document and any amendment can be requested within 15 days. Otherwise, the e-tax invoice/e-receipt shall be
          deemed complete and accurate for submission.</p>
      </div>
    </section>
  );
}

export default FoodReceipt;