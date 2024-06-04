import { useState } from "react";
import {
  pos_type_list,
  input_status,
  delivery_types,
  input_delivery_types,
} from "../constants/types";
import { branchService } from "@/services/branch.service";
import { toast } from "react-toastify";

export default function Branch(props: any) {
  const { branch, setDetail } = props;
  const [data, setData] = useState({
    ua_code: branch.ua_code,
    name: branch.name,
    possession_type: branch.possession_type,
    delivery_type: branch.delivery_type,
    pos_type: branch.pos_type,
    status: branch.possession_type,
  });

  const syncData = () => {
    setData({
      ua_code: branch.ua_code,
      name: branch.name,
      delivery_type: branch.delivery_type,
      possession_type: branch.possession_type,
      pos_type: branch.pos_type,
      status: branch.status,
    });
  };

  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        ua_code: data.ua_code,
        name: data.name,
        pos_type: parseInt(data.pos_type),
        delivery_type: parseInt(data.delivery_type),
        possession_type: parseInt(data.possession_type),
        status: parseInt(data.status),
      };

      const response = await branchService.update_branch(branch.id, payload);
      if (response.code == 5100) {
        // setIsShow(false);
        setDetail();
        setIsEdit(false);
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
      console.log("branch update error", err);
    }
  };

  const [is_edit, setIsEdit] = useState(false);
  return (
    <div className="p-4 border rounded-xl m-2">
      <div className="flex flex-row justify-between p-1">
        <div className="font-semibold text-xl">Дэлгүүрийн мэдээлэл</div>
        <div>
          <button
            className="inline-flex items-center justify-center w-10 h-10  text-gray-700 transition-colors duration-150 bg-gray-100 rounded-full focus:shadow-outline hover:bg-gray-200"
            onClick={async () => {
              setIsEdit(!is_edit);
              await syncData();
            }}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button>
        </div>
      </div>
      {!is_edit ? (
        <div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">UA код:</p>
            <p>{branch.ua_code}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Нэр:</p>
            <p>{branch.name}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Кассын төрөл:</p>
            <p>{pos_type_list[branch.pos_type]?.label}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Төлөв:</p>
            <p>
              {branch?.status == 0
                ? " Идэвхгүй"
                : branch?.status == 1
                ? " Идэвхтэй"
                : branch?.status == 2
                ? " Test"
                : branch?.status == 3
                ? " Draft"
                : " Closed"}
            </p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Хаягжилтийн төрөл:</p>
            <p>{delivery_types[branch.delivery_type + 1]?.label}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Үүсгэсэн огноо:</p>
            <p>{new Date(branch.created_at).toLocaleString()}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Үүсгэсэн хэрэглэгч:</p>
            <p>{branch.created_user}</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">UA код:</p>
            <p>{branch.ua_code}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Нэр:</p>
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
            <p className="w-48">Кассын төрөл:</p>
            <select
              className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
              value={data.pos_type}
              onChange={(e) => {
                setData((prevState) => ({
                  ...prevState,
                  pos_type: e.target.value,
                }));
              }}
            >
              {pos_type_list.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {/* <p>{pos_type_list[branch.pos_type]?.label}</p> */}
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-48">Төлөв:</p>
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
            <p className="w-48">Хаягжилтийн төрөл:</p>
            <select
              className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
              value={data.delivery_type}
              onChange={(e) => {
                setData((prevState) => ({
                  ...prevState,
                  delivery_type: e.target.value,
                }));
              }}
            >
              {input_delivery_types.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
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
