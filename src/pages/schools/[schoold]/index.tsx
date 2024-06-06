import mail from "/icons/mail.svg";
import call from "/icons/call.svg";
import hotel from "/icons/hotel.svg";
import male from "/icons/male.svg";
import visibility from "/icons/visibility.svg";
import payments_primary from "/icons/payments_primary.svg";
import businessCenter from "/icons/business_center.svg";
import editSecondary from "/icons/edit_secondary.svg";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import * as Tabs from "@radix-ui/react-tabs";
import * as Popover from "@radix-ui/react-popover";
import PostedJobsTab from "./PostedJobsTab.tsx";
import AboutSchoolTab from "./AboutSchoolTab.tsx";
import { Link, useParams } from "react-router-dom";
import { School } from "../../../interfaces/api.ts";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import weteachApi from "../../../configs/weteach-api.ts";
import LoadingSpinner from "../../../components/loading/LoadingSpinner.tsx";
import { DateTime } from "luxon";
import LoadingBlocks from "../../../components/loading/LoadingBlocks.tsx";
import StatCard from "../../../components/StatCard.tsx";
import baseUrl from "../../../configs/baseUrl.ts";
import queryClient from "../../../configs/query-client.ts";
import { GalleryTab } from "./GalleryTab.tsx";
import visibility_error from "/icons/visibility_error.svg";
import SavedTeachersTab from "./SavedTeachersTab.tsx";
import ViewedTeachersTab from "./ViewedTeachersTab.tsx";

interface SchoolTitleSectionProps {
  school: School;
}

function SchoolTitleSection(props: SchoolTitleSectionProps) {
  const { school } = props;

  return (
    <section className={"flex flex-row items-center justify-between mb-5"}>
      <div className={"flex flex-row items-center gap-4"}>
        <h1 className={"font-bold"}>{school.name}</h1>
        {school.is_suspended ? (
          <p
            className={
              "text-sm rounded-3xl px-3 py-1 bg-error text-white text-green-950 w-fit"
            }
          >
            Inactive
          </p>
        ) : (
          <p
            className={
              "text-sm rounded-3xl px-3 py-1 bg-green-100 text-green-950 w-fit"
            }
          >
            Active
          </p>
        )}
      </div>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button className={"btn-outlined"}>
            <img src={editSecondary} alt={"edit"} />
            <span>Edit</span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={6}
            align={"end"}
            className={
              "rounded-lg text-xs flex flex-col *:py-2 *:px-3 text-gray-500 right-10 w-[200px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
            }
          >
            <Link
              to={"edit/basic-info"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Basic Info
            </Link>
            <Link
              to={"edit/school-details"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              School Details
            </Link>
            <Link
              to={"edit/location-details"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Location Details
            </Link>
            <Link
              to={"edit/gallery"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Gallery
            </Link>
            <Link
              to={"edit/password"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Change password
            </Link>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </section>
  );
}

interface SchoolInfoProps {
  school: School;
}

function SchoolInfo(props: SchoolInfoProps) {
  const { school } = props;

  async function handleSuspendSchool(id: number) {
    try {
      await weteachApi.patch(`api/v1/dashboard/school/modify/${school.id}/`, {
        is_suspended: !school.is_suspended,
      });

      await queryClient.invalidateQueries({
        queryKey: [`api/v1/dashboard/school/get/${school.id}/`],
      });
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <section
      className={
        "w-3/12 relative h-fit bg-white border border-gray-200 rounded px-4 pt-3 "
      }
    >
      <div
        className={
          "bg-gray-50 w-32 h-32 rounded-[300px] mx-auto mt-5 mb-8 overflow-clip"
        }
      >
        <img src={baseUrl + school.image} className={"object-cover"} />
      </div>

      <div
        className={
          "flex flex-row items-center gap-2 text-xs mb-6 text-secondary"
        }
      >
        <a
          href={`tel:${school.phone_number}`}
          className={
            "flex flex-row items-center justify-evenly bg-gray-100 p-2 rounded gap-2 w-1/2"
          }
        >
          <img src={call} className={"w-6 h-6"} />
          <p>Call School</p>
        </a>

        <a
          href={`mailto:${school.primary_email}`}
          className={
            "flex flex-row items-center justify-evenly bg-gray-100 p-2 rounded gap-2 w-1/2"
          }
        >
          <img src={mail} className={"w-6 h-6"} />
          <p>Email School</p>
        </a>
      </div>

      <div className={"text-gray-500 mb-6"}>
        <p className={"text-sm"}>Basic Information</p>
        <hr className={"my-1"} />

        <div className={"text-xs"}>
          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={hotel} className={"w-5 h-5"} alt={"hotel"} />
              <p>Accommodation</p>
            </div>

            <p className={"text-left text-black"}>
              {school.accommodation ?? "-"}
            </p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={male} className={"w-5 h-5"} />
              <p>Gender</p>
            </div>

            <p className={"text-left text-black"}>{school.gender ?? "-"}</p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={businessCenter} className={"w-5 h-5"} />
              <p>Joined on</p>
            </div>

            <p className={"text-left text-black"}>
              {DateTime.fromISO(school.creation_time).toLocaleString({
                locale: "en-gb",
              })}
            </p>
          </div>
        </div>
      </div>

      {school.is_suspended ? (
        <button
          className={
            "flex flex-row items-center justify-between py-3 text-sm border border-error rounded px-2 mb-3 w-full"
          }
          onClick={() => handleSuspendSchool(school.id)}
        >
          <div className={"flex flex-row items-center gap-2 text-error"}>
            Unsuspend
          </div>

          <div className={"flex flex-row items-center gap-2 "}>
            <img
              src={visibility_error}
              className={"w-5 h-5"}
              alt={"visibility_error"}
            />
          </div>
        </button>
      ) : (
        <button
          className={
            "flex flex-row items-center justify-between py-3 text-sm border border-error rounded px-2 mb-3 w-full"
          }
          onClick={() => handleSuspendSchool(school.id)}
        >
          <div className={"flex flex-row items-center gap-2 text-error"}>
            Suspend
          </div>

          <div className={"flex flex-row items-center gap-2 "}>
            <img
              src={visibility_error}
              className={"w-5 h-5"}
              alt={"visibility_error"}
            />
          </div>
        </button>
      )}
    </section>
  );
}

function SummarySection() {
  const { schoolId } = useParams();

  const url = `api/v1/dashboard/school/statistics/${schoolId}/`;

  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  if (isLoading) <LoadingBlocks numberOfBlocks={3} />;

  return (
    <section className="flex flex-row w-full justify-evenly gap-4">
      {data !== undefined ? (
        <>
          <StatCard
            imageSrc={paperPlaneTilt}
            title={data.data.total_posted_jobs}
            text={"Posted jobs"}
          />
          <StatCard
            imageSrc={visibility}
            title={data.data.total_post_impressions}
            text={"Total Post Impressions"}
          />

          <StatCard
            imageSrc={payments_primary}
            title={data.data.post_total_spending}
            text={"Spends on posts"}
          />
        </>
      ) : null}
    </section>
  );
}

interface JobDetailsProps {
  school: School;
}

function JobDetails(props: JobDetailsProps) {
  const { school } = props;

  return (
    <section className={"w-9/12 "}>
      <SummarySection />

      <Tabs.Root defaultValue={"posted-jobs"} className={"mt-3"}>
        <Tabs.List
          className={
            "flex flex-row items-center bg-gray-100 w-fit p-1 rounded-lg *:px-4 *:py-2 *:rounded-lg mb-3 text-sm gap-2"
          }
        >
          <Tabs.Trigger
            value={"posted-jobs"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Posted Jobs
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"saved-teachers"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Saved Teachers
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"viewed-teachers"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Viewed Teachers
          </Tabs.Trigger>

          <Tabs.Trigger
            value={"about-school"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            About School
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"gallery"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Gallery
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={"posted-jobs"}>
          <PostedJobsTab />
        </Tabs.Content>
        <Tabs.Content value={"about-school"}>
          <AboutSchoolTab school={school} />
        </Tabs.Content>
        <Tabs.Content value={"gallery"}>
          <GalleryTab />
        </Tabs.Content>
        <Tabs.Content value={"saved-teachers"}>
          <SavedTeachersTab />
        </Tabs.Content>
        <Tabs.Content value={"viewed-teachers"}>
          <ViewedTeachersTab />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

export default function SingleSchoolPage() {
  const { schoolId } = useParams();

  const url = `api/v1/dashboard/school/get/${schoolId}/`;

  const { data, isLoading } = useQuery<AxiosResponse<School>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  if (isLoading)
    <div className={"w-full h-full flex flex-row items-center justify-center"}>
      <LoadingSpinner />
    </div>;

  return (
    <>
      {data !== undefined ? (
        <>
          <SchoolTitleSection school={data?.data} />

          <div className={"flex flex-row gap-3"}>
            <SchoolInfo school={data?.data} />
            <JobDetails school={data?.data} />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
