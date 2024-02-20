import axios from "axios";
import FormData from "form-data";
import { ImagePickerAsset } from "expo-image-picker";

import { API_LOCAL_URL } from "../";

export async function registerFacility(
  name: string,
  owner_uuid: string,
  owner_name: string,
  owner_phone: string,
  phone: string,
  reg_code: string,
  road_address_part1: string,
  road_address_part2: string,
  building_name: string,
  zip_code: number,
  bcode: string
) {
  const url = `${API_LOCAL_URL}/api/facilities/`;

  try {
    const response = await axios.post(
      url,
      {
        name,
        owner_uuid,
        owner_name,
        owner_phone,
        phone,
        reg_code,
        road_address_part1,
        road_address_part2,
        building_name,
        zip_code,
        bcode,
      },
      {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }
    );

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

export async function uploadDetails(
  facility_uuid: string,
  intro: string,
  times: {
    weekday_open: string;
    weekday_close: string;
    saturday_open: string;
    saturday_close: string;
    sunday_open: string;
    sunday_close: string;
  },
  convenience: string[],
  equipment: string[],
  numMounds: number,
  numPlates: number,
  additionalEquipment: string[],
  others: string[],
  images: ImagePickerAsset[]
) {
  const url = `${API_LOCAL_URL}/api/facilities/${facility_uuid}/`;
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const fileType = image.fileName.split(".").pop();

    formData.append("images", {
      uri: image.uri,
      name: image.fileName,
      type: `image/${fileType}`,
    });
  }

  formData.append("intro", intro);
  formData.append("weekday_open", times.weekday_open);
  formData.append("weekday_close", times.weekday_close);
  formData.append("saturday_open", times.saturday_open);
  formData.append("saturday_close", times.saturday_close);
  formData.append("sunday_open", times.sunday_open);
  formData.append("sunday_close", times.sunday_close);
  convenience.forEach((item) => {
    formData.append("convenience", item);
  });
  equipment.forEach((item) => {
    formData.append("equipment", item);
  });
  formData.append("num_mounds", numMounds);
  formData.append("num_plates", numPlates);
  additionalEquipment.forEach((item) => {
    formData.append("custom", item);
  });
  others.forEach((item) => {
    formData.append("others", item);
  });

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
      console.log(err.response.data)
      return {
        status: 400,
        data: err.response.data,
      };
    } else {
      return {
        status: 500,
        data: "Server Error",
      };
    }
  }
}
