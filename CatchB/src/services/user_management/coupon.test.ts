import axios from "axios";
import { act } from "@testing-library/react-native";

import { getCouponList, registerCoupon, checkStatus } from "./coupon";
import { TestNetworkError } from "../../utils/test-utils";

describe("getCouponList", () => {
  it("should successfully get coupon list", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { coupon_list: [] },
      })
    );

    const access = "access";

    const response = await act(() => getCouponList(access));

    expect(response.status).toBe(200);
    expect(response.data.coupon_list).toStrictEqual([]);
  });

  it("should fail to get coupon list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const access = "access";

    await act(() => getCouponList(access));
  });

  it("should fail to get coupon list", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const access = "access";

    const response = await act(() => getCouponList(access));

    expect(response.status).toBe(400);
  });
});

describe("registerCoupon", () => {
  it("should successfully register coupon", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { task_id: "task_id" },
      })
    );

    const coupon_code = "coupon_code";
    const access = "access";

    await act(() => registerCoupon(coupon_code, access));
  });

  it("should fail to register coupon", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const coupon_code = "coupon_code";
    const access = "access";

    await act(() => registerCoupon(coupon_code, access));
  });

  it("should fail to register coupon", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const coupon_code = "coupon_code";
    const access = "access";

    await act(() => registerCoupon(coupon_code, access));
  });
});

describe("checkStatus", () => {
  it("should successfully check status", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { status: "SUCCESS" },
      })
    );

    const taskId = "task_id";
    const access = "access";

    await act(() => checkStatus(taskId, access));
  });

  it("should fail to check status", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.reject(new Error("Network Error")));

    const taskId = "task_id";
    const access = "access";

    await act(() => checkStatus(taskId, access));
  });

  it("should fail to check status", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.reject(
          new TestNetworkError({ status: 400, data: "Bad Request" })
        )
      );

    const taskId = "task_id";
    const access = "access";

    await act(() => checkStatus(taskId, access));
  });
});
