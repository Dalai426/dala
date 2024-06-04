export default function Pos(props: any) {
  const { pos, branch } = props;
  return (
    <div className="p-4 border rounded-xl m-2 col-span-1">
      <div className="flex flex-row gap-10 p-1 ">
        <div className="font-semibold text-xl">Кассын мэдээлэл</div>
        <div className="flex ">
          {/* <button className="inline-flex items-center justify-center w-10 h-10  text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button> */}
        </div>
      </div>
      <div className="h-60 overflow-scroll mt-2">
        <div>
          <div className="flex flex-row items-center p-1 text-gray-800 border-b-2">
            <p className="w-32">Кассын тоо:</p>
            <p>{pos.length}</p>
          </div>
          {pos?.map((item: any, index: number) => (
            <div key={item.id} className=" p-1 text-gray-800 border-b-2">
              <div className="flex flex-row items-center">
                <p className="w-32">Кассын №:</p>
                <p>{index + 1}</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="w-32">Кассын нэр:</p>
                <p>{item.name}</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="w-32">Хэрэглэсэн:</p>
                <p>{item?.otp?.is_validated ? "Тийм" : "Үгүй"}</p>
              </div>
              {item?.otp?.is_validated && (
                <div className="flex flex-row items-center">
                  <p className="w-32">Хэрэглэгч:</p>
                  <p>{new Date(item?.otp?.validated_at).toLocaleString()}</p>
                </div>
              )}
              <div className="flex flex-row items-center">
                <p className="w-32">Last_sync:</p>
                <p>
                  {new Date(item?.last_sync_date).toLocaleString() ===
                  new Date().toLocaleString()
                    ? new Date(item?.last_sync_date).toLocaleString()
                    : "орж ирээгүй"}
                </p>
              </div>
              <div className="flex flex-row items-center">
                <p className="w-32">health:</p>
                <p>{item?.health}</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="w-32">transaction:</p>
                <p>{item?.transaction}</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="w-32">otp:</p>
                <p className="text-white"> {item?.otp?.plain}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
