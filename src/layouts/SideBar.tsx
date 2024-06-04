import Image from "next/image";
import { useEffect, useState } from "react";
import Menu from "./Menu";
export default function SideBar(props: any) {


  const { is_show, setShowSidebar } = props;
  const [menulist, setMenuList]: any = useState();

  const role: string = "0"

  useEffect(() => {
 
      setMenuList([
        {
          name: "Дашбоард",
          url: "/dashboard",
          icon: "/icons/dashboard.png",
          submenus: [],
        },
        {
          name: "Дэлгүүр",
          url: "/shop",
          icon: "/icons/Group.png",
          submenus: [
            {
              name: "Шинэ дэлгүүр бүртгэх",
              url: "/shop/new_merchant_shop_regist",
            },
            {
              name: "Батч дэлгүүр бүртгэх",
              url: "/shop/batch_merchant_regist",
            },
            {
              name: "Салбар нэмэх",
              url: "/shop/add_sector",
            },
            {
              name: "Касс нэмэх",
              url: "/shop/add_cash_registor",
            },
            {
              name: "Дэлгүүр дэлгэрэнгүй",
              url: "/shop/shop_details"
            },
          ],
        },
        {
          name: "Кэйр тэмдэглэл",
          url: "/care_note",
          icon: "/icons/note.png",
          submenus: [
            {
              name: "Шинэ care үүсгэх",
              url: "/care_note/create_care",
            },
            {
              name: "Кэйр жагсаалт",
              url: "/care_note/care_list",
            },
          ],
        }
      ]);
  }, []);


  return (
    <div
      className={
        (is_show ? "w-full sm:w-96 bg-white h-screen shadow-md " : " w-96 -ml-96 ") +
        " duration-500"
      }
    >
      <div className="py-8 w-full flex flex-col items-center gap-2">
        <div className="justify-around sm:justify-center flex items-center w-full">
          <Image
            src={"/images/black-logo.png"}
            alt="up_logo"
            width={150}
            height={36}
            priority={true}
          />
          <span onClick={()=>{setShowSidebar(false)}}>
            <svg
              className="block sm:hidden h-6 w-6 -rotate-90 transform fill-current transition duration-150 ease-in-out text-gray-600 hover:text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
        </div>
        <div className="bg-gray-200 h-0.5 mt-4 rounded-xl w-4/5"></div>
      </div>
      {menulist?.map((e: any, ind: number) => (
        <Menu key={ind} menu={e} submenus={e.submenus} ind={ind} />
      ))}
    </div>
  );
}
