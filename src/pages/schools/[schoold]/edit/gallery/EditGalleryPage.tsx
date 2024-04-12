import FormSection from "../../../../../components/FormSection.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import closeSecondary from "/icons/close_secondary.svg";

import { School } from "../../../../../interfaces/api.ts";
import weteachApi from "../../../../../configs/weteach-api.ts";
import baseUrl from "../../../../../configs/baseUrl.ts";
import addSecondary from "/icons/add_secondary.svg";
import { ChangeEventHandler } from "react";

interface EditGalleryFormProps {
  school: School;
}

function EditGalleryForm(props: EditGalleryFormProps) {
  const { school } = props;

  const navigate = useNavigate();
  const previousPage = "../../";

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const [file] = e.target.files;
    console.log(file);
  };

  return (
    <>
      <div className={"grid grid-cols-4 gap-4"}>
        <div className={"rounded overflow-clip w-fit relative"}>
          <img
            src={baseUrl + school.image}
            alt={school.name}
            className={"w-[200px] h-[200px] object-cover"}
          />
          <div
            className={
              "absolute bottom-4 right-4 bg-white border border-gray-200 rounded-3xl p-1"
            }
          >
            <img src={closeSecondary} alt={"close"} className={"w-5 h-5"} />
          </div>
        </div>

        <label
          className={
            "bg-gray-100 flex flex-row items-center justify-center rounded relative hover:cursor-pointer"
          }
          htmlFor={"image"}
        >
          <img src={addSecondary} alt={"add"} className={"w-16 h-16"} />
          <input
            type="file"
            id={"image"}
            className={"invisible absolute bottom-0"}
            accept=".png, .jpg, .jpeg"
            onChange={handleUpload}
          />
        </label>
      </div>

      <div className={"flex flex-row justify-end gap-3 mt-3"}>
        <button
          onClick={() => navigate(previousPage, { relative: "path" })}
          className={"btn-outlined"}
          type={"button"}
        >
          Cancel
        </button>
        <button className={"btn"}>Submit</button>
      </div>
    </>
  );
}

export default function EditGalleryPage() {
  const { schoolId } = useParams();

  const url = `api/v1/dashboard/school/get/${schoolId}/`;

  const { data } = useQuery<AxiosResponse<School>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Edit Gallery"} previousPage={"../../"}>
      {data !== undefined ? <EditGalleryForm school={data.data} /> : null}
    </FormSection>
  );
}
