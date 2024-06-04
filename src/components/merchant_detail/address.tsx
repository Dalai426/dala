import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addressService } from "@/services/address.service";
import { set } from "react-hook-form";

export default function Address(props: any) {
  const { address, branch_id, setDetail } = props;
  const [edit, setEdit] = useState(false);
  const [addresss, setAddress]: any = useState();
  const [countries, setCountries]: any = useState();
  const [provinces, setProvinces]: any = useState();
  const [districts, setDistricts]: any = useState();
  const [sectors, setSectors]: any = useState();
  const [address_data, setAddressData] = useState({
    country: address.country ? address.country : "",
    province: address.province ? address.province : "",
    district: address.district ? address.district : "",
    sector: address.sector ? address.sector : "",
    address_string: address.address_string ? address.address_string : "",
    street: address.street ? address.street : "",
    position: {
      type: "Point",
      coordinates: address.position?.coordinates
        ? address.position.coordinates
        : [0, 0],
    },
  });

  const handleSubmit = async (data: any, branch_id: any) => {
    try {
      const response = await addressService.update_address(
        data,
        branch_id.toString()
      );
      if (response.code == 5100) {
        setDetail();
        setEdit(false);
        toast.success("Амжилттай хадгаллаа", {
          hideProgressBar: true,
        });
      } else {
        console.log("branch update error", response);
        toast.error("Алдаа гарлаа " + response, {
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
  // const sync
  const getAddress = async () => {
    try {
      const response = await addressService.address_info();
      setAddress(response.data);
    } catch (err) {
      toast.error("Алдаа гарлаа" + err, {
        hideProgressBar: true,
      });
      // cons
    }
  };
  useEffect(() => {
    getAddress();
    addressData();
  }, []);

  const getDatas = async () => {
    setCountries(addresss.countries);
    const country = addresss.countries.find(
      (item: any) => item.name == (address.country ? address.country : "Монгол")
    );
    setProvinces(
      addresss.provinces.filter((pro: any) => pro.parent == country.code)
    );

    const province = addresss.provinces.find(
      (item: any) =>
        item.name === (address.province ? address.province : "Архангай")
    );
    setDistricts(
      addresss.districts.filter((pro: any) => pro.parent == province.code)
    );
    const district = addresss.districts.find(
      (item: any) =>
        item.name === (address.district ? address.district : "Батцэнгэл")
    );

    setSectors(
      addresss.sectors.filter(
        (sec: any) =>
          sec.parent == district.code && sec.grand_parent == province.code
      )
    );
  };
  const addressData = async () => {
    const country = addresss?.countries.find(
      (item: any) =>
        item.name === (address.country ? address.country : "Монгол")
    );
    const province = addresss?.provinces.find(
      (item: any) =>
        item.name === (address.province ? address.province : "Архангай")
    );
    const district = addresss?.districts.find(
      (item: any) =>
        item.name === (address.district ? address.district : "Батцэнгэл")
    );
    const sector = addresss?.sectors.find(
      (item: any) =>
        item.name === (address.sector ? address.sector : "1-р баг, Улаанчулуу")
    );

    setAddressData({
      country: country?.code ? country.code : 0,
      province: province?.code ? province.code : 0,
      district: district?.code ? district.code : 0,
      sector: sector?.code ? sector.code : 0,
      address_string: address.address_string,
      street: address.street,
      position: {
        type: "Point",
        coordinates: address.position?.coordinates
          ? address.position.coordinates
          : [0, 0],
      },
    });
  };
  const countryChange = (e: any) => {
    setProvinces(
      addresss.provinces.filter((pro: any) => pro.parent == e.target.value)
    );
  };
  const provinceChange = (e: any) => {
    setDistricts(
      addresss.districts.filter((pro: any) => pro.parent == e.target.value)
    );
    setSectors([]);
  };
  const districChange = (e: any) => {
    const find_district = addresss.provinces.find(
      (item: any) => item.code === parseInt(address_data.province)
    );

    setSectors(
      addresss.sectors.filter(
        (sec: any) =>
          sec.parent == e.target.value &&
          sec.grand_parent == find_district?.code
      )
    );
  };

  return (
    <div className="p-4 border rounded-xl m-2">
      <div className="flex flex-row gap-10 p-1 ">
        <div className="font-semibold text-xl">Хаягийн мэдээлэл</div>
        <div className="flex ">
          <button
            className="inline-flex items-center justify-center w-10 h-10  text-gray-700 transition-colors duration-150 bg-gray-100 rounded-full focus:shadow-outline hover:bg-gray-200"
            onClick={() => {
              addressData(), getDatas(), setEdit(!edit);
            }}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button>
        </div>
      </div>
      {!edit ? (
        <div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">Улс:</p>
            <p>{address?.country}</p>
          </div>
          {/* line */}
          <div className="" />
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">Хот/аймаг:</p>
            <p>{address?.province}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">Дүүрэг/сум:</p>
            <p>{address?.district}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">Хороо/баг:</p>
            <p>{address?.sector}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">Гудамж:</p>
            <p>{address?.street}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">Дэлгэрэнгүй:</p>
            <p>{address?.address_string}</p>
          </div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">coordinates:</p>
            {address?.position?.coordinates?.map((item: any, index: number) => (
              <p key={index} className="px-2">
                {item}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row items-center p-1 ml-2">
            <p className="w-32">Улс</p>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              value={address.country}
              onChange={(e) => {
                countryChange(e);
                setAddressData((prevState: any) => ({
                  ...prevState,
                  country: e.target.value,
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
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              onChange={(e) => {
                provinceChange(e);
                setAddressData((prevState: any) => ({
                  ...prevState,
                  province: e.target.value,
                }));
              }}
            >
              {provinces?.map((option: any, index: number) =>
                option.name === address.province ? (
                  <option key={index} value={option.code} selected>
                    {option.name}
                  </option>
                ) : (
                  <option key={index} value={option.code}>
                    {option.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="flex flex-row items-center p-1 ml-2">
            <p className="w-32">Сум/Дүүрэг</p>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              onChange={(e) => {
                districChange(e);
                setAddressData((prevState: any) => ({
                  ...prevState,
                  district: e.target.value,
                }));
              }}
            >
              {districts?.map((option: any, index: number) => {
                return option.name === address.district ? (
                  <option key={index} value={option.code} selected>
                    {option.name}
                  </option>
                ) : (
                  <option key={index} value={option.code}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row items-center p-1 ml-2">
            <p className="w-32">Баг/Хороо</p>
            <select
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              onChange={(e) => {
                setAddressData((prevState: any) => ({
                  ...prevState,
                  sector: e.target.value,
                }));
              }}
            >
              {sectors?.map((option: any, index: number) => {
                return option.name === address.sector ? (
                  <option key={index} value={option.code} selected>
                    {option.name}
                  </option>
                ) : (
                  <option key={index} value={option.code}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row items-center p-1 ml-2">
            <p className="w-32">Гудамж:</p>
            <input
              type="text"
              value={address_data.street}
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              onChange={(e) => {
                setAddressData((prevState: any) => ({
                  ...prevState,
                  street: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-row items-center p-1 ml-2">
            <p className="w-32">Дэлгэрэнгүй хаяг</p>
            <input
              type="text"
              value={address_data.address_string}
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              onChange={(e) => {
                setAddressData((prevState: any) => ({
                  ...prevState,
                  address_string: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex flex-row items-center p-1 ml-2">
            <p className="w-32">Уртраг</p>
            <input
              step="0.01"
              type="number"
              value={
                address_data.position?.coordinates[0]
                  ? address_data.position?.coordinates[0]
                  : 0
              }
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              onChange={(e) => {
                setAddressData((prevState: any) => ({
                  ...prevState,
                  position: {
                    type: "Point",
                    coordinates: [
                      e.target.value,
                      address_data.position.coordinates[1]
                        ? address_data.position.coordinates[1]
                        : 0,
                    ],
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
              value={
                address_data.position?.coordinates[1]
                  ? address_data.position?.coordinates[1]
                  : 0
              }
              className="border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
              onChange={(e) => {
                setAddressData((prevState: any) => ({
                  ...prevState,
                  position: {
                    type: "Point",
                    coordinates: [
                      address_data.position.coordinates[0]
                        ? address_data.position.coordinates[0]
                        : 0,
                      e.target.value,
                    ],
                  },
                }));
              }}
            />
          </div>
          <div className="flex justify-end p-2">
            <button
              className="bg-emerald-600 p-2 rounded-md text-white cursor-pointer justify-center"
              onClick={() => {
                handleSubmit(address_data, branch_id);

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
