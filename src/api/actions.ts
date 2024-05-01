import axios, { AxiosError } from "axios";

const API_URL = "https://shiny-sniffle-4p77j7gg679cj7rw-3000.app.github.dev/api";

export const getCountryData = async (Country: string): Promise<CountryData> => {
  return new Promise<CountryData>((resolve, reject) => {
    axios
      .get(`${API_URL}/Country/${Country}`)
      .then((res) => {
        resolve({
          Country: Country,
          Population: res.data.Population,
          Area: res.data.Area,
          Expenses: res.data.Expenses,
          Safety: res.data.Safety,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Country not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
