import { useState, useEffect } from "react";
import { status_list, pos_type_list } from "../constants/types";
import * as XLSX from "xlsx";
import { branchService } from "@/services/branch.service";
import { downloadService } from "@/services/download.service";

export default function BranchList(props: {
  pagination: any;
  setPagination: any;
  setData: any;
  isSave: false;
}) {
  const { pagination, setPagination, setData, isSave } = props;
  const [searchValues, setSearchValues]: any = useState({
    ua_code: "",
    name: "",
    registration_number: "",
    start_date: "",
    end_date: "",
    pos_type: 0,
    status: 100,
    delivery_type: 100,
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
        count: response.length,
      });
      console.log("merchant details get data", response);
    } catch (err) {
      console.log("merchant details get data error", err);
    }
  };

  const saveExcel = async () => {
    const response = await downloadService.branch_list(
      searchValues.ua_code,
      searchValues.name,
      searchValues.registration_number,
      parseInt(searchValues.status),
      searchValues.start_date,
      searchValues.end_date,
      parseInt(searchValues.pos_type),
      parseInt(searchValues.delivery_type)
    );
    const data = response.data;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Comments");
    XLSX.writeFile(wb, `branch_data_${new Date().getTime()}.xlsx`);
  };
  return (
    <div className="py-4 grid grid-cols-4  lg:flex-row gap-8 text-gray-500">
      <div className="flex flex-col">
        <label className="text-sm -mb-2 pb-2">UA код</label>
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
        <label className="text-sm -mb-2 pb-2">Нэр</label>
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
        <label className="text-sm -mb-2 pb-2">Регистр</label>
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
        <label className="text-sm -mb-2 pb-2">Төлөв</label>
        {/* // dropdown */}
        <select
          // {...register(name, { required: true })}
          className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
          className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
      <div>
        <button
          className="border border-gray-300 p-2 h-10 mt-5 rounded-md font-semibold text-gray-500 "
          onClick={() => {
            getData();
          }}
        >
          хайх
        </button>
        {isSave && (
          <button
            className="border border-gray-300 p-1 h-10 mt-5 ml-10 rounded-md font-semibold text-gray-500 col-end-5"
            onClick={async () => {
              saveExcel();
            }}
          >
            татах
          </button>
        )}
      </div>
    </div>
  );
}
