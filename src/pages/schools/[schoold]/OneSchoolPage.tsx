import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import * as Tabs from "@radix-ui/react-tabs";
import PostedJobsTab from "./PostedJobsTab.tsx";
import AboutSchoolTab from "./AboutSchoolTab.tsx";
import GalleryTab from "./GalleryTab.tsx";

function SchoolTitleSection() {
  return (
    <section className={"flex flex-row items-center justify-between"}>
      <div>
        <h1>Merishaw International school</h1>
        <p>Active</p>
      </div>
      <button>Edit School Profile</button>
    </section>
  );
}

function SchoolInfo() {
  return (
    <section className={"w-[400px] relative h-[800px]"}>
      <div>
        <img src={paperPlaneTilt} />
      </div>

      <div className={"flex flex-row items-center"}>
        <button className={"flex flex-row"}>
          <img src={paperPlaneTilt} />
          <p>call School</p>
        </button>

        <button className={"flex flex-row"}>
          <img src={paperPlaneTilt} />
          <p>Email School</p>
        </button>
      </div>

      <div>
        <p>Basic Info</p>
        <hr />

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <img src={paperPlaneTilt} />
            <p>Accomodation</p>
          </div>

          <p className={"text-left"}>Day and Boarding</p>
        </div>

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <img src={paperPlaneTilt} />
            <p>Accomodation</p>
          </div>

          <p className={"text-left"}>Day and Boarding</p>
        </div>

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <img src={paperPlaneTilt} />
            <p>Accomodation</p>
          </div>

          <p className={"text-left"}>Day and Boarding</p>
        </div>
      </div>

      <div>
        <p>Payment Information</p>
        <hr />

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <img src={paperPlaneTilt} />
            <p>Accomodation</p>
          </div>

          <p className={"text-left"}>Day and Boarding</p>
        </div>

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <img src={paperPlaneTilt} />
            <p>Accomodation</p>
          </div>

          <p className={"text-left"}>Day and Boarding</p>
        </div>

        <div className={"flex flex-row items-center"}>
          <div className={"flex flex-row items-center"}>
            <img src={paperPlaneTilt} />
            <p>Accomodation</p>
          </div>

          <p className={"text-left"}>Day and Boarding</p>
        </div>
      </div>

      <div className={"absolute bottom-0 w-full"}>
        <hr />
        <div>Suspend</div>
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
    <section className="flex flex-row items-center w-full justify-evenly gap-3">
      {data.map((d, index) => (
        <div key={index} className="flex flex-row items-center">
          <div className="w-1/3 bg-gray-200 p-3 rounded-3xl">
            <img src={d.src} alt={"paper-plane-tilt"} />
          </div>
          <div className="w-2/3 flex flex-col">
            <p className={"text-lg bold"}>{d.heading}</p>
            <p className={"text-sm text-nowrap"}>{d.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function JobDetails() {
  return (
    <section className={"w-full"}>
      <SummarySection />

      <Tabs.Root defaultValue={"job-posts"}>
        <Tabs.List>
          <Tabs.Trigger value={"job-posts"}>Job posts</Tabs.Trigger>

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

export default function OneSchoolPage() {
  return (
    <>
      <SchoolTitleSection />

      <div className={"flex flex-row"}>
        <SchoolInfo />
        <JobDetails />
      </div>
    </>
  );
}
