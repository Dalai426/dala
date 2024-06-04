import React, { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import { careService } from "@/services/care.service";
import { set } from "react-hook-form";

interface TTYPE {
  [key: string]: {
    name: string;
  };
}
interface CareData {
  transport_type?: TTYPE;
  care_type?: {
    type?: number;
    name?: string;
  };
  detail?: {
    detail_type: number;
    name: string;
    description: string;
  };
  is_completed?: boolean;
  have_delivery?: boolean;
  is_return?: boolean;
  return_type?: number;
  delivery_start?: string;
  delivery_end?: string;
  delivery_type?: number;
  delivery_types?: TTYPE;
  delivery_return_types?: TTYPE;
  true_type?: TTYPE;
  false_type?: TTYPE;
}

export default function CareDelivery(props: any) {
  const { care_id, setEdit } = props;
  const [care_data, setCareData] = useState<CareData | null>({
    delivery_start: new Date("2020-01-01").toISOString().substring(0, 10),
    delivery_end: new Date("2025-01-01").toISOString().substring(0, 10),
  });
  const getData = async () => {
    try {
      const response = await careService.careDetail(care_id);
      console.log("care detail", response);
      setCareData(response.data);
    } catch (err) {
      console.log("care detail error", err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        care_id,
        data: data,
      };
      const response = await careService.updateCare(payload);
      if (response.code == 5100) {
        setEdit(false);
        toast.success("Амжилттай хадгаллаа", {
          hideProgressBar: true,
        });
      } else {
        toast.error("Алдаа гарлаа " + response?.message, {
          hideProgressBar: true,
        });
      }
    } catch (err) {
      toast.error("Алдаа гарлаа " + err, {
        hideProgressBar: true,
      });
      console.log("care update error", err);
    }
  };

  return (
    <div>
      <div className="text-sm mb-2  pb-2">{care_data?.care_type?.name}</div>
      <div>
        <label className="text-sm flex flex-col">Хаяг тавигдсан эсэх</label>
        <select
          className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
          value={care_data?.have_delivery?.toString()}
          onChange={(e) => {
            setCareData((prevState: any) => ({
              ...prevState,
              have_delivery: e.target.value === "true",
            }));
          }}
        >
          <option value="true">Тийм</option>
          <option value="false">Үгүй</option>
        </select>
      </div>
      {care_data?.have_delivery ? (
        <div>
          <div className="pt-4">
            <label className="text-sm flex flex-col">Хаягжилтын төрөл</label>
            <select
              className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              value={care_data?.delivery_type?.toString()}
              onChange={(e) => {
                setCareData((prevState: any) => ({
                  ...prevState,
                  delivery_type: parseInt(e.target.value),
                }));
              }}
            >
              {care_data?.delivery_types &&
                Object.keys(care_data.delivery_types).map(
                  (key: string, index: number) => (
                    <option key={index} value={key}>
                      {care_data?.delivery_types
                        ? care_data.delivery_types[index + 1]?.name
                        : undefined}
                    </option>
                  )
                )}
            </select>
          </div>
          <div>
            <label className="text-sm flex flex-col">
              Хаягжилт эхлэх огноо
            </label>
            <input
              type="date"
              className="focus:outline-none w-48 p-2 border rounded-md focus:border-sky-300 z-0 text-gray-600 dark:bg-white"
              value={new Date(care_data?.delivery_start || "2024-01-01")
                .toISOString()
                .substring(0, 10)}
              onChange={(e) => {
                setCareData((prevState: any) => ({
                  ...prevState,
                  delivery_start: e.target.value + "T00:00:00.000Z",
                }));
              }}
            />
          </div>

          <div>
            <label className="text-sm flex flex-col">
              Хаягжилт буцаах эсэх
            </label>
            <select
              className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              value={care_data?.is_return?.toString()}
              onChange={(e) => {
                setCareData((prevState: any) => ({
                  ...prevState,
                  is_return: e.target.value === "true",
                }));
              }}
            >
              <option value="true">Тийм</option>
              <option value="false">Үгүй</option>
            </select>
          </div>
          {care_data?.is_return && care_data?.is_return === true && (
            <div>
              <div>
                <label className="text-sm flex flex-col">
                  Хаягжилт буцаах төрөл
                </label>
                <select
                  className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  value={care_data?.return_type?.toString()}
                  onChange={(e) => {
                    setCareData((prevState: any) => ({
                      ...prevState,
                      return_type: parseInt(e.target.value),
                    }));
                  }}
                >
                  {care_data?.delivery_return_types &&
                    Object.keys(care_data.delivery_return_types).map(
                      (key: string, index: number) => (
                        <option key={index} value={key}>
                          {care_data?.delivery_return_types
                            ? care_data.delivery_return_types[index + 1]?.name
                            : undefined}
                        </option>
                      )
                    )}
                </select>
              </div>

              <div>
                <label className="text-sm flex flex-col">
                  Хаягжилт дуусах огноо
                </label>
                <input
                  type="date"
                  className="w-48 focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 text-gray-600 dark:bg-white"
                  value={new Date(care_data?.delivery_end || "2024-01-01")
                    .toISOString()
                    .substring(0, 10)}
                  onChange={(e) => {
                    setCareData((prevState: any) => ({
                      ...prevState,
                      delivery_end: e.target.value + "T00:00:00.000Z",
                    }));
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label className="text-sm flex flex-col pt-4">Хаягжилт байхгүй</label>
        </div>
      )}
      {/* <div>
        <label className="text-sm flex flex-col">Хаягжилт эхлэх огноо</label>
        <input
          type="date"
          className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 text-white"
          value={care_data?.delivery_start}
          onChange={(e) => {
            setCareData((prevState: any) => ({
              ...prevState,
              delivery_start: e.target.value,
            }));
          }}
        />
      </div> */}
      {/* {care_data?.have_delivery && (
        <div>
          <div>
            <label className="text-sm flex flex-col">
              Хаягжилт буцаах эсэх
            </label>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              value={care_data?.is_return?.toString()}
              onChange={(e) => {
                setCareData((prevState: any) => ({
                  ...prevState,
                  is_return: e.target.value === "true",
                }));
              }}
            >
              <option value="true">Тийм</option>
              <option value="false">Үгүй</option>
            </select>
          </div>
          {care_data?.is_return && care_data?.is_return === true && (
            <div>
              <label className="text-sm flex flex-col">
                Хаягжилт дуусах огноо
              </label>
              <input
                type="date"
                className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 text-white"
                value={care_data?.delivery_end}
                onChange={(e) => {
                  setCareData((prevState: any) => ({
                    ...prevState,
                    delivery_end: e.target.value,
                  }));
                }}
              />
            </div>
          )}
        </div> */}
      {/* )} */}
      <div className="flex justify-end p-2">
        <button
          className="p-2 rounded-md cursor-pointer justify-center border font-semibold hover:text-gray-600 hover:shadow-md"
          onClick={() => {
            const payload: {
              care_type: number | undefined;
              have_delivery: boolean | undefined;
              delivery_type: number | undefined;
              delivery_start?: string | undefined;
              is_return?: boolean;
              delivery_end?: string;
            } = {
              care_type: care_data?.care_type?.type,
              have_delivery: care_data?.have_delivery,
              delivery_type: care_data?.delivery_type,
            };
            // if (care_data?.delivery_start) {
            //   payload["delivery_start"] =
            //     care_data?.delivery_start + "T00:00:00.000Z";
            // }
            // if (care_data?.delivery_end) {
            //   payload["delivery_end"] =
            //     care_data?.delivery_end + "T00:00:00.000Z";
            // }
            if (care_data?.is_return) {
              payload["is_return"] = care_data?.is_return;
              if (!care_data?.delivery_end) {
                payload["delivery_end"] = "2024-01-01" + "T00:00:00.000Z";
              } else {
                payload["delivery_end"] =
                  care_data?.delivery_end + "T00:00:00.000Z";
              }
            }
            console.log(payload, "payload");
            handleSubmit(payload);
          }}
        >
          Хадгалах
        </button>
      </div>
    </div>
  );
}
