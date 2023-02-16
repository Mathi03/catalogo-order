import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const Total = () => {
  const order = useSelector((state: RootState) => state.order.order);
  const subTotal = order
    .reduce(
      (acumulador, actual) =>
        acumulador + Number(actual.priceList) * Number(actual.quantity),
      0,
    )
    .toFixed(2);
  // const totalDirector = order
  //   .reduce(
  //     (acumulador, actual) =>
  //       acumulador +
  //       Number(actual.priceOfferDirector) * Number(actual.quantity),
  //     0
  //   )
  //   .toFixed(2);
  const totalPartner = order
    .reduce(
      (acumulador, actual) =>
        acumulador + Number(actual.priceOfferPartner) * Number(actual.quantity),
      0,
    )
    .toFixed(2);

  const discount = (Number(subTotal) - Number(totalPartner)).toFixed(2);

  useEffect(() => {
    console.log("total");
  }, [order]);

  return (
    <div className="border rounded mb-4 p-3">
      <div className="card-header">Totales</div>
      <div className="card-body">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <small className="form-text text-muted">Sub-total</small>
            <div className="input-group">
              <span className="input-group-prepend">S/.</span>
              <input
                type="text"
                className="w-full"
                placeholder="Sub-total"
                aria-label="Sub-total"
                value={subTotal}
                disabled
              />
            </div>
          </div>
          <div>
            <small className="form-text text-muted">Descuento</small>
            <div className="input-group">
              <span className="input-group-prepend">S/.</span>
              <input
                type="text"
                className="w-full"
                placeholder="Descuento"
                aria-label="Descuento"
                value={discount}
                disabled
              />
            </div>
          </div>
          <div>
            <small className="form-text text-muted">Total Socio</small>
            <div className="input-group">
              <span className="input-group-prepend">S/.</span>
              <input
                type="text"
                className="w-full"
                placeholder="Total"
                aria-label="Total"
                aria-describedby="basic-addon1"
                value={totalPartner}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Total;
