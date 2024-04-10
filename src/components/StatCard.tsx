interface StatCardProps {
  imageSrc: string;
  title: string;
  text: string;
}

export default function StatCard(props: StatCardProps) {
  const { imageSrc, title, text } = props;

  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 gap-4 w-full">
      <div className={"bg-purple-50 p-2 rounded-3xl m-3"}>
        <img src={imageSrc} alt={text} className={"w-8 h-8"} />
      </div>

      <div className="w-2/3 flex flex-col gap-1">
        <p className={"text-2xl font-bold"}>{title}</p>
        <p className={"text-sm text-gray-500"}>{text}</p>
      </div>
    </div>
  );
}
