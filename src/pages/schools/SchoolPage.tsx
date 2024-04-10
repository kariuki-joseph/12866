import addWhite from "/icons/add_white.svg";
import filterList from "/icons/filter_list.svg";
import expandMore from "/icons/expand_more.svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import StatCard from "../../components/StatCard.tsx";

function SchoolsStats() {
  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: () =>
      weteachApi.get(
        "https://weteach.glitexsolutions.co.ke/api/v1/dashboard/schools/statistics/",
      ),
  });

  if (isLoading) return <LoadingBlocks numberOfBlocks={4} />;

  return (
    <section className="flex flex-row w-full justify-evenly gap-4">
      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.total_schools}
        text={"Schools on the platform"}
      />

      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.posting_schools}
        text={"Posting Schools"}
      />

      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.avg_school_posts}
        text={"Average Posts per School"}
      />

      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.post_total_spending}
        text={"Spend on posts"}
      />
    </section>
  );
}

function SchoolsTableSection() {
  const navigate = useNavigate();

  const schools = [
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
  ];
  return (
    <section>
      <div className={"flex flex-row items-center py-3 gap-4"}>
        <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px]">
          <img src={filterList} alt={"filter"} />
          <p>Filter by</p>
          <img src={expandMore} alt={"expand more"} />
        </button>
        <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px] w-[300px]">
          <img src={filterList} alt={"filter"} />
          <p>Search</p>
        </button>
      </div>

      <div className={"table-container"}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Institutional Level</th>
              <th>Total Job Posts</th>
              <th>Locations</th>
              <th>Phone number</th>
              <th>Joined On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => {
              return (
                <tr
                  className={"hover:cursor-pointer"}
                  onClick={() => navigate("/schools/1")}
                >
                  <td>{school.name}</td>
                  <td>{school.institutionalLevel}</td>
                  <td>{school.totalJobPosts}</td>
                  <td>{school.location}</td>
                  <td>{school.phoneNumber}</td>
                  <td>{school.joinedOn}</td>
                  <td>:</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={"flex flex-row justify-end items-center"}>
        <button>{"<"}</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>{">"}</button>
      </div>
    </section>
  );
}

function SchoolSection() {
  return (
    <section>
      <div className={"flex flex-row justify-between py-3 my-3"}>
        <div>
          <h1 className={"font-bold text-lg"}>Schools on Platform</h1>
          <p className={"text-sm text-gray-500"}>
            Explore and manage the profiles of schools which have signed up onto
            the platform
          </p>
        </div>

        <button className={"btn"}>
          <img src={addWhite} alt={"add"} />
          <p className={"font-bold"}>Register School</p>
        </button>
      </div>

      <SchoolsTableSection />
    </section>
  );
}

export default function SchoolPage() {
  return (
    <>
      <SchoolsStats />
      <SchoolSection />
    </>
  );
}
