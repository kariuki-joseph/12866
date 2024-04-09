import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import paperPlaneTiltSecondary from "/icons/paper-plane-tilt-secondary.svg";
import * as Tabs from "@radix-ui/react-tabs";
import * as Popover from "@radix-ui/react-popover";
import PostedJobsTab from "./PostedJobsTab.tsx";
import AboutSchoolTab from "./AboutSchoolTab.tsx";
import GalleryTab from "./GalleryTab.tsx";
import { Link } from "react-router-dom";

function SchoolTitleSection() {
  return (
    <section className={"flex flex-row items-center justify-between mb-4"}>
      <div className={"flex flex-row items-center gap-4"}>
        <h1 className={"font-bold"}>Merishaw International school</h1>
        <p
          className={
            "text-sm rounded-3xl px-3 py-1 bg-green-100 text-green-950 w-fit"
          }
        >
          Active
        </p>
      </div>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button className={"btn-outlined"}>Edit School Profile</button>
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
              to={"school-description/edit"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              School Description
            </Link>
            <Link
              to={"school/1/school-description/edit"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Contact Details
            </Link>
            <Link
              to={"school/1/school-description/edit"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              Location Details
            </Link>
            <Link
              to={"school/1/school-description/edit"}
              className={"hover:bg-gray-100 hover:text-black"}
            >
              School Gallery
            </Link>
            <Link
              to={"school/1/school-description/edit"}
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

function SchoolInfo() {
  return (
    <section
      className={
        "w-3/12 relative h-fit bg-white border border-gray-200 rounded px-4 pt-3"
      }
    >
      <div className={"bg-gray-50 p-2 rounded-[42px] w-fit mx-auto mb-3"}>
        <img src={paperPlaneTilt} className={"w-12 h-12"} />
      </div>

      <div
        className={"flex flex-row items-center gap-2 text-sm text-nowrap mb-3"}
      >
        <button
          className={
            "flex flex-row items-center bg-gray-100 p-2 rounded gap-2 w-1/2"
          }
        >
          <img src={paperPlaneTiltSecondary} className={"w-6 h-6"} />
          <p>call School</p>
        </button>

        <button
          className={
            "flex flex-row items-center bg-gray-100 p-2 rounded gap-2 w-1/2"
          }
        >
          <img src={paperPlaneTiltSecondary} className={"w-6 h-6"} />
          <p>Email School</p>
        </button>
      </div>

      <div className={"text-gray-500 mb-3"}>
        <p>Basic Information</p>
        <hr className={"my-2"} />

        <div className={"text-sm"}>
          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
              <p>Accomodation</p>
            </div>

            <p className={"text-left text-black"}>Day and Boarding</p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
              <p>Accomodation</p>
            </div>

            <p className={"text-left text-black"}>Day and Boarding</p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
              <p>Accomodation</p>
            </div>

            <p className={"text-left text-black"}>Day and Boarding</p>
          </div>
        </div>
      </div>

      <div className={"text-gray-500 mb-3"}>
        <p>Payment Information</p>
        <hr className={"my-2"} />

        <div className={"text-sm"}>
          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
              <p>Accomodation</p>
            </div>

            <p className={"text-left text-black"}>Day and Boarding</p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
              <p>Accomodation</p>
            </div>

            <p className={"text-left text-black"}>Day and Boarding</p>
          </div>
        </div>
      </div>

      <div className={"mt-12 py-2"}>
        <hr />
        <button className={"text-error py-2 w-full"}>Suspend</button>
      </div>
    </section>
  );
}

function SummarySection() {
  const data = [
    { src: paperPlaneTilt, heading: 32806, text: "Schools on the platform" },
    { src: paperPlaneTilt, heading: 32806, text: "Schools on the platform" },
    { src: paperPlaneTilt, heading: 32806, text: "Schools on the platform" },
  ];

  return (
    <section className="flex flex-row items-center w-full justify-evenly gap-4">
      {data.map((d, index) => (
        <div
          key={index}
          className="flex flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 gap-4 w-1/3"
        >
          <div className={"bg-purple-50 p-2 rounded-3xl m-3"}>
            <img src={d.src} alt={"logo"} className={"w-8 h-8"} />
          </div>

          <div className="w-2/3 flex flex-col gap-1">
            <p className={"text-2xl font-bold"}>{d.heading}</p>
            <p className={"text-sm text-gray-500"}>{d.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function JobDetails() {
  return (
    <section className={"w-9/12 "}>
      <SummarySection />

      <Tabs.Root defaultValue={"job-posts"} className={"mt-3"}>
        <Tabs.List
          className={
            "bg-gray-100 w-fit p-2 rounded-lg *:px-4 *:py-2 *:rounded-lg"
          }
        >
          <Tabs.Trigger
            value={"job-posts"}
            className={"bg-white text-secondary"}
          >
            Job posts
          </Tabs.Trigger>

          <Tabs.Trigger value={"about-school"}>About School</Tabs.Trigger>
          <Tabs.Trigger value={"gallery"}>Gallery</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={"job-posts"}>
          <PostedJobsTab />
        </Tabs.Content>
        <Tabs.Content value={"about-school"}>
          <AboutSchoolTab />
        </Tabs.Content>
        <Tabs.Content value={"gallery"}>
          <GalleryTab />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

export default function SingleSchoolPage() {
  return (
    <>
      <SchoolTitleSection />

      <div className={"flex flex-row gap-3"}>
        <SchoolInfo />
        <JobDetails />
      </div>
    </>
  );
}
