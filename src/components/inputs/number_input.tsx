export default function NumberInput(props: any) {
  const { register, name, label } = props;
  return (
    <div className="flex flex-row items-center justify-between flex-wrap p-2 gap-4 text-gray-800 text-sm">
      <div>{label}</div>
      <input
        {...register(name, { required: true })}
        type="number"
        className="min-w-32 focus:outline-none bg-white border-gray-300 border p-2 rounded-md focus:border-gray-500 dark:bg-white dark:text-black"
      ></input>
    </div>
  );
}
