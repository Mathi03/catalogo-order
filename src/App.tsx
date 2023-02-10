import React, { useEffect, useState } from "react";
import Cart from "./app/sales/screens";
import Total from "./Total";
import { cleanValues } from "./store/PersonaSlice";
import { addOrder, cleanOrder } from "./store/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import "./App.css";
import orderService from "./services/order.service";
import NotificationHandle from "./components/NotificationHandle";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order.order);
  const partner = useSelector((state: RootState) => state.persona.select);
  const date = useSelector((state: RootState) => state.persona.date);

  useEffect(() => {}, []);

  const generateOrder = async () => {
    dispatch(addOrder({ partner, date }));
    dispatch(cleanValues());
    dispatch(cleanOrder());
  };

  return (
    <div className="container mx-auto py-3">
      <Cart />
      <Total />
      <a href="#" className="btn btn-success" onClick={generateOrder}>
        Generar Orden
      </a>
    </div>
  );
};

export default App;
