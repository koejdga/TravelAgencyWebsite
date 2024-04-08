const APP_SECRET = "my_secret";

import jwt from "jsonwebtoken";

export const auth = (authToken: string) => {
  try {
    jwt.verify(authToken, APP_SECRET);
    return true;
  } catch {
    return false;
  }
};

export const generateToken = () => {
  return jwt.sign({ userId: "true" }, APP_SECRET);
};

export const getInsertId = (res: any) => {
  const insertIdIndex = Object.keys(res).findIndex((x) => x === "insertId");
  const insertId = Object.values(res)[insertIdIndex];
  return insertId;
};
