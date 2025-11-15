import { API_CONFIG } from "./config";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export const contactApi = {
  sendMessage: async (data: ContactFormData): Promise<ContactResponse> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.contact.sendMessage}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.message || "Failed to send message");
    }

    return response.json();
  },
};
