import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./OrderSlice";
import personaReducer from "./PersonaSlice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    persona: personaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
