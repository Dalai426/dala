'use client'
import { useState } from "react";
import * as XLSX from "xlsx";

import { batchService } from "@/services/batch.service";
import { toast } from "react-toastify";

const pos_type_list = [
  {
    label: "Касс оруулаагүй",
    value: 0,
  },
  {
    label: "Ontime",
    value: 1,
  },
  {
    label: "Amar",
    value: 2,
  },
  {
    label: "Оньс",
    value: 3,
  },
  {
    label: "Ритус",
    value: 4,
  },
  {
    label: "Элекромон",
    value: 5,
  },
];

export default function BatchMerchantRegistration(props: any) {
  const [pos_type, setPosType] = useState(0);
  const [pos_number, setPosNumber] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const create_batch = async () => {
    setLoading(true);
    const payload = {
      pos_type: pos_type,
      number: pos_number,
    };

    if (pos_type == 0) {
      toast.error("Кассийн төрлөө оруулна уу :>", {
        hideProgressBar: true,
      });
    } else {
      try {
        const response = await batchService.create_batch(payload);
        toast.success("Амжилттай үүслээ", {
          hideProgressBar: true,
        });
        console.log(response, "batch response");
        setData(response.data);
        loading && setLoading(false);
      } catch (err) {
        toast.error("Алдаа гарлаа", {
          hideProgressBar: true,
        });
        console.log(err, "batch error");
      }
    }
  };

  //save data to excel
  const saveExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Comments");
    XLSX.writeFile(wb, `batch_${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="bg-gray-50 mx-12 my-4 px-4 rounded-xl">
      <div className="py-4 flex flex-col lg:flex-row gap-8 text-gray-500">
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Кассын тоо</label>
          <input
            type="number"
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 dark:bg-white "
            onChange={(e) => {
              setPosNumber(parseInt(e.target.value));
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Касс төрөл</label>
          <select
            className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
            onChange={(e) => {
              setPosType(parseInt(e.target.value));
            }}
          >
            {pos_type_list.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="border border-gray-300 w-32 p-1 h-10 mt-5 rounded-md font-semibold text-gray-500 hover:text-gray-600 hover:shadow-md hover:font-bold"
          onClick={() => {
            // getData();
            create_batch();
          }}
        >
          Үүсгэх
        </button>
        <button
          className="border border-gray-300 w-32 p-1 h-10 mt-5 rounded-md font-semibold text-gray-500 hover:text-gray-600 hover:shadow-md hover:font-bold"
          onClick={() => {
            // getData();
            saveExcel();
          }}
        >
          Татаж авах
        </button>
      </div>

      <div>
        {data.length > 0 && (
          <table className=" text-gray-600  bg-white shadow-md ">
            <thead className="text-gray-800 rounded-sm ">
              <tr className="border-b">
                <th className="text-left p-3 px-5">UA код</th>
                <th className="text-left p-3 px-5">MC код</th>
                <th className="text-left p-3 px-5">otp password</th>
                <th className="text-left p-3 px-5">otp plain</th>
                <th className="text-left p-3 px-5">огноо</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: any) => {
                return (
                  <tr
                    className="border-b hover:bg-orange-100 bg-gray-100"
                    key={index}
                  >
                    <td className="p-3 px-5">{item.ua_code}</td>
                    <td className="p-3 px-5">{item.mc_code}</td>
                    <td className="p-3 px-5">{item.otp_password}</td>
                    <td className="p-3 px-5">{item.otp_plain}</td>
                    <td className="p-3 px-5">{item.created_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
function saveAsExcelFile(excelBuffer: any, fileName: string) {
  throw new Error("Function not implemented.");
}