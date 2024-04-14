import filterList from "/icons/filter_list.svg";
import addWhite from "/icons/add_white.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import StatCard from "../../components/StatCard.tsx";
import LoadingTable from "../../components/loading/LoadingTable.tsx";
import { PaginatedResponse, Teacher } from "../../interfaces/api.ts";
import { DateTime } from "luxon";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import queryString from "query-string";
import * as Popover from "@radix-ui/react-popover";
import search from "/icons/search.svg";

function TeacherStats() {
  const url = "api/v1/dashboard/teachers/statistics/";

  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  if (isLoading) return <LoadingBlocks numberOfBlocks={4} />;

  return (
    <section className="flex flex-row w-full justify-evenly gap-4 mb-3">
      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.total_teachers}
        text={"Teachers on the platform"}
      />

      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.paying_customers}
        text={"Paying Customers"}
      />

      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.avg_post_views}
        text={"Average Posts Views"}
      />

      <StatCard
        imageSrc={paperPlaneTilt}
        title={data?.data.post_total_spending}
        text={"Spend on posts"}
      />
    </section>
  );
}

interface TeachersTableProps {
  teachers: Teacher[];
}

function TeachersTable(props: TeachersTableProps) {
  const navigate = useNavigate();
  const { teachers } = props;

  return (
    <>
      <div className={"table-container"}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Institutional Level</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Joined On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => {
              return (
                <tr
                  className={"hover:cursor-pointer"}
                  onClick={() => navigate(`/teachers/${teacher.id}`)}
                  key={teacher.id}
                >
                  <th>{teacher.full_name}</th>
                  <td>{teacher.institution_level}</td>
                  <td>{teacher.experience}</td>
                  <td>{teacher.formated_address}</td>
                  <td>
                    {DateTime.fromISO(teacher.creation_time).toLocaleString({
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
  name: z.string().optional(),
  qualifications__name: z.string().optional(),
  county__name: z.string().optional(),
  sub_county__name: z.string().optional(),
  institution_level: z.string().optional(),
});

type ISchema = z.infer<typeof schema>;

function SchoolsTableSection() {
  const [page, setPage] = useState(1);

  const { register, watch, reset } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const name = watch("name");
  const institution_level = watch("institution_level");

  useEffect(() => {
    const subscription = watch(() => setPage(1));
    return () => subscription.unsubscribe();
  }, [watch]);

  const query = queryString.stringify(
    {
      institution_level,
      name,
      page,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `/api/v1/dashboard/teachers/list/${query === "" ? "" : "?" + query}`;

  const { data, isLoading } = useQuery<PaginatedResponse<Teacher>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  function clearFilter() {
    reset({
      institution_level: "",
    });
  }

  return (
    <section>
      <div className={"flex flex-row items-center justify-between py-3 gap-4"}>
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
                className={"bg-white p-3 z-20 border border-gray-200 text-xs"}
                side={"bottom"}
                sideOffset={5}
                align={"start"}
              >
                <div
                  className={
                    "flex flex-row gap-3 border-b border-gray-200 pb-3 mt-3"
                  }
                >
                  <div className={"flex flex-col gap-3"}>
                    <label className={"text-right text-xs"}>
                      Level of Institution
                    </label>
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
                  </div>
                </div>

                <button
                  className={"w-full text-secondary text-sm pt-3"}
                  onClick={() => clearFilter()}
                >
                  Clear filter
                </button>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <label className="flex flex-row text-sm items-center gap-3 px-4 py-0 border border-gray-200 rounded-[32px] w-[300px]">
            <img src={search} alt={"filter"} />
            <input
              {...register("name")}
              type={"search"}
              placeholder={"Search"}
              className={"py-0  text-regular h-full border-0 focus:outline-0"}
            />
          </label>
        </div>

        <Link className={"btn"} to={"teachers/register"}>
          <img src={addWhite} alt={"add"} />
          <p className={"font-bold"}>Register Teacher</p>
        </Link>
      </div>
      {isLoading ? <LoadingTable /> : null}
      {data !== undefined ? (
        <TeachersTable teachers={data.data.results} />
      ) : null}
    </section>
  );
}

function TeachersSection() {
  return (
    <section>
      <h1 className={"font-bold text-lg"}>Teachers on Platform</h1>
      <p className={"text-sm text-gray-500"}>
        Explore and manage the profiles of teacher who have signed up onto the
        platform
      </p>

      <SchoolsTableSection />
    </section>
  );
}

export default function TeachersPage() {
  return (
    <>
      <TeacherStats />
      <TeachersSection />
    </>
  );
}
