import filterList from "/icons/filter_list.svg";
import search from "/icons/search.svg";
import addWhite from "/icons/add_white.svg";
import queryString from "query-string";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import StatCard from "../../components/StatCard.tsx";
import * as Popover from "@radix-ui/react-popover";
import LoadingTable from "../../components/loading/LoadingTable.tsx";
import { PaginatedResponse, School } from "../../interfaces/api.ts";
import { DateTime } from "luxon";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const schema = z.object({
  gender: z.string().optional(),
  accommodation: z.string().optional(),
  county__name: z.string().optional(),
  sub_county__name: z.string().optional(),
  institution_level: z.string().optional(),
});

type ISchema = z.infer<typeof schema>;

function SchoolsTableSection() {
  const navigate = useNavigate();

  const { register, watch } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const gender = watch("gender");
  const accommodation = watch("accommodation");
  const institution_level = watch("institution_level");

  const query = queryString.stringify(
    {
      gender,
      accommodation,
      institution_level,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `api/v1/dashboard/schools/list/${query === "" ? "" : "?" + query}`;

  const { data, isLoading } = useQuery<PaginatedResponse<School>>({
    queryKey: [query],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <section>
      <div className={"flex flex-row items-center justify-between py-3 gap-4"}>
        {/*make filters work*/}
        <div className={"flex flex-row gap-3"}>
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="flex flex-row text-sm items-center gap-3 px-4 py-2  border border-gray-200 rounded-[32px]">
                <img src={filterList} alt={"filter"} />
                <p>Filter</p>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className={
                  "bg-white p-3 z-20 border border-gray-200 flex flex-row gap-3 text-xs"
                }
                side={"bottom"}
                sideOffset={5}
                align={"start"}
              >
                <div className={"flex flex-col gap-3"}>
                  <label className={"text-right text-xs"}>
                    Level of Institution
                  </label>
                  <label className={"text-right text-xs"}>Gender</label>
                  <label className={"text-right text-xs"}>Accommodation</label>
                </div>

                <div className={"flex flex-col gap-3"}>
                  <select
                    {...register("institution_level")}
                    className={"p-2 text-xs"}
                  >
                    <option value={""}>Select level of institution</option>
                    <option value={"ECDE"}>ECDE</option>
                    <option value={"Primary School"}>Primary School</option>
                    <option value={"High School"}>High School</option>
                  </select>

                  <select {...register("gender")} className={"p-2 text-xs"}>
                    <option value={""}>Select gender</option>
                    <option value={"Mixed"}>Mixed</option>
                    <option value={"Boys"}>Boys School</option>
                    <option value={"Girls"}>Girls School</option>
                  </select>

                  <select
                    {...register("accommodation")}
                    className={"p-2 text-xs"}
                  >
                    <option value={""}>Select accommodation</option>
                    <option value={"Mixed"}>Mixed</option>
                    <option value={"Day School"}>Day School</option>
                    <option value={"Boarding School"}>Boarding School</option>
                  </select>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <button className="flex flex-row text-sm items-center gap-3 px-4 py-2 border border-gray-200 rounded-[32px] w-[300px]">
            <img src={search} alt={"filter"} />
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
