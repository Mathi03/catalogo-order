import { Fragment } from "react";
import ProductOrder from "../../../types/ProductOrder.type";
import { Tag } from "antd";

type PropsListProducts = {
  order: ProductOrder[];
  handleClickRemove: (sku: string) => void;
};

const ListProducts: React.FC<PropsListProducts> = ({
  order,
  handleClickRemove,
}) => {
  return (
    <Fragment>
      {order.map((p: ProductOrder) => (
        <div
          className="border rounded grid grid-cols-1 sm:grid-rows-3 sm:grid-flow-col gap-2 p-2 mb-2"
          key={p.sku}
        >
          <div className="row-span-3 mx-auto">
            <img
              src={p.image}
              className="w-full max-w-xs"
              alt="Responsive image"
            />
          </div>
          <div className="col-span-2 text-center">{p.name}</div>
          <div className="row-span-2 col-span-2">
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="flex justify-between">
                <span>Precio Lista</span>
                <p>{p.priceList}</p>
              </div>
              <div className="flex justify-between">
                <span>Cantidad</span>
                <p>{p.quantity}</p>
              </div>
              <div className="flex justify-between">
                <span>Estado</span>
                {p.state === 44
                  ? <Tag color="green" className="m-0">Separado</Tag>
                  : <Tag color="warning" className="m-0">Por Revisar</Tag>}
              </div>
              <div className="flex justify-between">
                <span>Precio Oferta</span>
                <p>{p.priceOfferPartner}</p>
              </div>
              <div className="flex justify-between">
                <span>Precio Director</span>
                <p>{p.priceOfferDirector}</p>
              </div>
            </div>
            <a
              href="#"
              className="btn"
              title="Eliminar"
              onClick={() => handleClickRemove(p.sku)}
            >
              <i className="fas fa-trash-alt"></i> Eliminar
            </a>
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default ListProducts;
