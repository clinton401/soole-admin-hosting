

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

// export const API_URL = getEnvVariable("API_URL");
export const NEXT_API_URL = "https://soole-backend.onrender.com/api";
// export const NEXT_API_URL = "http://localhost:5000/api";
