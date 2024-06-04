'use client'
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import TextInput from "@/components/inputs/text_input";
import SelectionInput from "@/components/inputs/selection_input";
import NumberInput from "@/components/inputs/number_input";
import { merchantService } from "@/services/merchantDetail.service";
import { addressService } from "@/services/address.service";
import { branchService } from "@/services/branch.service";
import { posService } from "@/services/pos.service";
import {
  input_status,
  owner_type_list,
  own_type,
  input_pos_type_list,
  contract_type_list,
} from "@/components/constants/types";



export default function NewMerchantRegistration() {

  const { register, watch, reset, handleSubmit } = useForm();


  const [branch, setBranch] = useState({
    mc_code: "",
    name: "",
    registration_number: "",
    status: 0,
    pos_type: 0,
    possession_type: 0,
    contract_type: 0,
    constrcat_detail: "",
    address: {
      country: 0,
      province: 65,
      district: 4,
      sector: 51,
      address_string: "",
      street: "",
      position: {
        type: "Point",
        coordinates: [],
      },
    },
    mobile: "",
  });
  const [pos, setPos] = useState({
    name: "",
    branch_id: "",
    count: 0,
  });
  const ownerType = watch("owner_type");
  const status = watch("status");
  const [address, setAddress]: any = useState();
  const [countries, setCountries]: any = useState();
  const [provinces, setProvinces]: any = useState();
  const [districts, setDistricts]: any = useState();
  const [sectors, setSectors]: any = useState();
  const getAddress = async () => {
    try {
      const response = await addressService.address_info();
      setAddress(response.data);
      setCountries(response.data.countries);
      setProvinces(
        response.data.provinces.filter(
          (pro: any) => pro.parent == response.data.countries[0].code
        )
      );
      setDistricts(
        response.data.districts.filter(
          (pro: any) => pro.parent == response.data.provinces[0].code
        )
      );
      setSectors(
        response.data.sectors.filter(
          (sec: any) =>
            sec.parent == response.data.districts[0].code &&
            sec.grand_parent == response.data.provinces[0].code
        )
      );
    } catch (err) {
      toast.error("Алдаа гарлаа", {
        hideProgressBar: true,
      });
    }
  };
  useEffect(() => {
    getAddress();
  }, []);

  const countryChange = (e: any) => {
    setProvinces(
      address.provinces.filter((pro: any) => pro.parent == e.target.value)
    );
  };
  const provinceChange = (e: any) => {
    setDistricts(
      address.districts.filter((pro: any) => pro.parent == e.target.value)
    );
    setSectors([]);
  };
  const districChange = (e: any) => {
    setSectors(
      address.sectors.filter(
        (sec: any) =>
          sec.parent == e.target.value &&
          sec.grand_parent == branch.address.province
      )
    );
  };
  const handlePos = async (data: any) => {
    try {
      const response = await posService.batch_create_pos(data);
      if (response.code == 5100) {
        return true;
      } else {
        toast.error("Алдаа гарлаа: " + response.message, {
          hideProgressBar: true,
        });
      }
    } catch (err) {
      toast.error("Алдаа гарлаа", {
        hideProgressBar: true,
      });
    }
    return false;
  };
  const handleBranch = async (data: any) => {
    data.address.position.coordinates = [
      parseFloat(data.address.position.coordinates[0]),
      parseFloat(data.address.position.coordinates[1]),
    ];
    data.address.country = parseInt(data.address.country);
    data.address.province = parseInt(data.address.province);
    data.address.district = parseInt(data.address.district);
    data.address.sector = parseInt(data.address.sector);
    data.status = parseInt(data.status);
    data.pos_type = parseInt(data.pos_type);
    data.status = parseInt(status);
    data.contract_type = parseInt(data.contract_type);

    try {
      const response = await branchService.create_branch(data);
      if (response.code == 5100) {
        if (
          await handlePos({
            branch_id: response.data._id,
            name: input_pos_type_list[parseInt(data.pos_type)].label,
            count: parseInt(pos.count.toString()),
          })
        ) {
          return true;
        }
      } else {
        toast.error("Алдаа гарлаа: " + response.message, {
          hideProgressBar: true,
        });
      }
    } catch (err) {
      toast.error("Алдаа гарлаа", {
        hideProgressBar: true,
      });
    }
    return false;
  };
  const handleForm = async (data: any) => {
    try {
      let newmerchant = {
        status: 1,
        owner_type: 1,
        own_type: 0,
        owner_info: {},
        name: "",
        registration_number: "",
        contract_type: 0,
        contract_detail: "",
      };
      if (data.owner_type != 2) {
        newmerchant.owner_info = {
          name: data.owner_name,
          register_number: data.register_number,
          mobile: [data.owner_mobile],
          own_type: parseInt(data.own_type),
        };
      } else {
        newmerchant.owner_info = {
          name: data.owner_name,
          register_number: data.register_number,
          director: data.director,
          mobile: [data.owner_mobile],
        };
      }
      newmerchant.status = parseInt(data.status);
      newmerchant.owner_type = parseInt(data.owner_type) != 2 ? 1 : 2;
      newmerchant.name = data.name;
      newmerchant.contract_type = parseInt(data.contract_type);
      newmerchant.contract_detail = data.contract_detail;
      newmerchant.registration_number = data.registration_number;
      const response = await merchantService.create_merchant(newmerchant);
      if (response.data) {
        if (
          await handleBranch({
            ...branch,
            mc_code: response.data.mc_code,
            contract_type: parseInt(data.contract_type),
            contract_detail: data.contract_detail,
          })
        ) {
          //clear form
          reset();
          //clear branch
          setBranch({
            mc_code: "",
            name: "",
            registration_number: "",
            status: 0,
            pos_type: 0,
            possession_type: 0,
            contract_type: 0,
            constrcat_detail: "",
            address: {
              country: 0,
              province: 65,
              district: 4,
              sector: 51,
              address_string: "",
              street: "",
              position: {
                type: "Point",
                coordinates: [],
              },
            },
            mobile: "",
          });
          toast.success("Дэлгүүр амжилттай үүслээ", {
            hideProgressBar: true,
          });
        }
      }
    } catch (err) {
      toast.error("Алдаа гарлаа", {
        hideProgressBar: true,
      });
      toast.error("Алдаа гарлаа", {
        hideProgressBar: true,
      });
    }
  };




  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <div className="flex flex-col px-16 py-8 gap-8">
        <div className="flex">
          <div className="font-semibold rounded-xl text-2xl text-gray-600">
            Шинэ дэлгүүр бүртгэх
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="grid-cols-1">
            <TextInput
              register={register}
              name={"name"}
              label={"Байгууллагын нэр"}
              required={true}
            />

            <TextInput
              register={register}
              name={"registration_number"}
              label={"Байгууллагын регистр"}
              required={true}
            />
            <SelectionInput
              register={register}
              name={"contract_type"}
              label={"Гэрээ хийсэн байдал"}
              options={contract_type_list}
              required={true}
            />

            <TextInput
              register={register}
              name={"contract_detail"}
              label={"Гэрээний тайлбар"}
              required={true}
            />

            <SelectionInput
              register={register}
              name={"status"}
              label={"Төлөв"}
              options={input_status}
              required={true}
            />
            <SelectionInput
              register={register}
              name={"owner_type"}
              label={"Эзэмшигчийн төрөл"}
              options={owner_type_list}
              required={true}
            />
            {ownerType != 2 ? (
              <div>
                <TextInput
                  register={register}
                  name={"owner_name"}
                  label={"Эзэмшигчийн нэр"}
                  required={true}
                />
                <SelectionInput
                  register={register}
                  name={"own_type"}
                  label={"Эзэмшлийн төрөл"}
                  options={own_type}
                  required={true}
                />
                <TextInput
                  register={register}
                  name={"register_number"}
                  label={"Эзэмшигчийн регистр"}
                  required={true}
                />
                <NumberInput
                  register={register}
                  name={"owner_mobile"}
                  label={"Эзэмшигчийн дугаар"}
                  required={true}
                />
              </div>
            ) : (
              <div>
                <TextInput
                  register={register}
                  name={"owner_name"}
                  label={"Эзэмшигч байгууллагын нэр"}
                  required={true}
                />
                <TextInput
                  register={register}
                  name={"register_number"}
                  label={"Эзэмшигч байгууллагын регистр"}
                  required={true}
                />
                <TextInput
                  register={register}
                  name={"director"}
                  label={"Захирлын нэр"}
                  required={true}
                />
                <NumberInput
                  register={register}
                  name={"owner_mobile"}
                  label={"Захирлын дугаар"}
                  required={true}
                />
              </div>
            )}
            <div className="justify-start hidden sm:flex">
              <input
                name="submit"
                type="submit"
                className="p-2 rounded-md border-2 text-gray-600 font-semibold cursor-pointer w-32 mt-4  hover:text-emerald-600 hover:shadow-md"
                value={"Хадгалах"}
              ></input>
            </div>
          </div>
          <div className="flex flex-col text-gray-600 grid-cols-1 gap-4 text-sm">

            <div className="flex flex-row items-center justify-between flex-wrap gap-4">
              <p>Дэлгүүрийн нэр</p>
              <input
                type="text"
                value={branch.name}
                onChange={(e) => {
                  setBranch((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
                required={true}
                className="min-w-32 focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
              />
            </div>
            <div className="flex flex-row gap-4 items-center justify-between flex-wrap">
              <p>Дэлгүүрийн касс систем</p>
              <select
                className="border min-w-32 border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                onChange={(e) => {
                  setBranch((prevState: any) => ({
                    ...prevState,
                    pos_type: e.target.value,
                  }));
                }}
              >
                {input_pos_type_list?.map((option: any, index: number) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center p-1 justify-between flex-wrap gap-4">
              <p>Кассийн тоо</p>
              <input
                type="number"
                className="border min-w-32 border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                onChange={(e) => {
                  setPos((prevState: any) => ({
                    ...prevState,
                    count: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="border border-gray-300 p-4 mt-2 rounded-xl">

              <div className="flex flex-row items-center w-fit ml-2 pb-2 pl-1 pr-10 divide-y border-b-2">
                <p>Дэлгүүрийн хаяг</p>
              </div>

              <div className="flex flex-row items-center justify-between flex-wrap gap-4 p-1 ml-2 mt-2">
                <p>Улс</p>
                <select
                  className="min-w-32 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    countryChange(e);
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        country: e.target.value,
                      },
                    }));
                  }}
                >
                  {countries?.map((option: any, index: number) => (
                    <option key={index} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row items-center justify-between flex-wrap gap-4 p-1 ml-2">
                <p>Хот/Аймаг</p>
                <select
                  className="min-w-32 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    provinceChange(e);
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        province: e.target.value,
                      },
                    }));
                  }}
                >
                  {provinces?.map((option: any, index: number) => (
                    <option key={index} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row items-center justify-between flex-wrap gap-4 p-1 ml-2">
                <p>Сум/Дүүрэг</p>
                <select
                  className="min-w-32 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    districChange(e);
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        district: e.target.value,
                      },
                    }));
                  }}
                >
                  {districts?.map((option: any, index: number) => (
                    <option key={index} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row items-center justify-between flex-wrap gap-4 p-1 ml-2">
                <p>Баг/Хороо</p>
                <select
                  className="min-w-32 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        sector: e.target.value,
                      },
                    }));
                  }}
                >
                  {sectors?.map((option: any, index: number) => (
                    <option key={index} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row items-center justify-between flex-wrap gap-4 p-1 ml-2">
                <p>Гудамж</p>
                <input
                  type="text"
                  className="border min-w-32 border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        street: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row items-center justify-between flex-wrap gap-4 p-1 ml-2">
                <p>Дэлгэрэнгүй хаяг</p>
                <input
                  type="text"
                  className="border min-w-32 border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        address_string: e.target.value,
                      },
                    }));
                  }}
                />
              </div>

              <div className="flex flex-row items-center justify-between flex-wrap gap-4 p-1 ml-2">
                <p>Уртраг</p>
                <input
                  step="0.01"
                  type="number"
                  className="border min-w-32 border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        position: {
                          ...prevState.address.position,
                          coordinates: [
                            e.target.value,
                            branch.address.position.coordinates[0],
                          ],
                        },
                      },
                    }));
                  }}
                />
              </div>
              <div className="flex flex-row items-center justify-between gap-4 flex-wrap p-1 ml-2">
                <p>Өргөрөг</p>
                <input
                  type="number"
                  step="0.01"
                  className="min-w-32 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                  onChange={(e) => {
                    setBranch((prevState: any) => ({
                      ...prevState,
                      address: {
                        ...prevState.address,
                        position: {
                          ...prevState.address.position,
                          coordinates: [
                            branch.address.position.coordinates[1],
                            e.target.value,
                          ],
                        },
                      },
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          <div className="justify-start flex sm:hidden">
            <input
              name="submit"
              type="submit"
              className="p-2 rounded-md border-2 text-gray-600 font-semibold cursor-pointer w-32 mt-4  hover:text-emerald-600 hover:shadow-md"
              value={"Хадгалах"}
            ></input>
          </div>
        </div>
      </div>
    </form>
  );
}


