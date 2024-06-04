import { input_status, contract_type_list } from "../constants/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { merchantService } from "@/services/merchantDetail.service";

export default function Merchant(props: any) {
  const { merchant, setDetail } = props;
  console.log("merchant asdfadsf", merchant);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    mc_code: merchant.mc_code,
    name: merchant.name,
    registration_number: merchant.registration_number,
    status: merchant.status,
    contract_type: merchant.contract_type,
    contract_detail: merchant.contract_detail,
    owner_detail: {
      name: merchant?.owner_detail?.name,
      register_number: merchant?.owner_detail?.register_number,
      mobile: {
        mobile_1: merchant?.owner_detail?.mobile[0]
          ? merchant?.owner_detail?.mobile[0]
          : "",
        mobile_2: merchant?.owner_detail?.mobile[1]
          ? merchant?.owner_detail?.mobile[1]
          : "",
      },
    },
  });

  const syncData = () => {
    setData({
      mc_code: merchant.mc_code,
      name: merchant.name,
      registration_number: merchant.registration_number,
      status: merchant.status,
      contract_type: merchant.contract_type,
      contract_detail: merchant.contract_detail,
      owner_detail: {
        name: merchant?.owner_detail?.name,
        register_number: merchant?.owner_detail?.register_number,
        mobile: {
          mobile_1: merchant?.owner_detail?.mobile[0]
            ? merchant?.owner_detail?.mobile[0]
            : "",
          mobile_2: merchant?.owner_detail?.mobile[1]
            ? merchant?.owner_detail?.mobile[1]
            : "",
        },
      },
    });
  };

  const handleSubmit = async (data: any) => {
    //need impelement

    try {
      const payload = {
        name: data.name,
        registration_number: data.registration_number,
        status: parseInt(data.status),
        contract_type: parseInt(data.contract_type),
        contract_detail: data.contract_detail,
        owner_info: {
          name: data.owner_detail.name,
          register_number: data.owner_detail.register_number,
          mobile: [
            data.owner_detail.mobile.mobile_1
              ? data.owner_detail.mobile.mobile_1
              : "",
            data.owner_detail.mobile.mobile_2
              ? data.owner_detail.mobile.mobile_2
              : "",
          ],
        },
      };

      const response = await merchantService.update_merchant(
        merchant.mc_code,
        payload
      );
      if (response.code == 5100) {
        // setIsShow(false);
        setDetail();
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
      console.log("merchant update error", err);
    }
  };

  return (
    <div className="p-4 border rounded-xl m-2 col-span-2">
      <div className="flex flex-row  justify-between p-1 ">
        <div className="font-semibold text-xl">Байгууллагын мэдээлэл</div>
        <div className="font-semibold text-xl pl-32">Эзэмшигчийн мэдээлэл</div>
        <div className="flex ">
          <button
            className="inline-flex items-center justify-center w-10 h-10  text-gray-700 transition-colors duration-150 bg-gray-100 rounded-full focus:shadow-outline hover:bg-gray-200"
            onClick={() => {
              setEdit(!edit);
              syncData();
            }}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button>
        </div>
      </div>
      {!edit ? (
        <div className="flex flex-row  justify-between">
          <div>
            <div className="flex flex-row items-center p-1  text-gray-800 border-b-2">
              <p className="w-32">MC код:</p>
              <p>{merchant.mc_code}</p>
            </div>
            <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
              <p className="w-32">Нэр:</p>
              <p>{merchant.name}</p>
            </div>
            <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
              <p className="w-32">Регистр:</p>
              <p>{merchant.registration_number}</p>
            </div>
            <div className="flex flex-row items-center p-1  text-gray-800 border-b-2">
              <p className="w-32">Төлөв:</p>
              {merchant?.status == 0
                ? "Идэвхгүй"
                : merchant?.status == 1
                ? " Идэвхтэй"
                : merchant?.status == 2
                ? " Test"
                : merchant?.status == 3
                ? " Draft"
                : " Closed"}
            </div>
            <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
              <p className="w-32">Гэрээний төрөл:</p>
              <p>{contract_type_list[merchant.contract_type]?.label}</p>
            </div>
            <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
              <p className="w-32">Гэрээний дэлгэрэнгүй:</p>
              <p>
                {merchant.contract_detail === ""
                  ? "одоогоор хоосон..."
                  : merchant.contract_detail}
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
              <p className="w-32">Нэр:</p>
              <p>{merchant?.owner_detail?.name}</p>
            </div>
            <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
              <p className="w-32">Регистр:</p>
              <p>
                {merchant.owner_detail?.register_number
                  ? merchant.owner_detail?.register_number
                  : "хоосон..."}
              </p>
            </div>

            {merchant.owner_detail?.mobile[0] ? (
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Утас 1:</p>
                <p>{merchant.owner_detail?.mobile[0]}</p>
              </div>
            ) : (
              <></>
            )}
            {merchant.owner_detail?.mobile[1] ? (
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Утас 2:</p>
                <p>{merchant.owner_detail?.mobile[1]}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div></div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row  justify-between">
            <div>
              <div className="flex flex-row items-center p-1  text-gray-800 border-b-2">
                <p className="w-32">MC код:</p>
                <p>{merchant.mc_code}</p>
              </div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Нэр:</p>
                <input
                  type="text"
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.name}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Регистр:</p>
                <input
                  type="text"
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.registration_number}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      registration_number: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row items-center p-1  text-gray-800 border-b-2">
                <p className="w-32">Төлөв:</p>
                <select
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.status}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      status: e.target.value,
                    }));
                  }}
                >
                  {input_status.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Гэрээний төрөл:</p>
                <select
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white"
                  value={data.contract_type}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      contract_type: e.target.value,
                    }));
                  }}
                >
                  {contract_type_list.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Гэрээний дэлгэрэнгүй:</p>
                <input
                  type="text"
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.contract_detail}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      contract_detail: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Нэр:</p>
                <input
                  type="text"
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.owner_detail.name}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      owner_detail: {
                        ...prevState.owner_detail,
                        name: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Регистр:</p>
                <input
                  type="text"
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.owner_detail?.register_number}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      owner_detail: {
                        ...prevState.owner_detail,
                        register_number: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Утас 1:</p>
                <input
                  type="text"
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.owner_detail.mobile.mobile_1}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      owner_detail: {
                        ...prevState.owner_detail,
                        mobile: {
                          ...prevState.owner_detail.mobile,
                          mobile_1: e.target.value,
                        },
                      },
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
                <p className="w-32">Утас 2:</p>
                <input
                  type="text"
                  className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  value={data.owner_detail.mobile.mobile_2}
                  onChange={(e) => {
                    setData((prevState) => ({
                      ...prevState,
                      owner_detail: {
                        ...prevState.owner_detail,
                        mobile: {
                          ...prevState.owner_detail.mobile,
                          mobile_2: e.target.value,
                        },
                      },
                    }));
                  }}
                />
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex justify-end p-2">
            <button
              className="bg-emerald-600 p-2 rounded-md text-white cursor-pointer justify-center"
              onClick={() => {
                handleSubmit(data);

                // createPos(posData);
              }}
            >
              Хадгалах
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
