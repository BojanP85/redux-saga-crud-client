import axios from "axios";

import { UserModel } from "../types";

axios.defaults.baseURL = "https://obscure-bastion-42622.herokuapp.com/";

export function getUsersAPI() {
  return axios.request({
    method: "get",
    url: "/users",
  });
}

export function addUserAPI(user: UserModel) {
  return axios.request({
    method: "post",
    url: "/users",
    data: user,
  });
}

export function editUserAPI(user: UserModel) {
  return axios.request({
    method: "put",
    url: `/users/${user.id}`,
    data: user,
  });
}

export function deleteUserAPI(id: string) {
  return axios.request({
    method: "delete",
    url: `/users/${id}`,
  });
}
