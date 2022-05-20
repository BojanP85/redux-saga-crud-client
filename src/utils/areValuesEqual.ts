import { UserModel } from "../types";

export function areValuesEqual(user1: UserModel, user2: UserModel) {
  const trimSpaces = (value: string) => {
    return value.replace(/  +/g, " ").trim();
  };

  return (
    trimSpaces(user1.name) === trimSpaces(user2.name) &&
    trimSpaces(user1.surname) === trimSpaces(user2.surname) &&
    trimSpaces(user1.city) === trimSpaces(user2.city)
  );
}
