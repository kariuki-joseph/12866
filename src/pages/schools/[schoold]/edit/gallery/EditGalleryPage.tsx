import FormSection from "../../../../../components/FormSection.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import closeSecondary from "/icons/close_secondary.svg";

import { Image, School } from "../../../../../interfaces/api.ts";
import weteachApi from "../../../../../configs/weteach-api.ts";
import addSecondary from "/icons/add_secondary.svg";
import { ChangeEventHandler } from "react";
import queryClient from "../../../../../configs/query-client.ts";

function Photos() {
  const { schoolId } = useParams();

  const url = `api/v1/dashboard/school/media/${schoolId}/`;

  const { data } = useQuery<AxiosResponse<Image[]>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  const handleImageDelete = async (id: number) => {
    await weteachApi.delete(`/api/v1/users/school/photos/delete/${id}/`);

    await queryClient.invalidateQueries({
      queryKey: [`api/v1/dashboard/school/media/${schoolId}/`],
    });
  };

  return (
    <>
      {data !== undefined ? (
        <>
          {data.data.map((image) => (
            <div
              className={
                "rounded overflow-clip w-fit relative w-[200px] h-[200px]"
              }
              key={image.id}
            >
              <img
                src={image.image}
                className={"w-[200px] h-[200px] object-cover"}
              />
              <button
                className={
                  "absolute bottom-4 right-4 bg-white border border-gray-200 rounded-3xl p-1 hover:cursor-pointer"
                }
                onClick={() => handleImageDelete(image.id)}
              >
                <img src={closeSecondary} alt={"close"} className={"w-5 h-5"} />
              </button>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}

interface EditGalleryFormProps {
  school: School;
}

function EditGalleryForm(props: EditGalleryFormProps) {
  const { school } = props;

  const navigate = useNavigate();
  const previousPage = "../../";

  const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const [file] = e.target.files;

    const formData = new FormData();

    formData.append("images", file);
    formData.append("school", school.id);

    try {
      await weteachApi.post(`/api/v1/users/school/photos/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      queryClient.invalidateQueries({
        queryKey: [`api/v1/dashboard/school/media/${school.id}/`],
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <>
      <div className={"grid grid-cols-4 gap-4"}>
        <Photos />

        <label
          className={
            "bg-gray-100 flex flex-row items-center justify-center rounded relative hover:cursor-pointer w-[200px] h-[200px]"
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
        <button className={"btn"}>Done</button>
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