'use client'
import { useState, useEffect } from "react";
import { careService } from "@/services/care.service";
import Pagination from "@/components/pagination/pagination";
import { ExitButton } from "@/components/buttons/exit";
import CareCall from "@/components/care/call";
import CareMove from "@/components/care/move";
import CareDelivery from "@/components/care/delivery";
import CareOther from "@/components/care/other";

import {
  input_care_types,
  pos_type_list_search,
  delivery_types,
} from "@/components/constants/types";

export default function CareNote() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [is_edit, setIsEdit] = useState(false);
  const [care_id, setCareId] = useState("asas");
  const [care_type, setCareType] = useState(0);
  const [searchValues, setSearchValues]: any = useState({
    branch_name: "",
    care_user: "",
    ua_code: "",
    care_date_start: new Date("2020-01-01").toISOString().substring(0, 10),
    care_date_end: new Date("2025-01-01").toISOString().substring(0, 10),
    care_type: 0,
    delivery_type: 100,
  });

  const getData = async (offset: number = 1, limit: number = 10) => {
    try {
      const response = await careService.getCare({
        ...searchValues,
        page: offset,
        limit: limit,
      });
      setData(response.data);
      setPagination({
        limit: limit,
        offset: offset,
        count: response.page_count,
      });
      // console.log("care note get data", response);
    } catch (err) {
      console.log("care note get data error", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-50 mx-12 my-4 px-4 rounded-xl pb-5">
      <div className="py-4 flex grid grid-cols-4 lg:flex-row gap-8 text-gray-500">
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">UA код</label>
          <input
            type="text"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                ua_code: e.target.value,
              }));
            }}
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white"
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Нэр</label>
          <input
            type="text"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                branch_name: e.target.value,
              }));
            }}
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white"
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Pos төрөл</label>
          <select
            className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                pos_type: parseInt(e.target.value),
              }));
            }}
          >
            {pos_type_list_search.map((item: any) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">care user</label>
          <input
            type="text"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                care_user: e.target.value,
              }));
            }}
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white"
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2 pb-2">Эхлэх</label>
          <input
            type="date"
            value={searchValues.care_date_start}
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                care_date_start: e.target.value,
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
            value={searchValues.care_date_end}
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                care_date_end: e.target.value,
              }));
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && getData();
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm -mb-2  pb-2">Төрөл</label>
          <select
            className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                care_type: e.target.value,
              }));
            }}
          >
            {input_care_types.map((item: any) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              );
            })}
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
        <div className=" col-end-5 flex justify-end">
          <button
            className="border border-gray-300 p-2 pt-2 h-10 w-48 rounded-md font-semibold text-gray-500 hover:text-gray-600 hover:shadow-md"
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
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Нэр</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Care Огноо</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Care төрөл</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Тэмдэглэл</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Тэмдэглэл нэмсэн</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Тэмдэглэл өөрчлөх</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item: any) => {
            return (
              <tr className="bg-white hover:bg-gray-100" key={item.id}>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">{item.ua_code}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">{item.branch_name}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">{item.care_date}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">{item.care_type}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">{item.care_user}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                  <div
                    className="text-gray-500 text-center cursor-pointer bg-gray-100 p-1 rounded-md  hover:text-gray-600 hover:font-semibold"
                    onClick={async () => {
                      setIsEdit(true);
                      setCareId(item.id.toString());
                      setCareType(parseInt(item.care_type_number));
                    }}
                  >
                    Тэмдэглэл өөрчлөх
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination getData={getData} pagination={pagination} />
      <div
        className={
          "w-screen h-screen bg-opacity-10 bg-black absolute top-0 left-0 flex" +
          (is_edit ? "" : " hidden")
        }
      >
        <div className="relative bg-white m-auto text-gray-600 rounded-xl w-1/5">
          <div className="absolute top-0 right-0">
            <ExitButton
              onClick={() => {
                setIsEdit(false);
              }}
            />
          </div>
          <div className="p-4 flex flex-col m-4 gap-2">
            <div className="inline text-xl">Care тэмдэглэл</div>

            <div className="">
              {care_type === 1 ? (
                <CareCall care_id={care_id} setEdit={setIsEdit} />
              ) : care_type === 2 ? (
                <CareMove care_id={care_id} setEdit={setIsEdit} />
              ) : care_type === 3 ? (
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
