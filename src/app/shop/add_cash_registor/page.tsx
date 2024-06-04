'use client'
//inputs
import { ExitButton } from "@/components/buttons/exit";
import Pagination from "@/components/pagination/pagination";
import { pos_type_list, status_list } from "@/components/constants/types";
import { branchService } from "@/services/branch.service";
import { posService } from "@/services/pos.service";
//hooks
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
//services
import { toast } from "react-toastify";
export default function AddCashRegistor() {

  const [is_show, setIsShow]: any = useState(false);
  const [data, setData]: any = useState([]);
  const [pagination, setPagination] = useState({});
  const [posData, setPosData]: any = useState({
    name: "",
    branch_id: "",
  });
  const [searchValues, setSearchValues]: any = useState({
    ua_code: "",
    name: "",
    registration_number: "",
    delivery_type: 100,
    status: 100,
    start_date: new Date("2020-01-01T00:00:00.000+0000")
      .toISOString()
      .substring(0, 10),
    end_date: new Date("2025-01-01T00:00:00.000+0000")
      .toISOString()
      .substring(0, 10),
    pos_type: 0,
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async (offset: number = 10, limit: number = 1) => {
    try {
      const response = await branchService.branch_list(
        offset,
        limit,
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
      console.log("merchant details get data", response);
    } catch (err) {
      console.log("merchant details get data error", err);
    }
  };

  const createPos = async (data: any) => {
    try {
      console.log("pos create", data);
      const response = await posService.create_pos(data);
      console.log("pos create", response);
      if (response.data) {
        setIsShow(false);
        toast.success("Касс амжилттай үүслээ", {
          hideProgressBar: true,
        });
      } else {
        toast.error("Алдаа гарлаа " + response?.message, {
          hideProgressBar: true,
        });
      }
    } catch (err) {
      console.log("pos create error", err);
      toast.error("Алдаа гарлаа " + err, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="bg-gray-50 mx-12 my-4 px-4 rounded-xl">
      <div className="py-4 grid grid-cols-4 lg:flex-row gap-8 text-gray-500">
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
            // {...register(name, { required: true })}
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
          <label className="text-sm -mb-2 pb-2">Кассын төрөл</label>
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
        <button
          className="border border-gray-300 p-2 h-10 mt-5 rounded-md w-48 font-semibold text-gray-500 hover:text-gray-600 hover:shadow-md"
          onClick={() => {
            getData();
          }}
        >
          хайх
        </button>
      </div>
      <table className="min-w-full text-gray-600 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr className="border-b">
            <th className="p-4 text-left text-xs font-medium uppercase tracking-wider">UA код</th>
            <th className="px-16 text-left text-xs font-medium uppercase tracking-wider">Дэлгүүрийн нэр</th>
            <th className="px-16 text-left text-xs font-medium uppercase tracking-wider">Касс төрөл</th>
            <th className="px-16 text-left text-xs font-medium uppercase tracking-wider">Төлөв</th>
            <th className="px-16 text-left text-xs font-medium uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((branch: any, ind: number) => (
            <tr key={ind} className="bg-white hover:bg-gray-100">
              <td className="p-2 whitespace-nowrap text-sm text-gray-500">{branch.ua_code}</td>
              <td className="px-16 whitespace-nowrap text-sm text-gray-500">{branch.name}</td>
              <td className="px-16 whitespace-nowrap text-sm text-gray-500">{branch.pos_type}</td>
              <td className="px-16 whitespace-nowrap text-sm text-gray-500">
                <div
                  className={
                    (branch.status === 3
                      ? "bg-emerald-600 text-gray-200"
                      : branch.status === 1
                      ? "bg-green-200 text-gray-500"
                      : branch.status === 0
                      ? "bg-red-200 text-white"
                      : branch.status === 2
                      ? "bg-yellow-300 text-gray-100"
                      : branch.status) + " rounded-md p-1 text-center"
                  }
                >
                  {branch?.status == 0
                    ? " Идэвхгүй"
                    : branch?.status == 1
                    ? " Идэвхтэй"
                    : branch?.status == 2
                    ? " Test"
                    : branch?.status == 3
                    ? " Draft"
                    : " Closed"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <div
                  className="text-gray-500 cursor-pointer bg-gray-100 p-1 rounded-md hover:text-gray-600 hover:font-semibold w-32 text-center"
                  onClick={async () => {
                    // getDetail(branch.id);
                    await setPosData((prevState: any) => ({
                      ...prevState,
                      branch_id: branch.id,
                    }));
                    is_show ? setIsShow(false) : setIsShow(true);
                  }}
                >
                  Касс нэмэх
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

          <div className="bg-white mx-auto mt-8 p-4 rounded-md ">
            <div className="w-full">
              <div className="text-xl font-semibold w-full ">Касс үүсгэх</div>
              <div>
                <div>
                  <div className="flex flex-row items-center p-1">
                    <p className="w-32">Салбарын нэр:</p>
                    <input
                      type="text"
                      value={posData.name}
                      onChange={(e) => {
                        setPosData((prevState: any) => ({
                          ...prevState,
                          name: e.target.value,
                        }));
                      }}
                      required={true}
                      className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                    />
                  </div>
                  <div className=" flex p-1 justify-end mt-4">
                    <button
                      className="p-2 rounded-md border font-semibold text-gray-600 cursor-pointer justify-center hover:text-white hover:bg-emerald-600 "
                      onClick={() => {
                        // handleSubmit(branch);
                        if (posData.name == "") {
                          toast.error("Салбарын нэрийг оруулна уу", {
                            hideProgressBar: true,
                          });
                          return;
                        }
                        createPos(posData);
                      }}
                    >
                      Хадгалах
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
