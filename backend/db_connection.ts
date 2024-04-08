import mysql from "mysql2/promise";

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "travel_cards",
  });

  return connection;
}

// import mysql, { ConnectionOptions } from "mysql2";

// const access: ConnectionOptions = {
//   host: "localhost",
//   user: "root",
//   database: "travel_cards",
// };

// export function connectToDatabase() {
//   const conn = mysql.createConnection(access);
//   return conn;
// }
