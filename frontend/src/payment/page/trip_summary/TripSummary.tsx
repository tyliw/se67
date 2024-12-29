import React, { useEffect, useState } from "react";
import { BookingCabinInterface } from "../../../booking_cabin/interface/IBookingCabin";
import { message } from "antd";
import { GetBookingCabinById } from "../../../booking_cabin/service/https/BookingCabinAPI";
// import { AiOutlineUser } from "react-icons/ai";
import "./TripSummary.css";
// import StripeCheckout from '../trip_stripe/StripeCheckout';
import TripStripeCheckout from "../trip_stripe/TripStripeCheckout";

// function getTextColor(backgroundColor: string): string {
//   const rgb = backgroundColor.match(/\d+/g)?.map(Number);
//   if (!rgb || rgb.length < 3) return "black"; // fallback
//   const [r, g, b] = rgb;
//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//   return brightness > 125 ? "black" : "white";
// }

export default function TripSummary() {
  const [bookingCabin, setBookingCabin] = useState<BookingCabinInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [total] = useState<number>(10);
  //   const [textColor, setTextColor] = useState<string>("white");

  console.log("bookingCabin", bookingCabin);

  const getBookingCabin = async () => {
    const res = await GetBookingCabinById(1);
    if (res.status === 200) {
      setBookingCabin(res.data);
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    getBookingCabin();
  }, []);

  return (
    <>
      {contextHolder}
      <section className="trip-summary-container">
        <div className="trip-summary-grid">
          <div className="cruise-trip">
            <div className="trip-info">
              <header className="header">
                <h1>Trip Detail</h1>
              </header>
              <div className="detail">
                <div className="img-container">
                  <img
                    src="https://th.bing.com/th/id/OIP.CApLGnxC__cDvQbXNER4BQAAAA?rs=1&pid=ImgDetMain"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h1 className="ship-name">Aegean Paradise</h1>
                  <p>Vietnam & Thailand Cruise</p>
                  <p>Duration: 10 Night</p>

                  <div className="route">
                    <div className="modal-body">
                      <div className="progress-track">
                        <ul id="progressbar">
                          <li className="departure-left" id="departure">
                            <p>Jan 12, 2025</p>
                          </li>
                          <li className="arrival-right" id="arrival">
                            <p>Jan 22, 2025</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="cabin-info">
              <header>
                <h1 className="header">Cabin Detail</h1>
              </header>
              <div className="detail">
                <div className="cabin-img-container">
                  <img
                    src="https://i.pinimg.com/736x/62/e2/53/62e253823ac09e1ae14b2c0a0b5da72b.jpg"
                    alt="Interior"
                  />
                </div>
                <span>
                  <p>Cabin Type: Interior</p>
                  <p>Number: 101</p>
                  <p>Cabin Size: 96 inch</p>
                  <p>
                    Note: A cozy interior cabin with essential amenities, smart
                    storage, and a comfortable bed. Perfect for solo travelers
                    or couples seeking a budget-friendly option.
                  </p>
                </span>
              </div>
            </div>
            <hr />
            <div className="customer-info">
              <header>
                <h1 className="header">Contract Details</h1>
              </header>
              <span>
                <p>Email: sa@gmail.com</p>
                <p>Name: Software Analysis</p>
                <p>Phone: 0979989859</p>
              </span>
            </div>
            <hr />
            <div className="checkout">
              <header>
                <h1 className="header">Select Payment Method</h1>
              </header>
              <TripStripeCheckout total={total} VAT={70} />
            </div>
          </div>
        </div>
        <aside className="trip-summary">
          <div className="inside">
            <header>
              <h1 className="header">Discount</h1>
            </header>
            <div className="promotion">
              <p>Promotion code</p>
              <div className="promotion-content">
                <input
                  type="text"
                  // value={2}
                  // onChange={handlePromoCodeChange}
                  placeholder="Enter promo code"
                />
                <button>Apply</button>
              </div>
            </div>
            <hr />
            <header>
              <h1 className="header">Summary</h1>
            </header>
            <div className="detail">
              <span>
                <p>Cruise Trip</p>
                <p>฿ 50,000</p>
              </span>
              <span>
                <p>Cabin Price</p>
                <p>฿ 100,000</p>
              </span>
              {/* <hr /> */}
              <span>
                <p>Subtotal</p>
                <p>฿ 150,000</p>
              </span>
              <span>
                <p>VAT (7%)</p>
                <p>฿ 10,500</p>
              </span>
              <span>
                <p>Promotion</p>
                <p>- ฿ 0</p>
              </span>
              <span className="total">
                <h1>Total</h1>
                <h1 className="price">฿ 160,500</h1>
              </span>
            </div>
            {/* <button className="confirm-payment-button" id="submit">
              Confirm Payment
            </button> */}
            {/* <button onClick={() => setTotal(20)}>add</button>
            <div>total: {total}</div>
            <button onClick={() => setTotal(10)}>minus</button> */}
          </div>
        </aside>
      </section>
    </>
  );
}
