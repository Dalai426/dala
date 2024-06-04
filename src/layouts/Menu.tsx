'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Menu(props: any) {


  const [is_open, setIsOpen] = useState(true);
  const { menu, submenus, ind }: any = { ...props };

  return (
    <div className="flex flex-col text-gray-600 cursor-pointer w-92">
      <div
        className={
          `flex flex-row transition ease-in-out hover:bg-gray-100 duration-300 justify-between `
        }
      >
        {submenus.length > 0 ? (
          <div className="flex flex-row gap-4 justify-start py-4 pl-8">
            <Image alt="menu icon" src={menu.icon} width={25} height={25} />
            <div
              className={
                "font-semibold"
              }
            >
              {menu.name}
            </div>
          </div>
        ) : (
          <>
            <Link className="w-full py-4 pl-8" key={ind} href={menu.url}>
              <div className="flex flex-row gap-4 justify-start">
                <Image alt="menu icon" src={menu.icon} width={25} height={25} />
                <div
                  className={
                    "font-semibold"
                  }
                >
                  {menu.name}
                </div>
              </div>
            </Link>
          </>
        )}
        {submenus.length > 0 ? (
          <div
            className=" p-1 mr-2 flex items-center"
            onClick={() => {
              setIsOpen(!is_open);
            }}
          >
            {is_open ? (
              <span>
                <svg
                  className="h-5 w-5 rotate-180 transform fill-current
  transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            ) : (
              <span>
                <svg
                  className="h-5 w-5 transform fill-current transition
  duration-150 ease-in-out group-hover:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div
        className={
          (is_open ? "block" : "hidden") +
          "  bg-gray-50 text-gray-600 duration-500"
        }
      >
        {submenus.length > 0 ? (
          <div className="flex flex-col  ">
            {submenus.map((submenu: any, ind: any) => (
              <Link
                className={
                  "pl-12 py-2 transition ease-in-out duration-300 hover:hover:bg-gray-200 hover:text-gray-800 "
                }
                key={ind}
                href={submenu.url}
              >
                {submenu.name}
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
