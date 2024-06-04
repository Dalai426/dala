import { useState, useEffect } from "react";
import { merchantService } from "@/services/merchantDetail.service";
import Pagination from "../pagination/pagination";
import { status_list } from "@/components/constants/types";
export default function MerchantList(props: any) {
  const { setIsShow, setInfo, text } = props;
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchValues, setSearchValues]: any = useState({
    status: 100,
    mc_code: "",
    name: "",
    registration_number: "",
  });
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async (offset: number = 1, limit: number = 15) => {
    try {
      // console.log(offset, limit);
      const response = await merchantService.merchant_info(
        offset,
        limit,
        searchValues.mc_code,
        searchValues.name,
        searchValues.registration_number,
        parseInt(searchValues.status)
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
  return (
    <div className="bg-gray-50 mx-12 my-4 px-4 rounded-xl">
      <div className="py-4 flex flex-wrap flex-row gap-8 text-gray-500 ">
        <div className="flex flex-col">
          <label className="text-sm -mb-2 pb-2">MC код</label>
          <input
            type="text"
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 dark:bg-white "
            onChange={(e) => {
              setSearchValues((prevState: any) => ({
                ...prevState,
                mc_code: e.target.value,
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
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 dark:bg-white "
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
            className="focus:outline-none p-2 border rounded-md focus:border-sky-300 dark:bg-white "
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
          {/* dropdown */}
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
        <button
          className="border border-gray-300 p-2 h-10 mt-5 w-32 rounded-md font-semibold text-gray-500 hover:text-gray-600 hover:shadow-md"
          onClick={() => {
            getData();
          }}
        >
          хайх
        </button>
      </div>
      <table className="min-w-full text-gray-600 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr className="border-b ">
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">MC код</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Дэлгүүрийн нэр</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">РД</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">Төлөв</th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((merchant: any, ind: number) => (
            <tr key={ind} className="bg-white border-b hover:border-gray-500 ">
              <td className="p-2">{merchant.mc_code}</td>
              <td className="px-16">{merchant.name}</td>
              <td className="px-16">{merchant.registration_number}</td>
              <td className="px-16">
                <div
                  className={
                    (merchant.status === 3
                      ? "bg-emerald-600 text-gray-200"
                      : merchant.status === 1
                        ? "bg-green-200 text-gray-500"
                        : merchant.status === 0
                          ? "bg-red-200 text-white"
                          : merchant.status === 2
                            ? "bg-yellow-300 text-gray-100"
                            : merchant.status) + " rounded-md p-1 text-center"
                  }
                >
                  {merchant.status === 3
                    ? "Draft"
                    : merchant.status === 1
                      ? "Идэвхтэй"
                      : merchant.status === 0
                        ? "Идэвхгүй"
                        : merchant.status === 2
                          ? "Тест"
                          : merchant.status}
                </div>
              </td>
              <td className="px-16">
                <div
                  className="text-gray-500 cursor-pointer bg-gray-100 p-1 rounded-md hover:text-gray-600 hover:font-semibold w-32 text-center"
                  onClick={() => {
                    setIsShow(true);
                    setInfo({
                      mc_code: merchant.mc_code,
                      status: merchant.status,
                    });
                  }}
                >
                  {text}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination getData={getData} pagination={pagination} />
    </div>
  );
}
