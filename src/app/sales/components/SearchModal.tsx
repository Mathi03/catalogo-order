import React from "react";
import { Button, Input, Modal, Table } from "antd";
import productService from "../../../services/product.service";
const { Column } = Table;

type PropsSearchModal = {
  open: boolean;
  setSku: (val: string) => void;
  onOk: () => void;
  onCancel: () => void;
};

const SearchModal: React.FC<PropsSearchModal> = ({
  open,
  setSku,
  onOk,
  onCancel,
}) => {
  const [arrayProducts, setArrayProducts] = React.useState<Array<string[]>>([]);

  const handleKeyPressModelOrSku = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    let {
      currentTarget: { value },
    } = e;
    let response = await searchModel(value);
    setArrayProducts(response);
  };

  const handleClickSelect = (k: string) => {
    console.log("click", k);
    setSku(k);
    onOk();
  };

  const searchModel = async (model: string) => {
    let response = await productService.getByModelOrSku(model);
    return response;
  };

  return (
    <Modal
      title="Selecciona un producto"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key="back" onClick={onCancel}>
          Salir
        </Button>,
      ]}
    >
      <Input
        placeholder="Buscar por SKU | Modelo"
        onPressEnter={handleKeyPressModelOrSku}
      />
      <Table dataSource={arrayProducts} rowKey={String([0])}>
        <Column title="Sku" dataIndex={[0]} key="sku" />
        <Column
          title="Articulo"
          dataIndex={[1]}
          key="article"
          responsive={["sm"]}
        />
        <Column title="Nombre" dataIndex={[2]} key="name" responsive={["sm"]} />
        <Column
          title="Imagen"
          dataIndex={[4]}
          key="image"
          responsive={["sm"]}
          render={(_: any, record: string[]) => (
            <img src={record[4]} width="50" />
          )}
        />
        <Column
          title="Imagen"
          key="image"
          render={(_: any, record: string[]) => (
            <a
              className="btn btn-primary"
              href="#"
              onClick={() => handleClickSelect(record[0])}
              key={record[0]}
            >
              <i className="fas fa-plus-square"></i>
            </a>
          )}
        />
      </Table>
    </Modal>
  );
};
export default SearchModal;
