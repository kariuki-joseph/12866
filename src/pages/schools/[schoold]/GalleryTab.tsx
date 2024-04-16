import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import closeSecondary from "/icons/close_secondary.svg";
import weteachApi from "../../../configs/weteach-api.ts";
import { Image } from "../../../interfaces/api.ts";
import queryClient from "../../../configs/query-client.ts";

export function GalleryTab() {
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
          <div className={"grid grid-cols-4 gap-4"}>
            {data.data.map((image) => (
              <div
                className={
                  "rounded overflow-clip border border-gray-200 relative h-[200px]"
                }
                key={image.id}
              >
                <img
                  src={image.image}
                  className={"w-full h-[200px] object-cover"}
                />
                <button
                  className={
                    "absolute top-4 right-4 bg-white border border-gray-200 rounded-3xl p-1 hover:cursor-pointer"
                  }
                  onClick={() => handleImageDelete(image.id)}
                >
                  <img
                    src={closeSecondary}
                    alt={"close"}
                    className={"w-5 h-5"}
                  />
                </button>
              </div>
            ))}
          </div>

          {data.data.length === 0 ? (
            <p className={"text-gray-500 text-sm text-center"}>
              No photos found
            </p>
          ) : null}
        </>
      ) : null}
    </>
  );
}
