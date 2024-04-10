interface LoadingBlocksProps {
  numberOfBlocks: number;
}

export default function LoadingBlocks({ numberOfBlocks }: LoadingBlocksProps) {
  const arr = Array.from({ length: numberOfBlocks }, (_, i) => i);
  return (
    <section
      className={"flex flex-row items-center w-full justify-evenly gap-3"}
    >
      {arr.map((d) => (
        <div
          key={d}
          className={"bg-gray-200 animate-pulse w-1/4 h-[150px] rounded-lg"}
        />
      ))}
    </section>
  );
}
