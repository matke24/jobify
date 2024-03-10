import dotenv from "dotenv";
const config = dotenv.config({ path: "../.env" });

if (config.error) {
  throw config.error;
}

export const environment = () => ({
  environmentMode: process.env.NODE_ENV,
  server_port: process.env.PORT,
  database_key: process.env.MONGO_URL,
  token_master_key: process.env.JWT_SECRET,
  token_expiry: process.env.JWT_EXPIRES_IN,
  cloud: process.env.CLOUD_NAME,
  cloud_master_key: process.env.CLOUD_API_KEY,
  cloud_secret_key: process.env.CLOUD_API_SECRET,
});
