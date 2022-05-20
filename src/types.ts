export type UsersData = Array<UserModel>;

export interface UserModel {
  id: string;
  name: string;
  surname: string;
  city: string;
}

export interface UserState {
  user: UserModel;
  users: Array<UserModel>;
  loading: LoadingModel;
  errors: InputErrorModel;
}

export interface LoadingModel {
  submitLoading: boolean;
  fetchLoading: boolean;
}

export interface InputErrorPayload {
  name: string;
  surname: string;
  city: string;
}

export interface InputErrorModel {
  name: boolean;
  surname: boolean;
  city: boolean;
}

export interface RootState {
  user: UserState;
}
