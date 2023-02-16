import React, { useEffect } from "react";
import Cart from "./app/sales/screens";
import Total from "./Total";
import { cleanValues } from "./store/PersonaSlice";
import { cleanOrder } from "./store/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import "./App.css";
import orderService from "./services/order.service";
import NotificationHandle from "./components/NotificationHandle";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.order.order);
  const partner = useSelector((state: RootState) => state.persona.select);
  // const date = useSelector((state: RootState) => state.persona.date);

  useEffect(() => {}, []);

  const generateOrder = async () => {
    if (order.length !== 0 && partner) {
      let tempXML = "<Root>";
      order.forEach((o, i) => {
        i++;
        tempXML += '<row id="' + i + '">';
        tempXML += "<sku>" + o.sku + "</sku>";
        tempXML += "<nam>" + o.name + "</nam>";
        tempXML += "<qty>" + o.quantity + "</qty>";
        tempXML += "<mst>" + o.priceList + "</mst>";
        tempXML += "<mts>" + o.priceOfferPartner + "</mts>";
        tempXML += "<mtd>" + o.priceOfferDirector + "</mtd>";
        tempXML += "<est>" + o.state + "</est>";
        tempXML += "</row>";
      });
      tempXML += "</Root>";
      let jsonTotal = {
        // fechaCierre: date,
        xmlDetalle: tempXML,
        personaIns: window.setting.personId,
        socioId: partner,
      };
      orderService
        .createOrder(jsonTotal)
        .then((resp) => {
          console.log("POST", resp);
          NotificationHandle(
            "success",
            "Order Creada",
            "La order fue grabado con exito.",
          );
        });
      dispatch(cleanValues());
      dispatch(cleanOrder());
    } else {
      NotificationHandle(
        "error",
        "Oops...",
        "Debe agregar al menos una order y seleccionar un socio",
      );
    }
  };

  return (
    <div className="container mx-auto py-3 max-w-5xl">
      <Cart />
      <Total />
      <a href="#" className="btn btn-success" onClick={generateOrder}>
        Generar Orden
      </a>
    </div>
  );
};

export default App;
