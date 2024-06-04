'use client'
//inputs
import MerchantList from "@/components/lists/merchant_list";
import { ExitButton } from "@/components/buttons/exit";
import { contract_type_list } from "@/components/constants/types";
//hooks
import { useEffect, useState } from "react";

//services
import { addressService } from "@/services/address.service";
import { branchService } from "@/services/branch.service";
import { toast } from "react-toastify";

//constants
import {
  pos_type_list,
  input_pos_type_list,
  input_status,
} from "@/components/constants/types";

export default function AddSector() {
  const [branch, setBranch] = useState({
    mc_code: "",
    name: "",
    registration_number: "",
    status: 0,
    pos_type: 0,
    possession_type: 0,
    contract_type: 0,
    contract_detail: "",
    mobile: "",
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
  });
  const [address, setAddress]: any = useState();
  const [countries, setCountries]: any = useState();
  const [provinces, setProvinces]: any = useState();
  const [districts, setDistricts]: any = useState();
  const [sectors, setSectors]: any = useState();
  const [is_show, setIsShow]: any = useState(false);
  const [merchant_info, setMerchatInfo]: any = useState();

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

  const handleSubmit = async (data: any) => {
    data.address.position.coordinates = [
      parseFloat(data.address.position.coordinates[0]),
      parseFloat(data.address.position.coordinates[1]),
    ];
    data.address.country = parseInt(data.address.country);
    data.address.province = parseInt(data.address.province);
    data.address.district = parseInt(data.address.district);
    data.address.sector = parseInt(data.address.sector);
    data.status = parseInt(data.status);
    data.contract_type = parseInt(data.contract_type);
    data.pos_type = parseInt(data.pos_type);
    data.mc_code = merchant_info?.mc_code;
    data.status = merchant_info?.status;

    try {
      const response = await branchService.create_branch(data);

      if (response.code == 5100) {
        toast.success("Амжилттай үүслээ", {
          hideProgressBar: true,
        });
        setIsShow(false);
      } else {
        toast.error("Алдаа гарлаа: " + response.message, {
          hideProgressBar: true,
        });
      }
      // setIsShow(false);
    } catch (err) {

      toast.error("Алдаа гарлаа", {
        hideProgressBar: true,
      });
    }
  };
  return (
    <div>
      <MerchantList
        text="Салбар нэмэх"
        is_show={is_show}
        setIsShow={setIsShow}
        setInfo={setMerchatInfo}
      />
      <div
        className={
          "w-screen h-screen bg-opacity-10 absolute top-0 left-0 flex flex-row bg-gray-900 items-center " +
          (is_show ? "" : "hidden")
        }
      >
        <div className="relative p-w/5 bg-white m-auto text-gray-600 rounded-xl w-2/5">
          <div className="absolute top-0 right-0">
            <ExitButton
              onClick={() => {
                setIsShow(false);
              }}
            />
          </div>
          <div className="bg-white mx-auto p-6 rounded-md ">
            <div className="w-full px-4">
              <div className="text-xl font-semibold w-full my-4">
                Салбар үүсгэх
              </div>

              <div className="w-full flex flex-col ">
                <div className="flex flex-row items-center p-1">
                  <p className="w-48">Салбарын нэр:</p>
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
                    className="focus:outline-none p-2 border rounded-md focus:border-sky-300 z-0 bg-white "
                  />
                </div>
                <div className="flex flex-row items-center p-1 gap-16">
                  <p className="w-32">Салбарын касс систем:</p>
                  {/* <p>{branch.ua_code}</p> */}
                  <select
                    // {...register(name, { required: true })}
                    className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
                <div className="flex flex-row items-center p-1">
                  <p className="w-48">Гэрээ хийсэн байдал</p>
                  <select
                    className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                    onChange={(e) => {
                      setBranch((prevState: any) => ({
                        ...prevState,
                        contract_type: e.target.value,
                      }));
                    }}
                  >
                    {contract_type_list?.map((option: any, index: number) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row items-center p-1">
                  <p className="w-48">Гэрээний тайлбар</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                    onChange={(e) => {
                      setBranch((prevState: any) => ({
                        ...prevState,
                        contract_detail: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-row items-center p-1">
                  <p className="w-48">Утасны дугаар:</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
                    onChange={(e) => {
                      setBranch((prevState: any) => ({
                        ...prevState,
                        mobile: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-row items-center p-1">
                  <p className="w-48">Хаяг:</p>
                </div>
                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Улс</p>
                  <select
                    className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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

                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Хот/Аймаг</p>
                  <select
                    className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Сум/Дүүрэг</p>
                  <select
                    className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Баг/Хороо</p>
                  <select
                    className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Гудамж:</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Дэлгэрэнгүй хаяг</p>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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

                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Уртраг</p>
                  <input
                    step="0.01"
                    type="number"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
                <div className="flex flex-row items-center p-1 ml-2">
                  <p className="w-32">Өргөрөг</p>
                  <input
                    type="number"
                    step="0.01"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
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
                <div className="flex justify-end">
                  <button
                    className="p-2 rounded-md border-2 font-semibold text-gray-600 cursor-pointer w-32 my-2  hover:text-gray-600 hover:shadow-md"
                    onClick={() => {
                
                      handleSubmit(branch);
                
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
  );
}
