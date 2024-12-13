import React, { useEffect, useState } from "react";
import { FoodServicePaymentInterface } from "../../interface/IFoodServicePayment";

function FoodReceipt() {
  const [foodServicePayment, setFoodServicePayment] = useState<FoodServicePaymentInterface[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("foodServicePayment");
    if (savedData) {
      setFoodServicePayment(JSON.parse(savedData));
    }
  }, []);

  

  return <div>FoodReceipt</div>;
}

export default FoodReceipt;
