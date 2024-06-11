import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, Teacher } from "../../../../../interfaces/api.ts";
import weteachApi from "../../../../../configs/weteach-api.ts";
import { useNavigate, useParams } from "react-router-dom";
import FormSection from "../../../../../components/FormSection.tsx";
import baseUrl from "../../../../../configs/baseUrl.ts";
import sensors from "/icons/sensors.svg";
import visibility_plain from "/icons/visibility_plain.svg";
import queryClient from "../../../../../configs/query-client.ts";

export default function UnpublishTeacherProfilePage() {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const previousPage = "../../";

  const url = `api/v1/dashboard/teacher/get/${teacherId}/`;
  const { data } = useQuery<AxiosResponse<Teacher>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  async function unPublishProfile() {
    const recentPostId = data?.data.recent_profile_post.id;

    await weteachApi.delete(
      `/api/v1/jobs/teacher/profile/modify/${recentPostId}/`,
    );

    await queryClient.invalidateQueries({
      queryKey: [`api/v1/dashboard/teacher/get/${teacherId}/`],
    });

    navigate(previousPage, { relative: "path" });
  }

  return (
    <FormSection
      title={"Unpublish Teacher Profile"}
      previousPage={previousPage}
    >
      {data !== undefined ? (
        <>
          <div
            className={
              "bg-gray-50 w-32 h-32 rounded-[300px] mx-auto mt-6 mb-8 overflow-clip"
            }
          >
            <img src={baseUrl + data.data.image} className={"object-cover"} />
          </div>

          <h1 className={"w-fit mx-auto font-bold text-lg mb-6"}>
            {data.data.full_name}
          </h1>

          <div
            className={"flex flex-row gap-3 items-center text-sm mx-auto w-fit"}
          >
            <div
              className={
                "flex flex-row gap-3 items-center rounded-lg justify-around p-3 text-sm mb-3  border border-gray-200 w-[200px]"
              }
            >
              <div className={"flex flex-row items-center gap-2"}>
                <img src={sensors} className={"w-5 h-5"} alt={"sensors"} />
              </div>

              <div>
                <p>Publicity ends in</p>
                <p className={"text-secondary"}>2 days</p>
              </div>
            </div>

            <div
              className={
                "flex flex-row gap-3 items-center rounded-lg justify-around p-3 text-sm mb-3  border border-gray-200 w-[200px]"
              }
            >
              <div className={"flex flex-row items-center gap-2"}>
                <img
                  src={visibility_plain}
                  className={"w-5 h-5"}
                  alt={"sensors"}
                />
              </div>

              <div>
                <p>Impressions</p>
                <p className={"text-secondary"}>2 days</p>
              </div>
            </div>
          </div>

          <p className={"text-gray-500 text-sm w-[500px] mx-auto mt-6"}>
            Confirming will cancel your publicity package which cannot be
            undone. Do you still want to end the publicity status and unpublish?
          </p>

          <div className={"flex flex-row my-3 w-fit gap-3 mx-auto"}>
            <button
              className={"btn-outlined"}
              onClick={() => navigate(previousPage, { relative: "path" })}
            >
              Cancel
            </button>
            <button
              className={"btn"}
              onClick={() => {
                unPublishProfile();
              }}
            >
              Unpublish
            </button>
          </div>
        </>
      ) : null}
    </FormSection>
  );
}
