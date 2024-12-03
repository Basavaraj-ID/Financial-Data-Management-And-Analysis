import { API_BASE_URL } from "../constants";

const fetchData = async (path: string, params: Record<string, any>) => {
  const queryParams = new URLSearchParams(params).toString();
  
  const response = await fetch(`${API_BASE_URL}${path}?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export default fetchData;
