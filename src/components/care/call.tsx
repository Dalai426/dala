import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { careService } from "@/services/care.service";
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
  delivery_start?: string;
  delivery_end?: string;
  delivery_type?: number;
  delivery_types?: TTYPE;
  delivery_return_types?: TTYPE;
  true_type?: TTYPE;
  false_type?: TTYPE;
}

export default function CareCall(props: any) {
  const { care_id, setEdit } = props;
  const [care_data, setCareData] = useState<CareData | null>(null);
  console.log("care data", care_data);
  const getData = async () => {
    try {
      // const response = await careService.careDetail(care_id);
      // console.log("care detail", response);
      // setCareData(response.data);
    } catch (err) {
      console.log("care detail error", err);
    }
  };

  const handleSubmit = async (data: any) => {
    // try {
    //   const payload = {
    //     care_id,
    //     data: data,
    //   };
    //   console.log("payload", payload);
    //   const response = await careService.updateCare(payload);
    //   if (response.code == 5100) {
    //     setEdit(false);
    //     toast.success("Амжилттай хадгаллаа", {
    //       hideProgressBar: true,
    //     });
    //   } else {
    //     toast.error("Алдаа гарлаа " + response?.message, {
    //       hideProgressBar: true,
    //     });
    //   }
    // } catch (err) {
    //   toast.error("Алдаа гарлаа " + err, {
    //     hideProgressBar: true,
    //   });
    //   console.log("care update error", err);
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="text-sm mb-2  pb-2">{care_data?.care_type?.name}</div>

      <div>
        <label className="text-sm flex flex-col">Шийдсэн эсэх</label>
        <select
          className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
          value={care_data?.is_completed?.toString()}
          onChange={(e) => {
            setCareData((prevState: any) => ({
              ...prevState,
              is_completed: e.target.value === "true",
            }));
          }}
        >
          <option value="true">Тийм</option>
          <option value="false">Үгүй</option>
        </select>
      </div>

      <div>
        <label className="text-sm flex flex-col">Шийдсэн төрөл</label>
        {care_data?.is_completed ? (
          <div>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              value={care_data?.detail?.detail_type?.toString()}
              onChange={(e) => {
                setCareData((prevState: any) => ({
                  ...prevState,
                  detail: {
                    ...prevState.detail,
                    detail_type: parseInt(e.target.value),
                    name: care_data?.true_type
                      ? care_data.true_type[e.target.value]?.name
                      : undefined,
                  },
                }));
              }}
            >
              {care_data?.true_type &&
                Object.keys(care_data.true_type).map(
                  (key: string, index: number) => (
                    <option key={index} value={key}>
                      {care_data?.true_type
                        ? care_data.true_type[index + 1]?.name
                        : undefined}
                    </option>
                  )
                )}
            </select>
          </div>
        ) : (
          <div>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              value={care_data?.detail?.detail_type?.toString()}
              onChange={(e) => {
                setCareData((prevState: any) => ({
                  ...prevState,
                  detail: {
                    ...prevState.detail,
                    detail_type: parseInt(e.target.value),
                    name: care_data?.false_type
                      ? care_data.false_type[e.target.value]?.name
                      : undefined,
                  },
                }));
              }}
            >
              {care_data?.false_type &&
                Object.keys(care_data.false_type).map(
                  (key: string, index: number) => (
                    <option key={index} value={key}>
                      {care_data?.false_type
                        ? care_data.false_type[index + 1]?.name
                        : undefined}
                    </option>
                  )
                )}
            </select>
          </div>
        )}
      </div>
      <div>
        <label className="text-sm flex flex-col">Тайлбар</label>
        <textarea
          className="focus:outline-none p-2 border rounded-md focus:border-sky-300 bg-white md:container md:mx-auto"
          value={care_data?.detail?.description}
          onChange={(e) => {
            setCareData((prevState: any) => ({
              ...prevState,
              detail: {
                ...prevState.detail,
                description: e.target.value,
              },
            }));
          }}
        />
      </div>
      <div className="flex justify-end p-2">
        <button
          className="bg-emerald-600 p-2 rounded-md text-white cursor-pointer justify-center"
          onClick={() => {
            handleSubmit({
              is_completed: care_data?.is_completed,
              detail: care_data?.detail,
            });
          }}
        >
          Хадгалах
        </button>
      </div>
    </div>
  );
}
