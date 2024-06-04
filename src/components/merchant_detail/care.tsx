import { useState } from "react";
import {
  pos_type_list,
  input_status,
  delivery_types,
  input_delivery_types,
  care_types,
} from "../constants/types";
import { careService } from "@/services/care.service";
import { toast } from "react-toastify";

export default function Care(props: any) {
  const { care, branch } = props;
  return (
    <div className="p-4 border rounded-xl m-2">
      <div className="flex flex-col justify-between p-1">
        <div className="font-semibold text-xl">Care call мэдээлэл</div>
        <div className="h-60 overflow-scroll mt-2">
          {care &&
            care?.map((item: any, index: number) => {
              return (
                <div key={index} className="justify-between p-1 border-b-2">
                  <div className="flex flex-row items-center">
                    <p className="w-32">Care №:</p>
                    <p>{index + 1}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="w-32">Care төрөл:</p>
                    <p>{care_types[item.care_type - 1].name}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="w-32">Care үүсгэгч:</p>
                    <p>{item.care_user}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="w-32">Care үүсэгсэн огноо:</p>
                    <p>{new Date(item.created_at).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
