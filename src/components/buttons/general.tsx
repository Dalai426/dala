export default function Button(props: any) {
  return (
    <input
      name="submit"
      className="bg-emerald-600 p-2 rounded-md text-white cursor-pointer"
      type="submit"
      value={props.text}
    ></input>
  );
}
