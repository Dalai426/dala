export default function text_input(props: any) {
  const { register, name, label } = props;
  return (
    <div className="flex flex-row gap-4 items-center flex-wrap justify-between p-2 text-gray-600 text-sm">
      <p>{label}</p>
      <input
        {...register(name, { required: true })}
        type="text"
        placeholder="..."
        className="min-w-32 focus:outline-none bg-white border-gray-300 border p-2 rounded-md focus:border-sky-300 dark:bg-white dark:text-black"
      />
    </div>
  );
}
