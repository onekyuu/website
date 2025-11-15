import {
  contactApi,
  ContactFormData,
  ContactResponse,
} from "@/lib/api/contact";

export function sendContactMessage(
  data: ContactFormData
): Promise<ContactResponse> {
  return contactApi.sendMessage(data);
}
