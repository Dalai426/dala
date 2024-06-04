export default function SelectionInput(props: any) {
  const { register, name, label, options } = props;
  return (
    <div className="flex flex-row items-center justify-between flex-wrap p-2 gap-4 text-gray-600 text-sm">
      <div>{label}</div>
      <select
        {...register(name, { required: true })}
        className="min-w-32 border border-gray-300 p-2 rounded-md focus:outline-none dark:bg-white dark:text-black"
      >
        {options?.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
