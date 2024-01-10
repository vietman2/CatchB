import axios from "axios";

import { API_LOCAL_URL } from "./apiConfig";

export async function getCouponList(access: string) {
  const url = `${API_LOCAL_URL}/api/users/coupons/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}

export async function registerCoupon(coupon_code: string, access: string) {
  const url = `${API_LOCAL_URL}/api/users/coupons/register/`;

  try {
    const response = await axios.post(
      url,
      { coupon_code },
      {
        headers: {
          Authorization: `Bearer ${access}`,
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
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}

export async function checkStatus(taskId: string, access: string) {
  const url = `${API_LOCAL_URL}/api/users/coupons/status/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      params: {
        task_id: taskId,
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}
