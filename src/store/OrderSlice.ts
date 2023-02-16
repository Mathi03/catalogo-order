import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../types/Product.type";
import ProductOrder from "../types/ProductOrder.type";

interface OrderState {
  order: ProductOrder[];
}

const initialState: OrderState = {
  order: [
    // {
    //   sku: "18805085883",
    //   name: "FOOTLOOSE FCH-WL021 (35-40) TRIXI - M SINTETICO NEGRO-35.0",
    //   stock: 2,
    //   priceList: 249,
    //   priceOfferDirector: 193.8,
    //   priceOfferPartner: 193.8,
    //   image:
    //     "https://sip.footloose.pe/web/_images/1x/585_106611_00010010_040_2_168_001.jpg",
    //   state: 44,
    //   quantity: 2,
    // },
  ],
};

interface Increment {
  data: Product;
  quantity: number;
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Increment>) => {
      const { data, quantity } = action.payload;
      let product: ProductOrder = { ...data, quantity };
      state.order.push(product);
    },
    decrement: (state, action: PayloadAction<string>) => {
      const sku = action.payload;
      let temp = state.order.filter((obj) => obj.sku !== sku);
      state.order = temp;
    },
    cleanOrder: (state) => {
      state.order = [];
    },
  },
});

export const { increment, decrement, cleanOrder } = orderSlice.actions;

export default orderSlice.reducer;
