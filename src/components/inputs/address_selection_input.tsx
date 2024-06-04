export default function AddressSelectionInput(props: any) {
  const { label, register, options, name, onSelectionChange } = props;
  return (
    <div className="flex flex-row items-center justify-between flex-wrap p-2 gap-4 ">
      <div>{label}</div>
      <select
        {...register(name, { required: false })}
        className="min-w-32 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-gray-500"
        onChange={(e) => {
          onSelectionChange(e);
        }}
      >
        {options?.map((option: any, index: number) => (
          <option key={index} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
