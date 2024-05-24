import mail from "/icons/mail.svg";
import call from "/icons/call.svg";
import schedule from "/icons/schedule.svg";
import school from "/icons/school.svg";
import visibility from "/icons/visibility.svg";
import bookmark from "/icons/bookmark.svg";
import payments_primary from "/icons/payments_primary.svg";
import sensors from "/icons/sensors.svg";
import open_in_new from "/icons/open_in_new.svg";
import visibility_error from "/icons/visibility_error.svg";
import { Link, useParams } from "react-router-dom";
import { Teacher } from "../../../interfaces/api.ts";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import weteachApi from "../../../configs/weteach-api.ts";
import LoadingSpinner from "../../../components/loading/LoadingSpinner.tsx";
import StatCard from "../../../components/StatCard.tsx";
import baseUrl from "../../../configs/baseUrl.ts";
import business_center from "/icons/business_center.svg";
import { DateTime } from "luxon";
import * as Tabs from "@radix-ui/react-tabs";
import AboutTeacher from "./AboutTeacher.tsx";
import editSecondary from "/icons/edit_secondary.svg";
import * as Popover from "@radix-ui/react-popover";
import LoadingBlocks from "../../../components/loading/LoadingBlocks.tsx";
import ViewedJobs from "./ViewedJobs.tsx";
import SavedJobs from "./SavedJobs.tsx";

interface TeacherNameSectionProps {
  teacher: Teacher;
}

function TeacherNameSection(props: TeacherNameSectionProps) {
  const { teacher } = props;

  return (
    <section className={"flex flex-row items-center justify-between mb-5"}>
      <div className={"flex flex-row items-center gap-4"}>
        <h1 className={"font-bold"}>{teacher.full_name}</h1>
        {/*{teacher.is_suspended ? (*/}
        {/*  <p*/}
        {/*    className={*/}
        {/*      "text-sm rounded-3xl px-3 py-1 bg-error text-white text-green-950 w-fit"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    Inactive*/}
        {/*  </p>*/}
        {/*) : (*/}
        {/*  <p*/}
        {/*    className={*/}
        {/*      "text-sm rounded-3xl px-3 py-1 bg-green-100 text-green-950 w-fit"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    Active*/}
        {/*  </p>*/}
        {/*)}*/}
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
              "rounded-lg text-sm flex flex-col py-1 *:py-2 *:px-3 text-gray-500 right-10 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
            }
          >
            <Link
              to={"edit/basic-info"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Basic Info
            </Link>
            <Link
              to={"edit/teacher-details"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Teacher Details
            </Link>
            <Link
              to={"edit/location-details"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Location Details
            </Link>
            <Link
              to={"edit/make-payment"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Make Payment
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

interface TeacherInfoProps {
  teacher: Teacher;
}

function TeacherInfo(props: TeacherInfoProps) {
  const { teacher } = props;

  async function handleSuspendSchool(id: number) {
    // try {
    //   await weteachApi.patch(`api/v1/dashboard/school/modify/${teacher.id}/`, {
    //     is_suspended: !teacher.is_suspended,
    //   });
    //
    //   await queryClient.invalidateQueries({
    //     queryKey: [`api/v1/dashboard/school/get/${teacher.id}/`],
    //   });
    // } catch (e) {
    //   console.log(e.response.data);
    // }
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
        <img src={baseUrl + teacher.image} className={"object-cover"} />
      </div>

      <div
        className={
          "flex flex-row items-center gap-2 text-xs mb-6 text-secondary"
        }
      >
        <a
          href={`tel:${teacher.user.phone_number}`}
          className={
            "flex flex-row items-center justify-evenly bg-gray-100 p-2 rounded gap-2 w-1/2"
          }
        >
          <img src={call} className={"w-6 h-6"} />
          <p>Call Teacher</p>
        </a>

        <a
          href={`mailto:${teacher.user.email}`}
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
              <img src={school} className={"w-5 h-5"} alt={"hotel"} />
              <p>Level Of Institution</p>
            </div>

            <p className={"text-left text-black"}>
              {teacher.institution_level.name ?? "-"}
            </p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={schedule} className={"w-5 h-5"} alt={"hotel"} />
              <p>Experience</p>
            </div>

            <p className={"text-left text-black"}>
              {teacher.experience ?? "-"}
            </p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={business_center} className={"w-5 h-5"} alt={"hotel"} />
              <p>Experience</p>
            </div>

            <p className={"text-left text-black"}>
              {DateTime.fromISO(teacher.creation_time).toLocaleString({
                locale: "en-gb",
              })}
            </p>
          </div>
        </div>
      </div>

      <div
        className={
          "flex flex-row items-center justify-between py-3 text-sm mb-3"
        }
      >
        <div className={"flex flex-row items-center gap-2"}>
          <img src={sensors} className={"w-5 h-5"} alt={"sensors"} />
          <p>Profile</p>
        </div>

        {teacher.has_active_profile_post ? (
          <span
            className={
              "px-2 py-1 bg-[#D6FBD8] text-[#2E7D32] rounded-3xl text-center"
            }
          >
            Live
          </span>
        ) : (
          <span
            className={
              "px-2 py-1 bg-[#F8BD00] bg-opacity-10 text-[#CD7F4B] rounded-3xl text-center"
            }
          >
            Offline
          </span>
        )}
      </div>

      <Link
        to={`/teachers/${teacher.id}/edit/unpublish-profile`}
        className={
          "flex flex-row items-center justify-between py-3 text-sm border border-error rounded px-2 mb-3"
        }
      >
        <div className={"flex flex-row items-center gap-2 text-error"}>
          Unpublish Profile
        </div>

        <div className={"flex flex-row items-center gap-2 "}>
          <img src={open_in_new} className={"w-5 h-5"} alt={"open_in_new"} />
        </div>
      </Link>

      <div
        className={
          "flex flex-row items-center justify-between py-3 text-sm border border-error rounded px-2 mb-3"
        }
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
      </div>

      {/*<div className={"text-gray-500 mb-3"}>*/}
      {/*  <p className={"text-sm"}>Payment Information</p>*/}
      {/*  <hr className={"my-1"} />*/}
      {/*  {teacher.school_owner_payment_methods.map((d) => (*/}
      {/*    <div*/}
      {/*      className={"flex flex-row items-center justify-between py-3"}*/}
      {/*      key={d.id}*/}
      {/*    >*/}
      {/*      <p>{d.title}</p>*/}

      {/*      <p className={"text-left text-black"}>{teacher.gender ?? "-"}</p>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}

      {/*<div className={"mt-12 py-2"}>*/}
      {/*  <hr />*/}
      {/*  <button*/}
      {/*    className={"text-error py-2 w-full"}*/}
      {/*    onClick={() => handleSuspendSchool(teacher.id)}*/}
      {/*  >*/}
      {/*    {teacher.is_suspended ? "Unsuspend" : "Suspend"}*/}
      {/*  </button>*/}
      {/*</div>*/}
    </section>
  );
}

function SummarySection() {
  const { teacherId } = useParams();

  const url = `api/v1/dashboard/teacher/statistics/${teacherId}/`;

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
            imageSrc={visibility}
            title={data.data.viewed_jobs}
            text={"Viewed jobs"}
          />
          <StatCard
            imageSrc={bookmark}
            title={data.data.saved_jobs}
            text={"Saved Jobs"}
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
  teacher: Teacher;
}

function JobDetails(props: JobDetailsProps) {
  const { teacher } = props;

  return (
    <section className={"w-9/12 "}>
      <SummarySection />

      <Tabs.Root defaultValue={"viewed-jobs"} className={"mt-3"}>
        <Tabs.List
          className={
            "flex flex-row items-center bg-gray-100 w-fit p-1 rounded-lg *:px-4 *:py-2 *:rounded-lg mb-3 text-sm gap-2"
          }
        >
          <Tabs.Trigger
            value={"viewed-jobs"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Viewed Jobs
          </Tabs.Trigger>

          <Tabs.Trigger
            value={"saved-jobs"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Saved Jobs
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"about-teacher"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            About Teacher
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"profile-publicity"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Profile Publicity
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={"viewed-jobs"}>
          <ViewedJobs />
        </Tabs.Content>
        <Tabs.Content value={"saved-jobs"}>
          <SavedJobs />
        </Tabs.Content>
        <Tabs.Content value={"about-teacher"}>
          <AboutTeacher teacher={teacher} />
        </Tabs.Content>
        <Tabs.Content value={"profile-publicity"}>
          Profile publicity
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

export default function SingleTeachersPage() {
  const { teacherId } = useParams();

  const url = `/api/v1/dashboard/teacher/get/${teacherId}/`;

  const { data, isLoading } = useQuery<AxiosResponse<Teacher>>({
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
          <TeacherNameSection teacher={data?.data} />

          <div className={"flex flex-row gap-3"}>
            <TeacherInfo teacher={data?.data} />
            <JobDetails teacher={data?.data} />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
