import { createConnection, Connection, ConnectionConfig } from "mysql2";

// Ensure environment variables are defined
if (
  !process.env.MYSQL_HOST ||
  !process.env.MYSQL_USER ||
  !process.env.MYSQL_PASSWORD ||
  !process.env.MYSQL_DATABASE
) {
  throw new Error("Environment variables not properly set");
}

const db = createConnection({
  host: process.env.MYSQL_HOST as string,
  user: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
  database: process.env.MYSQL_DATABASE as string,
} as Partial<ConnectionConfig>);

db.connect((err: Error | null) => {
  if (err) {
    throw new Error(`Failed to connect to the database: ${err.message}`);
  }
  console.log("Connected to the database");
});

export {db};
