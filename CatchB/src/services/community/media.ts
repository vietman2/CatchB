import axios from "axios";
import FormData from "form-data";

import { API_LOCAL_URL } from "..";
import { ImagePickerAsset } from "expo-image-picker";

export async function getTagsList() {
  const url = `${API_LOCAL_URL}/api/community/tags/`;

  try {
    const response = await axios.get(url);

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

export async function uploadImageFile(user_uuid: string, image: ImagePickerAsset) {
  const url = `${API_LOCAL_URL}/api/community/images/`;

  const formData = new FormData();
  formData.append("image", {
    uri: image.uri,
    name: image.fileName,
    type: `image/${image.uri.split(".").pop()}`,
  });
  formData.append("user_uuid", user_uuid);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
