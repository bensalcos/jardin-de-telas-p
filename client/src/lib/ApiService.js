import "@/envConfig";

class ApiService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    this.token = null;
  }
  setToken(token) {
    this.token = token;
  }
  async request(endpoint, method = "POST", data = null, token = null) {
    const url = `${this.baseURL}${endpoint}/`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.token) {
      options.headers["Authorization"] = `Bearer ${this.token}`;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Error ${method}: ${response.statusText}`);
      }

      return result;
    } catch (error) {
      console.error("Error al interactuar con la API:", error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, "GET", null, this.token);
  }

  async post(endpoint, data) {
    return this.request(endpoint, "POST", data, token);
  }

  async put(endpoint, data) {
    return this.request(endpoint, "PUT", data, token);
  }

  async patch(endpoint, data) {
    return this.request(endpoint, "PATCH", data, token);
  }

  async delete(endpoint) {
    return this.request(endpoint, "DELETE", null, token);
  }
}

const apiService = new ApiService();
export default apiService;
