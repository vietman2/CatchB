import axios from "axios";
import FormData from "form-data";
import { ImagePickerAsset } from "expo-image-picker";
import { DocumentPickerAsset } from "expo-document-picker";

import { API_LOCAL_URL } from "../";

export async function registerCoach(
  member_uuid: string,
  member_name: string,
  member_phone: string,
  baseball_career: string,
  certificate: ImagePickerAsset | DocumentPickerAsset,
  token: string
) {
  const url = `${API_LOCAL_URL}/api/products/coaches/`;

  const data = new FormData();
  data.append("member_uuid", member_uuid);
  data.append("member_name", member_name);
  data.append("member_phone", member_phone);
  data.append("baseball_career", baseball_career);
  data.append("certification", {
    uri: certificate.uri,
    name: "certificate",
  });

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: 400,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}
