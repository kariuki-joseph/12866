import no_data from "/icons/no_data.png";

export default function NoData() {
  return (
    <div
      className={
        "w-full h-[300px] flex flex-col items-center justify-center rounded mt-3"
      }
    >
      <img src={no_data} alt={"no dats"} className={"w-32 h-32"} />
      <p className={"text-gray-500 text-sm mt-3"}>No data was found</p>
    </div>
  );
}
