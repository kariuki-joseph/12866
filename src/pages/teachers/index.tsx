import addWhite from "/icons/add_white.svg";
import person from "/icons/person.svg";
import attach_money from "/icons/attach_money.svg";
import visibility from "/icons/visibility.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import StatCard from "../../components/StatCard.tsx";
import LoadingTable from "../../components/loading/LoadingTable.tsx";
import {
  InstitutionLevel,
  PaginatedResponse,
  Teacher,
} from "../../interfaces/api.ts";
import { DateTime } from "luxon";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import queryString from "query-string";
import search from "/icons/search.svg";
import PaginationSection from "../../components/PaginationSection.tsx";
import NoData from "../../components/no-data.tsx";

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
        imageSrc={person}
        title={data?.data.total_teachers}
        text={"Teachers on the platform"}
      />

      <StatCard
        imageSrc={visibility}
        title={data?.data.publicised_profiles}
        text={"Publicized Profiles"}
      />

      <StatCard
        imageSrc={attach_money}
        title={data?.data.total_post_payments}
        text={"Spend on Posting Profiles"}
      />

      <StatCard
        imageSrc={attach_money}
        title={data?.data.total_view_payments}
        text={"Spend on Job Views"}
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
              <th>Job Views</th>
              <th>Profile Status</th>
              <th>Profile Impressions</th>
              <th>Joined On</th>
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
                  <td>{teacher.institution_level.name}</td>
                  <td>{teacher.experience}</td>
                  <td>{teacher.formated_address}</td>
                  <td>{teacher.job_view_count}</td>
                  <td>
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
                  </td>
                  <td>{teacher.profile_view_count}</td>
                  <td>
                    {DateTime.fromISO(teacher.creation_time).toLocaleString()}
                  </td>

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

function TeachersTableSection(props: {
  institutional_levels: InstitutionLevel[];
}) {
  const { institutional_levels } = props;
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
      institution_level__id: institution_level,
      search: name,
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
    placeholderData: (previousData) => previousData,
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
          <div className={"flex flex-col gap-3"}>
            <select
              {...register("institution_level")}
              className={"p-2 text-xs"}
            >
              <option value={""}>Select level of institution</option>
              {institutional_levels.map((institutional_level) => (
                <option
                  value={institutional_level.id}
                  key={institutional_level.id}
                >
                  {institutional_level.name}
                </option>
              ))}
            </select>
          </div>

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

        <Link className={"btn"} to={"register"}>
          <img src={addWhite} alt={"add"} />
          <p className={"font-bold"}>Register Teacher</p>
        </Link>
      </div>
      {isLoading ? <LoadingTable /> : null}

      {data !== undefined ? (
        <>
          {data.data.results.length !== 0 ? (
            <TeachersTable teachers={data.data.results} />
          ) : (
            <NoData />
          )}

          <PaginationSection
            page={page}
            total={data.data.count}
            setPage={setPage}
          />
        </>
      ) : null}
    </section>
  );
}

function TeachersSection() {
  const url = `api/v1/subjects/institution/levels/`;
  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <section>
      <h1 className={"font-bold text-lg"}>Teachers on Platform</h1>
      <p className={"text-sm text-gray-500"}>
        Explore and manage the profiles of teacher who have signed up onto the
        platform
      </p>

      {data !== undefined ? (
        <TeachersTableSection institutional_levels={data.data} />
      ) : null}
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
