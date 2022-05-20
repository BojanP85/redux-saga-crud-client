import { RootState } from "../../types";
import { initialState } from "../slice/user";

export const getUserState = (state: RootState) => state.user || initialState;
