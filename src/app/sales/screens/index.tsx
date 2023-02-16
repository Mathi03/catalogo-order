import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../../store/OrderSlice";
import { selectPartner, setDate } from "../../../store/PersonaSlice";
import { DatePicker, DatePickerProps, InputNumber, Select } from "antd";
import SearchModal from "../components/SearchModal";
import { RootState } from "../../../store";
import Product from "../../../types/Product.type";
import Partner from "../../../types/Partner.type";
import productService from "../../../services/product.service";
import partnerService from "../../../services/partner.service";
import ListProducts from "../components/ListProducts";

const Cart: React.FC = () => {
  const order = useSelector((state: RootState) => state.order.order);
  const partner = useSelector((state: RootState) => state.persona.select);
  const [partners, setPartners] = useState<Partner[]>([]);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Input quantity
  const [disableInput, setDisableInput] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(0);
  const inputRefQuantity = useRef(null);
  // const inputRefQuantity = createRef(0);

  const [sku, setSku] = useState<string>("");
  const [data, setData] = useState<Product>({
    sku: "",
    name: "",
    stock: 0,
    priceList: 0,
    priceOfferDirector: 0,
    priceOfferPartner: 0,
    image: "",
    state: 0,
  });

  React.useEffect(() => {
    console.log("useEffect", sku);
    console.log("ref", inputRefQuantity);
    if (sku) {
      productService.getSingleProduct(sku).then((data) => {
        let dataRecibida: Product = {
          sku: data[5],
          name: data[0],
          stock: Number(data[4]),
          priceList: Number(data[1]),
          priceOfferDirector: Number(data[3]),
          priceOfferPartner: Number(data[2]),
          image: data[6],
          state: Number(data[9]),
        };
        setData(dataRecibida);
        setDisableInput(false);
        setSku("");
        (inputRefQuantity.current as any).focus();
        // refInputQuantity.current.focus();
      });
    }
  }, [sku]);

  const handleClickAdd = () => {
    if (data && quantity > 0) {
      dispatch(increment({ data, quantity }));
      setData({
        sku: "",
        name: "",
        stock: 0,
        priceList: 0,
        priceOfferDirector: 0,
        priceOfferPartner: 0,
        image: "",
        state: 0,
      });
      setQuantity(0);
      setDisableInput(true);
    }
  };

  const handleChangeQuantity = (value: any = 0) => {
    setQuantity(value);
  };

  const handleFocusQuantity = (event: React.FocusEvent<HTMLInputElement>) => {
    // setIsFocusQuantity(true)
    console.log(event);
  };

  const handleClickRemove = (k: string) => {
    dispatch(decrement(k));
  };

  const handleSelectOnChange = (value: string) => {
    dispatch(selectPartner(value));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetch = async (value: string, callback: Function) => {
    await partnerService.getPartners(value).then((resp) => {
      console.log("resp", resp);
      const data = resp.map((item: any) => ({
        value: item[0],
        label: item[1],
      }));
      callback(data);
    });
  };

  const handleSearch = (newValue: string) => {
    if (newValue.length >= 5) {
      if (newValue) {
        fetch(newValue, setPartners);
      } else {
        setPartners([]);
      }
    }
  };

  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString,
  ) => {
    dispatch(setDate(dateString));
  };

  return (
    <Fragment>
      <div className="border rounded mb-4 p-3">
        <div className="grid grid-cosl-1 sm:grid-cosl-2 gap-2">
          <div className="col-span-1 sm:col-span-2">
            <div className="">Escoger un Socio</div>
          </div>
          <div className="col-span-1">
            <div className="">
              <i className="fas fa-users mr-2"></i>
              <Select
                showSearch
                placeholder="Selecciona un Socio"
                onChange={handleSelectOnChange}
                style={{ width: "80%" }}
                onSearch={handleSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())}
                options={partners}
                value={partner}
              />
            </div>
            <small className="form-text text-muted">Seleccionar Socio.</small>
          </div>
          <div className="col-span-1">
            <div>
              <DatePicker
                format={"YYYY-MM-DD"}
                style={{ width: "80%" }}
                placeholder="Seleccionar fecha Cierre"
                onChange={onChangeDatePicker}
              />
            </div>
            <small className="form-text text-muted">
              Seleccionar fecha de Cierre
            </small>
          </div>
        </div>
      </div>
      <div className="border rounded mb-4 p-3">
        <div className="grid grid-cosl-1 sm:grid-cosl-2 md:grid-cosl-4 lg:grid-cosl-4 gap-2">
          <div className="col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-4">
            <div className="h5">Buscar Productos</div>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="fas fa-barcode"></i>
              </div>
              <input
                type="text"
                className="w-full"
                placeholder="Sku"
                disabled
                value={data.sku}
              />
            </div>
            <small className="form-text text-muted">
              Código Sku del producto.
            </small>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <a
              href="#"
              className="btn btn-primary btn-block"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="fas fa-search"></i> Buscar Producto
            </a>
          </div>

          <div className="col-span-1 sm:col-span-4">
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="fas fa-box-open"></i>
              </div>
              <input
                type="text"
                className="w-full"
                placeholder="Nombre del Producto"
                value={data.name}
                disabled
              />
            </div>
            <small className="form-text text-muted">
              Nombre del producto seleccionado.
            </small>
          </div>
          <div className="col-span-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="fas fa-calculator"></i>
              </div>
              <InputNumber
                ref={inputRefQuantity}
                className="w-full"
                placeholder="Cantidad"
                onChange={handleChangeQuantity}
                onFocus={handleFocusQuantity}
                value={quantity}
                disabled={disableInput}
                min={0}
              />
            </div>
            <small className="form-text text-muted">
              Ingrese la cantidad que desea comprar.
            </small>
          </div>
          <div className="col-span-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="fas fa-warehouse"></i>
              </div>
              <input
                type="text"
                className="w-full"
                placeholder="Stock"
                value={data.stock}
                disabled
              />
            </div>
            <small className="form-text text-muted">
              Cantidad de stock del producto.
            </small>
          </div>
          <div className="col-span-1">
            <div className="input-group">
              <div className="input-group-prepend">S/.</div>
              <input
                type="text"
                className="w-full"
                placeholder="Precio de Lista"
                value={data.priceList}
                disabled
              />
            </div>
            <small className="form-text text-muted">
              Precio de lista del producto.
            </small>
          </div>
          <div className="col-span-1">
            <div className="input-group">
              <div className="input-group-prepend">S/.</div>
              <input
                type="text"
                className="w-full"
                placeholder="Precio Socio"
                value={data.priceOfferPartner}
                disabled
              />
            </div>
            <small className="form-text text-muted">Precio Socio.</small>
          </div>
          <div className="col-span-1 sm:col-span-4">
            <a
              href="#"
              className="btn btn-primary btn-block"
              onClick={() => handleClickAdd()}
            >
              <i className="fas fa-plus"></i> Agregar
            </a>
          </div>
        </div>
      </div>

      <div className="border rounded mb-4 p-3">
        <div className="">Productos</div>
        <ListProducts order={order} handleClickRemove={handleClickRemove} />
      </div>
      <SearchModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        setSku={setSku}
      />
    </Fragment>
  );
};

export default Cart;
