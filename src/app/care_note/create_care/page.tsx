'use client'
import { useState, useEffect } from "react";
import { ExitButton } from "@/components/buttons/exit";
import Pagination from "@/components/pagination/pagination";
import { careService } from "@/services/care.service";
import CareCall from "@/components/care/call";
import CareMove from "@/components/care/move";
import CareDelivery from "@/components/care/delivery";
import CareOther from "@/components/care/other";
import {
  status_list,
  care_types,
  pos_type_list,
  delivery_types,
} from "@/components/constants/types";
import { toast } from "react-toastify";
import { branchService } from "@/services/branch.service";
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

export default function MerchantDetails(props: any) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [branch_address, setBranchAddres]: any = useState({});
  const [merchantDetail, setMerchanDetail]: any = useState({});
  const [is_show, setIsShow]: any = useState(false);
  const [status, setStatus] = useState(5);
  const [care_type, setCareType] = useState(1);
  const [branch_id, setBranchId] = useState(0);
  const [care_id, setCareId] = useState("");
  const [is_edit, setIsEdit] = useState(false);
  const [care_data, setCareData] = useState<CareData | null>(null);
  const [searchValues, setSearchValues]: any = useState({
    ua_code: "",
    name: "",
    registration_number: "",
    delivery_type: 100,
    start_date: new Date("2020-01-01").toISOString().substring(0, 10),
    end_date: new Date("2025-01-01").toISOString().substring(0, 10),
    pos_type: 0,
    status: 100,
  });
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async (offset: number = 1, limit: number = 10) => {
    try {
      const response = await branchService.branch_list(
        limit,
        offset,
        searchValues.ua_code,
        searchValues.name,
        searchValues.registration_number,
        parseInt(searchValues.status),
        searchValues.start_date,
        searchValues.end_date,
        parseInt(searchValues.pos_type),
        parseInt(searchValues.delivery_type)
      );
      setData(response.data);
      setPagination({
        limit: limit,
        offset: offset,
        count: response.page_count,
      });
    } catch (err) {
      console.log("merchant details get data error", err);
    }
  };
  const createCare = async () => {
    try {
      console.log(branch_id, care_type);
      const payload = {
        branch_id: branch_id,
        care_type: care_type,
      };
      const response = await careService.createCare(payload);

      if (response.code != 5100) {
        setCareId(response.data._id.toString());
        const data = await careService.careDetail(response.data._id.toString());
        setCareData(data.data);
        setIsShow(false);
        setIsEdit(true);
      }
    } catch (err) {
    }
  };

  const handleSubmit = async (data: any, care_id: string) => {
    try {
      const payload = {
        care_id: care_id,
        data: data,
      };
      console.log("care update", payload);
      const response = await careService.updateCare(payload);
      console.log("care update", response);
      if (response.code == 5100) {
        setIsEdit(!is_edit);
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
    }
    // const
  };

  return (
    <div className="bg-gray-50 mx-12 my-4 px-4 rounded-xl">
      <div className="py-4 grid grid-cols-4 lg:flex-row gap-8 text-gray-500">
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">UA код</label>
          <input
            type="text"
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                ua_code: e.target.value,
              }));
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Нэр</label>
          <input
            type="text"
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 bg-white"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Регистр</label>
          <input
            type="text"
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 bg-white"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                registration_number: e.target.value,
              }));
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Төлөв</label>
          {/* // dropdown */}
          <select
            className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                status: e.target.value,
              }));
            }}
          >
            {status_list?.map((option: any, index: number) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2 pb-2">Эхлэх</label>
          <input
            type="date"
            value={searchValues.start_date}
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                start_date: e.target.value,
              }));
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2 pb-2">Дуусах</label>
          <input
            type="date"
            value={searchValues.end_date}
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                end_date: e.target.value,
              }));
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2 pb-2">Касс төрөл</label>
          {/* // dropdown */}
          <select
            // {...register(name, { required: true })}
            className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                pos_type: e.target.value,
              }));
            }}
          >
            {pos_type_list?.map((option: any, index: number) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2 pb-2">Хаягжилтийн төрөл</label>
          <select
            className="p-2.5 rounded-md bg-white border border-gray-300 focus:outline-none dark:bg-white dark:text-black"
            // value={-1}
            onChange={(e) =>
              setSearchValues({
                ...searchValues,
                delivery_type: parseInt(e.target.value),
              })
            }
          >
            {delivery_types.map((item, ind: number) => (
              <option value={item.value} key={ind}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-4 flex justify-end">
          <button
            className="border border-gray-300 p-2 rounded-md font-semibold text-gray-500 w-48 hover:text-gray-600 hover:shadow-md"
            onClick={() => {
              getData();
            }}
          >
            хайх
          </button>
        </div>
      </div>
      <table className="min-w-full text-gray-600 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr className="border-b">
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">UA код</th>
            <th scope="col" className="px-6 text-left text-xs font-medium uppercase tracking-wider">Дэлгүүрийн нэр</th>
            <th scope="col" className="px-6 text-left text-xs font-medium uppercase tracking-wider">Касс төрөл</th>
            <th scope="col" className="px-6 text-left text-xs font-medium uppercase tracking-wider">Төлөв</th>
            <th scope="col" className="px-6 text-left text-xs font-medium uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((branch: any, ind: number) => (
            <tr key={ind} className="bg-white hover:bg-gray-100">
              <td className="p-2 py-4 whitespace-nowrap text-sm text-gray-500">{branch.ua_code}</td>
              <td className="px-16 py-4 whitespace-nowrap text-sm text-gray-500">{branch.name}</td>
              <td className="px-16 py-4 whitespace-nowrap text-sm text-gray-500">
                {pos_type_list.find((item) => item.value === branch.pos_type)
                  ?.label ?? "Default label"}
              </td>
              <td className="px-16">
                {branch?.status == 0
                  ? " Идэвхгүй"
                  : branch?.status == 1
                  ? " Идэвхтэй"
                  : branch?.status == 2
                  ? " Test"
                  : branch?.status == 3
                  ? " Draft"
                  : " Closed"}
              </td>
              <td className="px-16">
                <div
                  className="text-gray-500 text-center cursor-pointer bg-gray-100 p-1 rounded-md hover:text-gray-600 hover:font-semibold"
                  onClick={() => {
                    setBranchId(branch.id);
                    is_show ? setIsShow(false) : setIsShow(true);
                    // getDetail(branch.id);
                  }}
                >
                  Care тэмдэглэл үүсгэх
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination getData={getData} pagination={pagination} />
      <div
        className={
          "w-screen h-screen bg-opacity-10 bg-black absolute top-0 left-0 flex flex-row " +
          (is_show ? "" : "hidden")
        }
      >
        <div className="relative p-w/5 bg-white m-auto text-gray-600 rounded-xl">
          <div className="absolute top-0 right-0">
            <ExitButton
              onClick={() => {
                setIsShow(false);
              }}
            />
          </div>
          <div className="p-4 flex flex-col m-4 gap-2 ">
            <div className="text-xl">Care тэмдэглэл үүсгэх</div>
            <div className="flex flex-col">
              <label className="text-sm mb-2 ">Care төрөл</label>
              <select
                className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                onChange={(e) => {
                  setCareType(parseInt(e.target.value));
                }}
              >
                {care_types?.map((option: any, index: number) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>

              <button
                className="border border-gray-300 p-2 h-10 mt-5 rounded-md font-semibold text-gray-500  hover:text-gray-600 hover:shadow-md "
                onClick={() => {
                  createCare();
                }}
              >
                үүсгэх
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "w-screen h-screen bg-opacity-10 bg-black absolute top-0 left-0 flex" +
          (is_edit ? "" : " hidden")
        }
      >
        <div className="relative bg-white m-auto text-gray-600 rounded-xl">
          <div className="absolute top-0 right-0">
            <ExitButton
              onClick={() => {
                setIsEdit(false);
              }}
            />
          </div>
          <div className="p-4 flex flex-col m-4 gap-2">
            <div className="inline">Care тэмдэглэл</div>

            <div className="">
              {care_data?.care_type?.type === 1 ? (
                <CareCall care_id={care_id} setEdit={setIsEdit} />
              ) : care_data?.care_type?.type === 2 ? (
                <CareMove care_id={care_id} setEdit={setIsEdit} />
              ) : care_data?.care_type?.type === 3 ? (
                <CareDelivery care_id={care_id} setEdit={setIsEdit} />
              ) : (
                <CareOther care_id={care_id} setEdit={setIsEdit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
