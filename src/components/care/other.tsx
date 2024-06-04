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
  delivery_start?: string;
  delivery_end?: string;
  delivery_type?: number;
  delivery_types?: TTYPE;
  delivery_return_types?: TTYPE;
  true_type?: TTYPE;
  false_type?: TTYPE;
}

export default function CareOther(props: any) {
  const { care_id, setEdit } = props;
  const [care_data, setCareData] = useState<CareData | null>(null);
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
              care_type: care_data?.care_type?.type,
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
