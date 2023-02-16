import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Partner from "../types/Partner.type";

interface PersonState {
  partners: Partner[];
  select: string;
  // date: string;
}

const initialState: PersonState = {
  partners: [],
  select: "",
  // date: "",
};

export const personaSlice = createSlice({
  name: "persona",
  initialState,
  reducers: {
    addPartners: (state, action: PayloadAction<Partner[]>) => {
      let data = action.payload;
      state.partners = data;
    },
    selectPartner: (state, action: PayloadAction<string>) => {
      state.select = action.payload;
    },
    // setDate: (state, action: PayloadAction<string>) => {
    //   state.date = action.payload;
    // },
    cleanValues: (state) => {
      state.select = "";
      // state.date = "";
    },
  },
});

export const { addPartners, selectPartner, cleanValues } =
  personaSlice.actions;

export default personaSlice.reducer;
