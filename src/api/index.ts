import axios from "axios";

const url = `https://jsonplaceholder.typicode.com/todos?_limit=10.`;

export async function fetchData() {
  try {
    const response = await axios.get(url);
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
  }
}
