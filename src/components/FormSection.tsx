import arrowBack from "/icons/arrow_back.svg";
import { useNavigate } from "react-router-dom";

interface FormSectionProps {
  title: string;
  previousPage: string;
  children: any;
}

export default function FormSection(props: FormSectionProps) {
  const { previousPage, title, children } = props;
  const navigate = useNavigate();
  return (
    <section
      className={
        "mx-auto bg-white rounded border border-gray-200 px-6 pb-3 max-w-[1000px]"
      }
    >
      <div className={"flex flex-row items-center gap-3 my-5"}>
        <button
          className={""}
          onClick={() => navigate(previousPage, { relative: "path" })}
        >
          <img src={arrowBack} alt={"back"} className={"w-6 h-6"} />
        </button>
        <h2 className={"font-bold text-lg"}>{title}</h2>
      </div>

      {children}
    </section>
  );
}
