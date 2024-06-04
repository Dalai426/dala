import { useEffect, useState } from "react";

export default function Pagination(props: any) {
  const { limit, count } = props.pagination;
  const { getData } = props;
  let [num, setNum] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    console.log("restarted");
  }, [currentPage]);
  const onClick = (page: number) => {
    console.log("page", page - 1);
    if (page != 1) {
      getData(page, limit);
    } else {
      getData(1, limit);
    }
    setCurrentPage(page);
  };
  const add = () => {
    count / limit > num && setNum(++num);
    console.log("num", num);
  };
  const minus = () => {
    num > 1 && setNum(--num);
    console.log("num", num);
  };
  let pages = [{ count: num }];
  for (let i = 1; i <= 5; i++) {
    if (count / limit > num + i) {
      pages.push({ count: num + i });
    }
  }
  return (
    <div className="flex flex-row justify-end py-8">
      <div className="inline-flex items-center gap-4 px-4 rounded-md text-gray-600 shadow-md bg-white">
        <div className="cursor-pointer rounded-md p-1" onClick={minus}>
          Өмнөх
        </div>
        <div className="flex flex-row cursor-pointer">
          {pages.map((page: any, ind: number) => (
            <div
              className={
                "p-2 " +
                (page.count == currentPage ? "text-sky-500  bg-sky-100 " : "")
              }
              key={ind}
              onClick={() => {
                onClick(page.count);
              }}
            >
              {page.count}
            </div>
          ))}
        </div>
        <div className="cursor-pointer rounded-md p-1" onClick={add}>
          Дараах
        </div>
        {currentPage && limit ? (
          <>
            <div>
              {currentPage * limit - limit + 1} -{" "}
              {currentPage * limit > count ? count : currentPage * limit} /{" "}
              {count}
            </div>
            <div>
              {currentPage} / {Math.ceil(count / limit)}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
