'use client'
import { useState, useEffect } from "react";
import { branchService } from "@/services/branch.service";
import { downloadService } from "@/services/download.service";
import Pagination from "@/components/pagination/pagination";
import Branch from "@/components/merchant_detail/branch";
import Merchant from "@/components/merchant_detail/merchant";
import Address from "@/components/merchant_detail/address";
import Care from "@/components/merchant_detail/care";
import Pos from "@/components/merchant_detail/pos";
import {
    status_list,
    pos_type_list,
    delivery_types,
} from "@/components/constants/types";
import * as XLSX from "xlsx";
import { ExitButton } from "@/components/buttons/exit";

export default function MerchantDetails(props: any) {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [branchaAddress, setBranchAddres]: any = useState({});
    const [merchantDetail, setMerchanDetail]: any = useState({});
    const [branchDetail, setBranchDetail]: any = useState({});
    const [CareDetail, setCareDetail]: any = useState([]);
    const [posList, setPosList]: any = useState([]);
    const [is_show, setIsShow]: any = useState(false);
    const [searchValues, setSearchValues]: any = useState({
        ua_code: "",
        name: "",
        delivery_type: 100,
        registration_number: "",
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
            // setBranch (response.data[0])
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
    const getDetail = async (branch_id: any) => {
        try {
            setIsShow(true);
            const branch_detail = await branchService.branch_detail(branch_id);
            await setBranchAddres(branch_detail.address);
            await setBranchDetail(branch_detail.branch);
            await setMerchanDetail(branch_detail.merchant);
            await setPosList(branch_detail.pos_list);
            await setCareDetail(branch_detail.care);
        } catch (err) {
            console.log("merchant detail error", err);
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
        <div className="bg-gray-50 mx-4 my-4 px-4 rounded-xl">
            <div className="bg-gray-50 mx-4 my-4 px-4 rounded-xl">
                <div className="py-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-gray-500">
                    <div className="flex flex-col">
                        <label className="text-sm -mb-2 pb-2">UA код</label>
                        <input
                            type="text"
                            className="focus:outline-none p-2 rounded-md focus:border focus:border-sky-300 z-0 bg-white"
                            onChange={(e) => {
                                setSearchValues((prevState:any) => ({
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
                            className="focus:outline-none p-2 rounded-md focus:border focus:border-sky-300 bg-white"
                            onChange={(e) => {
                                setSearchValues((prevState:any) => ({
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
                            className="focus:outline-none p-2 focus:border rounded-md focus:border-sky-300 bg-white"
                            onChange={(e) => {
                                setSearchValues((prevState:any) => ({
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
                        <select
                            className="focus:border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                            onChange={(e) => {
                                setSearchValues((prevState:any) => ({
                                    ...prevState,
                                    status: e.target.value,
                                }));
                            }}
                        >
                            {status_list?.map((option, index) => (
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
                            className="focus:outline-none p-2 focus:border rounded-md focus:border-sky-300"
                            onChange={(e) => {
                                setSearchValues((prevState:any) => ({
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
                            className="focus:outline-none p-2 focus:border rounded-md focus:border-sky-300"
                            onChange={(e) => {
                                setSearchValues((prevState:any) => ({
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
                        <select
                            className="focus:border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                            onChange={(e) => {
                                setSearchValues((prevState:any) => ({
                                    ...prevState,
                                    pos_type: e.target.value,
                                }));
                            }}
                        >
                            {pos_type_list?.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm -mb-2 pb-2">Хаягжилтийн төрөл</label>
                        <select
                            className="p-2.5 rounded-md bg-white"
                            onChange={(e) =>
                                setSearchValues({
                                    ...searchValues,
                                    delivery_type: parseInt(e.target.value),
                                })
                            }
                        >
                            {delivery_types.map((item, ind) => (
                                <option value={item.value} key={ind}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col md:col-span-2 lg:col-span-4 justify-end">
                        <div className="flex flex-row gap-4 justify-end">
                            <button
                                className="border border-gray-300 p-2 min-w-48 rounded-md font-semibold text-gray-500 hover:text-gray-600 hover:shadow-md"
                                onClick={() => {
                                    getData();
                                }}
                            >
                                хайх
                            </button>
                            <button
                                className="border border-gray-300 p-2 min-w-48 rounded-md font-semibold text-gray-500 hover:text-gray-600 hover:shadow-md"
                                onClick={async () => {
                                    saveExcel();
                                }}
                            >
                                татах
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <table className="min-w-full text-gray-600 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <thead className="bg-gray-800 text-white">
                    <tr className="border-b">
                        <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">№</th>
                        <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">UA код</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Дэлгүүрийн нэр</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Касс төрөл</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Төлөв</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((branch: any, ind: number) => (
                        <tr key={ind} className="bg-white hover:bg-gray-100">
                            <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">{branch.index}</td>
                            <td className="p-4 whitespace-nowrap text-sm text-gray-500">{branch.ua_code}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pos_type_list[branch.pos_type]?.label}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                                    className="bg-gray-100 p-1 rounded-md cursor-pointer hover:text-gray-600 hover:font-semibold"
                                    onClick={() => {
                                        getDetail(branch.id);
                                    }}
                                >
                                    Дэлгэрэнгүй
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
                    <div className="m-8 grid grid-cols-3 gap-3 ">
                        <Branch
                            branch={branchDetail}
                            setIsShow={setIsShow}
                            setDetail={() => getDetail(branchDetail.id)}
                        />
                        <Merchant
                            merchant={merchantDetail}
                            setDetail={() => getDetail(branchDetail.id)}
                        />
                        <Address
                            address={branchaAddress}
                            branch_id={branchDetail.id}
                            setDetail={() => getDetail(branchDetail.id)}
                        />
                        <Pos
                            pos={posList}
                            branch={branchDetail}
                            setDetail={() => getDetail(branchDetail.id)}
                        />
                        <Care care={CareDetail} branch={branchDetail} />
                    </div>
                </div>
            </div>
        </div>
    );
}
