import filterList from "/icons/filter_list.svg";
import expandMore from "/icons/expand_more.svg";
import addWhite from "/icons/add_white.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import StatCard from "../../components/StatCard.tsx";
import LoadingTable from "../../components/loading/LoadingTable.tsx";
import { PaginatedResponse, School } from "../../interfaces/api.ts";
import { DateTime } from "luxon";

function SchoolsStats() {
  const url = "api/v1/dashboard/schools/statistics/";

  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  if (isLoading) return <LoadingBlocks numberOfBlocks={4} />;

  return (
    <section className="flex flex-row w-full justify-evenly gap-4 mb-3">
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

interface SchoolsTableProps {
  schools: School[];
}

function SchoolsTable(props: SchoolsTableProps) {
  const navigate = useNavigate();
  const { schools } = props;

  return (
    <>
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
            {schools.map((school) => {
              return (
                <tr
                  className={"hover:cursor-pointer"}
                  onClick={() => navigate(`/schools/${school.id}`)}
                  key={school.id}
                >
                  <th>{school.name}</th>
                  <td>{school.institution_level}</td>
                  <td>{school.job_post_count}</td>
                  <td>{school.formated_address}</td>
                  <td>{school.phone_number}</td>
                  <td>
                    {DateTime.fromISO(school.creation_time).toLocaleString({
                      locale: "en-gb",
                    })}
                  </td>

                  <td>:</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SchoolsTableSection() {
  const navigate = useNavigate();

  const url = "api/v1/dashboard/schools/list/";
  const { data, isLoading } = useQuery<PaginatedResponse<School>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <section>
      <div className={"flex flex-row items-center justify-between py-3 gap-4"}>
        {/*make filters work*/}
        <div className={"flex flex-row gap-3"}>
          <button className="flex flex-row text-sm items-center gap-3 px-4 py-2  border border-gray-200 rounded-[32px]">
            <img src={filterList} alt={"filter"} />
            <p>Filter by</p>
            <img src={expandMore} alt={"expand more"} />
          </button>
          <button className="flex flex-row text-sm items-center gap-3 px-4 py-2 border border-gray-200 rounded-[32px] w-[300px]">
            <img src={filterList} alt={"filter"} />
            <p>Search</p>
          </button>
        </div>

        <Link className={"btn"} to={"schools/register"}>
          <img src={addWhite} alt={"add"} />
          <p className={"font-bold"}>Register School</p>
        </Link>
      </div>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <SchoolsTable schools={data.data.results} />
      )}
      {/*<div className={"flex flex-row justify-end items-center"}>*/}
      {/*  <button>{"<"}</button>*/}
      {/*  <button>1</button>*/}
      {/*  <button>2</button>*/}
      {/*  <button>3</button>*/}
      {/*  <button>{">"}</button>*/}
      {/*</div>*/}
    </section>
  );
}

function SchoolSection() {
  return (
    <section>
      <div className={""}>
        <h1 className={"font-bold text-lg"}>Schools on Platform</h1>
        <p className={"text-sm text-gray-500"}>
          Explore and manage the profiles of schools which have signed up onto
          the platform
        </p>
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
