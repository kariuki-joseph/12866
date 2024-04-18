import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import editSecondary from "/icons/edit_secondary.svg";
import * as Popover from "@radix-ui/react-popover";
import { Job } from "../../../../../interfaces/api.ts";
import LoadingSpinner from "../../../../../components/loading/LoadingSpinner.tsx";
import weteachApi from "../../../../../configs/weteach-api.ts";
import baseUrl from "../../../../../configs/baseUrl.ts";
import school from "/icons/school.svg";
import call from "/icons/call.svg";
import mail from "/icons/mail.svg";
import visibility from "/icons/visibility.svg";
import bookmark from "/icons/bookmark.svg";
import schedule from "/icons/schedule.svg";
import business_center from "/icons/business_center.svg";
import { DateTime } from "luxon";
import LoadingBlocks from "../../../../../components/loading/LoadingBlocks.tsx";
import StatCard from "../../../../../components/StatCard.tsx";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import * as Tabs from "@radix-ui/react-tabs";
import AboutJob from "./AboutJob.tsx";
import ApplicationProcess from "../ApplicationProcess.tsx";
import JobViews from "./JobViews.tsx";
import SavedJobs from "./SavedJobs.tsx";

function JobTitleSection({ job }: { job: Job }) {
  return (
    <section className={"flex flex-row items-center justify-between mb-5"}>
      <div className={"flex flex-row items-center gap-4"}>
        <h1 className={"font-bold"}>{job.title}</h1>
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
              to={"edit/job-details"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Job Details
            </Link>
            <Link
              to={"edit/payment-rate"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Make Payment
            </Link>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </section>
  );
}

function JobInfo({ job }: { job: Job }) {
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
        <img src={baseUrl + job.school.image} className={"object-cover"} />
      </div>

      <div
        className={
          "flex flex-row items-center gap-2 text-xs mb-6 text-secondary"
        }
      >
        <a
          href={`tel:${job.school.phone_number}`}
          className={
            "flex flex-row items-center justify-evenly bg-gray-100 p-2 rounded gap-2 w-1/2"
          }
        >
          <img src={call} className={"w-6 h-6"} />
          <p>Call Teacher</p>
        </a>

        <a
          href={`mailto:${job.school.primary_email}`}
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
              <p>School</p>
            </div>

            <p className={"text-left text-black"}>{job.school.name ?? "-"}</p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={schedule} className={"w-5 h-5"} alt={"hotel"} />
              <p>Publicity package</p>
            </div>

            <p className={"text-left text-black"}>
              {job.payment_rate !== undefined
                ? `${job.payment_rate.days} day(s) for Ksh ${job.payment_rate.charges}`
                : "-"}
            </p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={business_center} className={"w-5 h-5"} alt={"hotel"} />
              <p>Experience</p>
            </div>

            <p className={"text-left text-black"}>
              {DateTime.fromISO(job.creation_time).toLocaleString({
                locale: "en-gb",
              })}
            </p>
          </div>
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
  const { jobId } = useParams();

  const url = `api/v1/dashboard/job/statistics/${jobId}/`;

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
            title={data.data.similar_subject_posts}
            text={"Similar Subjects Posts"}
          />
          <StatCard
            imageSrc={visibility}
            title={data.data.post_impressions}
            text={"Total Post Impressions"}
          />

          <StatCard
            imageSrc={bookmark}
            title={data.data.saves}
            text={"Saved by Teachers"}
          />
        </>
      ) : null}
    </section>
  );
}

function JobDetails({ job }: { job: Job }) {
  return (
    <section className={"w-9/12 "}>
      <SummarySection />

      <Tabs.Root defaultValue={"job-views"} className={"mt-3"}>
        <Tabs.List
          className={
            "flex flex-row items-center bg-gray-100 w-fit p-1 rounded-lg *:px-4 *:py-2 *:rounded-lg mb-3 text-sm gap-2"
          }
        >
          <Tabs.Trigger
            value={"job-views"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Job Views
          </Tabs.Trigger>

          <Tabs.Trigger
            value={"job-saves"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Job Saves
          </Tabs.Trigger>

          <Tabs.Trigger
            value={"about-job"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            About Job
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"application-process"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Application Process
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={"job-views"}>
          <JobViews />
        </Tabs.Content>
        <Tabs.Content value={"job-saves"}>
          <SavedJobs />
        </Tabs.Content>
        <Tabs.Content value={"about-job"}>
          <AboutJob job={job} />
        </Tabs.Content>
        <Tabs.Content value={"application-process"}>
          <ApplicationProcess job={job} />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

export default function SingleJobPage() {
  const { jobId } = useParams();

  const url = `/api/v1/jobs/view/${jobId}/`;

  const { data, isLoading } = useQuery<AxiosResponse<Job>>({
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
          <JobTitleSection job={data?.data} />

          <div className={"flex flex-row gap-3"}>
            <JobInfo job={data?.data} />
            <JobDetails job={data?.data} />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
