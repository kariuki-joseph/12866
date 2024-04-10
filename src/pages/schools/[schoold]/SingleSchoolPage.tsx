import mail from "/icons/mail.svg";
import call from "/icons/call.svg";
import hotel from "/icons/hotel.svg";
import male from "/icons/male.svg";
import businessCenter from "/icons/business_center.svg";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import * as Tabs from "@radix-ui/react-tabs";
import PostedJobsTab from "./PostedJobsTab.tsx";
import AboutSchoolTab from "./AboutSchoolTab.tsx";
import GalleryTab from "./GalleryTab.tsx";
import { useParams } from "react-router-dom";
import { School } from "../../../interfaces/api.ts";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import weteachApi from "../../../configs/weteach-api.ts";
import LoadingSpinner from "../../../components/loading/LoadingSpinner.tsx";
import { DateTime } from "luxon";

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
              "text-sm rounded-3xl px-3 py-1 bg-green-100 text-green-950 w-fit"
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

      {/*<Popover.Root>*/}
      {/*  <Popover.Trigger asChild>*/}
      {/*    <button className={"btn-outlined"}>Edit School Profile</button>*/}
      {/*  </Popover.Trigger>*/}
      {/*  <Popover.Portal>*/}
      {/*    <Popover.Content*/}
      {/*      sideOffset={6}*/}
      {/*      align={"end"}*/}
      {/*      className={*/}
      {/*        "rounded-lg text-sm flex flex-col py-1 *:py-2 *:px-3 text-gray-500 right-10 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"*/}
      {/*      }*/}
      {/*    >*/}
      {/*      <Link*/}
      {/*        to={"school-description/edit"}*/}
      {/*        className={"hover:bg-gray-100 hover:text-black"}*/}
      {/*      >*/}
      {/*        School Description*/}
      {/*      </Link>*/}
      {/*      <Link*/}
      {/*        to={"school/1/school-description/edit"}*/}
      {/*        className={"hover:bg-gray-100 hover:text-black"}*/}
      {/*      >*/}
      {/*        Contact Details*/}
      {/*      </Link>*/}
      {/*      <Link*/}
      {/*        to={"school/1/school-description/edit"}*/}
      {/*        className={"hover:bg-gray-100 hover:text-black"}*/}
      {/*      >*/}
      {/*        Location Details*/}
      {/*      </Link>*/}
      {/*      <Link*/}
      {/*        to={"school/1/school-description/edit"}*/}
      {/*        className={"hover:bg-gray-100 hover:text-black"}*/}
      {/*      >*/}
      {/*        School Gallery*/}
      {/*      </Link>*/}
      {/*      <Link*/}
      {/*        to={"school/1/school-description/edit"}*/}
      {/*        className={"hover:bg-gray-100 hover:text-black"}*/}
      {/*      >*/}
      {/*        Change password*/}
      {/*      </Link>*/}
      {/*    </Popover.Content>*/}
      {/*  </Popover.Portal>*/}
      {/*</Popover.Root>*/}
    </section>
  );
}

interface SchoolInfoProps {
  school: School;
}

function SchoolInfo(props: SchoolInfoProps) {
  const { school } = props;

  return (
    <section
      className={
        "w-3/12 relative h-fit bg-white border border-gray-200 rounded px-4 pt-3 "
      }
    >
      <div className={"bg-gray-50 p-2 rounded-[42px] w-fit mx-auto mb-3"}>
        <img src={paperPlaneTilt} className={"w-12 h-12"} />
      </div>

      <div
        className={
          "flex flex-row items-center gap-2 text-sm text-nowrap mb-6 text-secondary"
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
        <p>Basic Information</p>
        <hr className={"my-2"} />

        <div className={"text-sm"}>
          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={hotel} className={"w-5 h-5"} alt={"hotel"} />
              <p>Accommodation</p>
            </div>

            <p className={"text-left text-black"}>{school.accommodation}</p>
          </div>

          <div className={"flex flex-row items-center justify-between py-3"}>
            <div className={"flex flex-row items-center gap-2"}>
              <img src={male} className={"w-5 h-5"} />
              <p>Gender</p>
            </div>

            <p className={"text-left text-black"}>{school.gender}</p>
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

      <div className={"text-gray-500 mb-3"}>
        <p>Payment Information</p>
        <hr className={"my-2"} />

        {/*<div className={"text-sm"}>*/}
        {/*  <div className={"flex flex-row items-center justify-between py-3"}>*/}
        {/*    <div className={"flex flex-row items-center gap-2"}>*/}
        {/*      <img src={accountBalalance} className={"w-5 h-5"} alt={"bankc"} />*/}
        {/*      <p>Accomodation</p>*/}
        {/*    </div>*/}

        {/*    <p className={"text-left text-black"}>Day and Boarding</p>*/}
        {/*  </div>*/}

        {/*  <div className={"flex flex-row items-center justify-between py-3"}>*/}
        {/*    <div className={"flex flex-row items-center gap-2"}>*/}
        {/*      <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />*/}
        {/*      <p>Accomodation</p>*/}
        {/*    </div>*/}

        {/*    <p className={"text-left text-black"}>Day and Boarding</p>*/}
        {/*  </div>*/}
        {/*</div>*/}
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
  const { schoolId } = useParams();

  const url = `dashboard/school/get/${schoolId}/`;

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
