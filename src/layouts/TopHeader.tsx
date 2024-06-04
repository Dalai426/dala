'use client'
import Image from "next/image";
import { useEffect, useState } from "react";


export default function TopHeader(props: any) {

    const { setShowSidebar, is_show } = props;
    const [is_open, setIsOpen] = useState(false);
    const [userName, setUserName]: any = useState("Далайжамц");

    useEffect(() => {
        setIsOpen(false);
    }, [is_show])


    return (
        <div className={`${is_show ? 'hidden' : 'flex'} sm:flex h-20 p-4 shadow-md bg-customGreen items-center justify-between w-full`}>
            <div className=" ml-4 cursor-pointer"
                onClick={() => {
                    setShowSidebar(!is_show);
                }}>

                <div className="text-black">
                    <Image
                        alt="menu icon"
                        src={"/icons/menu.png"}
                        width={25}
                        height={25}
                    />
                </div>
            </div>
            <div>
                <div className="flex flex-row items-center gap-4" onClick={() => { setIsOpen(!is_open); }}>
                    <div className="rounded-full bg-gray-100 h-12 w-12 justify-center">
                        <Image
                            src={"/icons/hat.png"}
                            alt="person_icon"
                            width={30}
                            height={30}
                            className=" ml-2 mt-1"
                        />
                    </div>
                    <div className="text-gray-600 font-semibold">{userName}</div>
                </div>

                <div className={`${is_open ? 'block' : 'hidden'} absolute overflow-hidden top-20 right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg`} style={{ zIndex: 999 }}>
                    <div className="py-1 hover:bg-gray-100">
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm">Тохиргоо</a>
                    </div>
                    <div className="py-1 hover:bg-gray-100">
                        <a href="#" className="text-red-500 block px-4 py-2 text-sm">Гарах</a>
                    </div>
                </div>

            </div>

        </div>
    );
}


