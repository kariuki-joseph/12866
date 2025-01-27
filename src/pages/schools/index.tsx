import search from "/icons/search.svg";
import addWhite from "/icons/add_white.svg";
import queryString from "query-string";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import StatCard from "../../components/StatCard.tsx";
import {
  AxiosResponse,
  InstitutionLevel,
  PaginatedResponse,
  School,
} from "../../interfaces/api.ts";
import { DateTime } from "luxon";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import PaginationSection from "../../components/PaginationSection.tsx";
import school_primary from "/icons/school_primary.svg";
import payments_primary from "/icons/payments_primary.svg";
import NoData from "../../components/no-data.tsx";

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
        imageSrc={school_primary}
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
        imageSrc={payments_primary}
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
                  <td>
                    {school.institution_level.map((v, index) => (
                      <span key={v.id}>
                        {v.name}
                        {index !== school.institution_level.length - 1
                          ? ","
                          : null}
                      </span>
                    ))}
                  </td>
                  <td>{school.job_post_count}</td>
                  <td>{school.formated_address ?? "-"}</td>
                  <td>{school.phone_number}</td>
                  <td>
                    {DateTime.fromISO(school.creation_time).toLocaleString()}
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
  gender: z.string().optional(),
  name: z.string().optional(),
  accommodation: z.string().optional(),
  county__name: z.string().optional(),
  sub_county__name: z.string().optional(),
  institution_level: z.string().optional(),
});

type ISchema = z.infer<typeof schema>;

function SchoolsTableSection(props: {
  institution_levels: InstitutionLevel[];
}) {
  const { institution_levels } = props;
  const [page, setPage] = useState(1);

  const { register, watch } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const gender = watch("gender");
  const accommodation = watch("accommodation");
  const institution_level = watch("institution_level");
  const name = watch("name");

  useEffect(() => {
    const subscription = watch(() => setPage(1));
    return () => subscription.unsubscribe();
  }, [watch]);

  const query = queryString.stringify(
    {
      gender,
      accommodation,
      institution_level,
      search: name,
      page,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `api/v1/dashboard/schools/list/${query === "" ? "" : "?" + query}`;

  const { data } = useQuery<PaginatedResponse<School>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
    placeholderData: (previousData) => previousData,
  });

  return (
    <section>
      <div className={"flex flex-row items-center justify-between py-3 gap-4"}>
        <div className={"flex flex-row gap-3"}>
          <div className={"flex flex-row gap-3 items-center"}>
            <select
              {...register("institution_level")}
              className={"p-2 text-xs"}
            >
              <option value={""}>Select level of institution</option>

              {institution_levels.map((institution_level) => (
                <option value={institution_level.id} key={institution_level.id}>
                  {institution_level.name}
                </option>
              ))}
            </select>

            <select {...register("gender")} className={"p-2 text-xs"}>
              <option value={""}>Select gender</option>
              <option value={"Mixed"}>Mixed</option>
              <option value={"Boys"}>Boys School</option>
              <option value={"Girls"}>Girls School</option>
            </select>

            <select {...register("accommodation")} className={"p-2 text-xs"}>
              <option value={""}>Select accommodation</option>
              <option value={"Mixed"}>Mixed</option>
              <option value={"Day School"}>Day School</option>
              <option value={"Boarding School"}>Boarding School</option>
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

        <Link className={"btn"} to={"schools/register"}>
          <img src={addWhite} alt={"add"} />
          <p className={"font-bold"}>Register School</p>
        </Link>
      </div>

      {data !== undefined ? (
        <>
          {data.data.results.length !== 0 ? (
            <>
              <SchoolsTable schools={data.data.results} />
            </>
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

function SchoolSection() {
  const institution_levels_url = "api/v1/subjects/institution/levels/";

  const { data } = useQuery<AxiosResponse<InstitutionLevel[]>>({
    queryKey: [institution_levels_url],
    queryFn: () => weteachApi.get(institution_levels_url),
    placeholderData: (previousData) => previousData,
  });

  return (
    <section>
      <div className={""}>
        <h1 className={"font-bold text-lg"}>Schools on Platform</h1>
        <p className={"text-sm text-gray-500"}>
          Explore and manage the profiles of schools which have signed up onto
          the platform
        </p>
      </div>

      {data !== undefined ? (
        <SchoolsTableSection institution_levels={data.data} />
      ) : null}
    </section>
  );
}

export default function SchoolsPage() {
  return (
    <>
      <SchoolsStats />
      <SchoolSection />
    </>
  );
}
