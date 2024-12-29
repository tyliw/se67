import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import "./OrderSummary.css";

const OrderSummary: React.FC<{ subtotal: number }> = ({ subtotal }) => {
  const { filteredOrderDetails, formatPriceWithTwoDecimals } = useOrder(); // Access Context
  const [promoCode, setPromoCode] = useState(""); // State to handle promo code input
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null); // State to handle discounted total

  const vatRate = 0.07; // 7% VAT
  const numericSubtotal = Number(subtotal) || 0;
  const vat = numericSubtotal * vatRate;

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromoCode = () => {
    if (promoCode === "team03") {
      const discountAmount = 10; // Apply the discount logic
      setDiscountedTotal(discountAmount);
    } else {
      setDiscountedTotal(null); // If invalid promo code, reset the total
    }
  };

  const total = discountedTotal !== null ? discountedTotal : numericSubtotal + vat;

  // const formatPriceWithTwoDecimals = (price: number | string) =>
  //   new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(
  //     Number(price)
  //   );

  return (
    <>
      <aside className="order-summary-container">
        <section className="order-summary-promotion-container">
          <header>
            <h1>Discount</h1>
          </header>
          <div className="promotion">
            <p>Promotion code</p>
            <div className="promotion-content">
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder="Enter promo code"
              />
              <button onClick={handleApplyPromoCode}>Apply</button>
            </div>
          </div>
        </section>
        <section className="order-summary">
          <header>
            <h1>Order Summary</h1>
          </header>
          <div className="order-summary-content">
            <div className="order-summary-detail">
              <div className="order-summary-subtotal">
                <p>Subtotal</p>
                <p>฿ {formatPriceWithTwoDecimals(numericSubtotal.toFixed(2))}</p>
              </div>
              <div className="order-summary-vat">
                <p>VAT (7%)</p>
                <p>฿ {formatPriceWithTwoDecimals(vat.toFixed(2))}</p>
              </div>
              <div className="order-summary-promotion">
                <p>Promotion</p>
                <p>฿ - {discountedTotal !== null ? formatPriceWithTwoDecimals((numericSubtotal + vat - discountedTotal).toFixed(2)) : "0.00"}</p>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="order-summary-footer">
          <div className="order-summary-total">
            <h2>Total</h2>
            <h2>฿ {formatPriceWithTwoDecimals(total.toFixed(2))}</h2>
          </div>
          <Link to={ "/food-service/login/menu/order-summary/checkout"} state={{total: total, VAT: vat}}>
            <button 
              className={`checkout-button${filteredOrderDetails.length > 0 ? "" : " disabled"}`} 
              disabled={filteredOrderDetails.length === 0}
            >
              Confirm Order
            </button>
          </Link>
        </section>
      </aside>
    </>
  );
};

export default OrderSummary;