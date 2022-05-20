import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest, select, takeEvery } from "redux-saga/effects";

import {
  addUserAPI,
  deleteUserAPI,
  editUserAPI,
  getUsersAPI,
} from "../../apis";
import { UsersData, UserModel } from "../../types";
import { areValuesEqual } from "../../utils/areValuesEqual";
import { getUserState } from "../selectors/user";
import {
  addEditUser,
  deleteUser,
  emptyInputData,
  getInputData,
  getUserId,
  getUsers,
  handleInputError,
  setInputData,
  setUsers,
  submitInputData,
} from "../slice/user";

function* handleFetchUsers() {
  try {
    const { data }: { data: UsersData } = yield call(getUsersAPI);
    yield put(setUsers(data));
  } catch (error) {
    console.log(error);
  }
}

function* handleInputData(action: PayloadAction<UserModel>) {
  try {
    yield put(setInputData(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* handleAddEditUser(action: PayloadAction<UserModel>) {
  const { id, name, surname, city } = action.payload;

  try {
    if (name.trim() === "" || surname.trim() === "" || city.trim() === "") {
      throw new Error();
    }

    const { users }: { users: UserModel[] } = yield select(getUserState);
    const userToEdit = users.filter((user) => user.id === id)[0];

    if (userToEdit) {
      if (areValuesEqual(userToEdit, action.payload)) {
        // Do not send request if property values are the same
        emptyInputData();
      } else {
        yield call(editUserAPI, action.payload);
      }
    } else {
      yield call(addUserAPI, action.payload);
    }

    yield put(addEditUser(action.payload));
  } catch (error) {
    console.log(error);
    yield put(handleInputError({ name, surname, city }));
  }
}

function* handleDeleteUser(action: PayloadAction<string>) {
  try {
    yield call(deleteUserAPI, action.payload);
    yield put(deleteUser(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga() {
  yield takeLatest(getUsers.type, handleFetchUsers);
  yield takeLatest(getInputData.type, handleInputData);
  yield takeLatest(submitInputData.type, handleAddEditUser);
  yield takeEvery(getUserId.type, handleDeleteUser);
}
