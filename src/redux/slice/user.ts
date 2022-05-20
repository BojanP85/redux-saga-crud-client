import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InputErrorPayload, UserModel, UserState } from "../../types";

export const initialState: UserState = {
  user: { id: "", name: "", surname: "", city: "" },
  users: [],
  loading: { submitLoading: false, fetchLoading: false },
  errors: { name: false, surname: false, city: false },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* FETCHING USERS */
    getUsers(state) {
      state.loading.fetchLoading = true;
    },
    setUsers(state, action: PayloadAction<UserModel[]>) {
      state.loading.fetchLoading = false;
      state.users = action.payload;
    },

    /* CONTROLLING INPUT DATA */
    getInputData(_, _action: PayloadAction<UserModel>) {},
    setInputData(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
    },
    submitInputData(state, _action: PayloadAction<UserModel>) {
      state.loading.submitLoading = true;
    },
    emptyInputData(state) {
      state.user = initialState.user;
    },
    handleInputError(state, action: PayloadAction<InputErrorPayload>) {
      state.loading.submitLoading = false;

      for (const [key, value] of Object.entries(action.payload)) {
        state.errors = { ...state.errors, [key]: value.trim() === "" };
      }
    },

    /* ADDING / EDITING USER */
    getUser(state, action: PayloadAction<UserModel>) {
      state.user = action.payload;
      state.errors = initialState.errors;
    },
    addEditUser(state, action: PayloadAction<UserModel>) {
      state.loading.submitLoading = false;
      !state.user.id
        ? state.users.push(action.payload)
        : (state.users = state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ));
      state.user = initialState.user;
      state.errors = initialState.errors;
    },

    /* DELETING USER */
    getUserId(state, action: PayloadAction<string>) {
      if (state.user.id === action.payload) {
        state.user = initialState.user;
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const {
  getUsers,
  setUsers,
  getInputData,
  setInputData,
  submitInputData,
  emptyInputData,
  handleInputError,
  addEditUser,
  getUser,
  getUserId,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
