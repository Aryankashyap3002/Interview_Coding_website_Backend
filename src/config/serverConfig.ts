import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

export default PORT || 5500;
