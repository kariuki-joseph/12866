import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Image } from "../interfaces/api.ts";
import weteachApi from "../configs/weteach-api.ts";
import queryClient from "../configs/query-client.ts";
import closeSecondary from "/icons/close_secondary.svg";

export function Photos() {
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
                "rounded overflow-clip border border-gray-200 relative w-[200px] h-[200px]"
              }
              key={image.id}
            >
              <img
                src={image.image}
                className={"w-[200px] h-[200px] object-cover"}
              />
              <button
                className={
                  "absolute top-4 right-4 bg-white border border-gray-200 rounded-3xl p-1 hover:cursor-pointer"
                }
                onClick={() => handleImageDelete(image.id)}
              >
                <img src={closeSecondary} alt={"close"} className={"w-5 h-5"} />
              </button>

              {/*<div*/}
              {/*  className={*/}
              {/*    "absolute bottom-0 w-full flex flex-row items-center justify-center bg-black py-3 bg-opacity-30"*/}
              {/*  }*/}
              {/*>*/}
              {/*  <label className={"text-white"}>Censored</label>*/}
              {/*  <Switch.Root*/}
              {/*    className={*/}
              {/*      "w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"*/}
              {/*    }*/}
              {/*  >*/}
              {/*    <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />*/}
              {/*  </Switch.Root>*/}
              {/*</div>*/}
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}
