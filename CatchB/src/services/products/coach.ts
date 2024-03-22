import axios from "axios";
import FormData from "form-data";
import { ImagePickerAsset } from "expo-image-picker";
import { DocumentPickerAsset } from "expo-document-picker";

import { API_LOCAL_URL } from "../";
import { SigunguType } from ".types/products";

export async function postCoach(
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

export async function getCoachRegisterStatus(uuid: string, token: string) {
  const url = `${API_LOCAL_URL}/api/products/coaches/status/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        uuid,
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

export async function getCoachList() {
  const url = `${API_LOCAL_URL}/api/products/coaches/`;

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

export async function getCoachDetail(uuid: string) {
  const url = `${API_LOCAL_URL}/api/products/coaches/${uuid}/`;

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

export async function postCoachInfo(
  coach_uuid: string,
  intro: string,
  specialty: string[],
  level: string[],
  lesson_type: string[],
  images: ImagePickerAsset[],
  regions: SigunguType[],
  token: string
) {
  const url = `${API_LOCAL_URL}/api/products/coaches/${coach_uuid}/`;

  const formData = new FormData();

  formData.append("intro", intro);
  specialty.forEach((item) => {
    formData.append("specialty", item);
  });
  level.forEach((item) => {
    formData.append("level", item);
  });
  lesson_type.forEach((item) => {
    formData.append("lesson_type", item);
  });
  images.forEach((image, index) => {
    formData.append(`images`, {
      uri: image.uri,
      name: `image${index}`,
    });
  });
  regions.forEach((region) => {
    formData.append("regions", region.code);
  });

  try {
    const response = await axios.post(url, formData, {
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
