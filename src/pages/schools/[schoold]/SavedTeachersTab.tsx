import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api";
import { zodResolver } from "@hookform/resolvers/zod";
import queryString from "query-string";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PaginationSection from "../../../components/PaginationSection";
import NoData from "../../../components/no-data";
import {
  InstitutionLevel,
  PaginatedResponse,
  Teacher,
  TeacherSave,
} from "../../../interfaces/api";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";

function TeachersTable(props: { saves: TeacherSave[] }) {
  const navigate = useNavigate();
  const { saves: views } = props;

  return (
    <>
      <div className={"table-container"}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Institutional Level</th>
              <th>Experience</th>
              <th>Saved On</th>
            </tr>
          </thead>
          <tbody>
            {views.map((save) => {
              return (
                <tr key={save.id}>
                  <th>{save.teacher_profile.teacher.full_name}</th>
                  <td>{save.teacher_profile.teacher.institution_level.name}</td>
                  <td>{save.teacher_profile.teacher.experience}</td>
                  <td>
                    {DateTime.fromISO(save.creation_time).toLocaleString({
                      locale: "en-gb",
                    })}
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
  from: z.string().optional(),
  to: z.string().optional(),
  institution_level: z.string().optional(),
});

function TeachersTableSection(props: {
  institutional_levels: InstitutionLevel[];
}) {
  const params = useParams();
  const { schoolId } = params as string;
  const { institutional_levels } = props;
  const [page, setPage] = useState(1);

  const { register, watch, reset } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const institution_level = watch("institution_level");
  const from = watch("from");
  const to = watch("to");

  useEffect(() => {
    const subscription = watch(() => setPage(1));
    return () => subscription.unsubscribe();
  }, [watch]);

  const query = queryString.stringify(
    {
      institution_level,
      page,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `api/v1/dashboard/school/profile/saves/${schoolId}/${query === "" ? "" : "?" + query}`;

  const { data } = useQuery<PaginatedResponse<Teacher>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
    placeholderData: (previousData) => previousData,
  });

  function clearFilter() {
    reset({
      institution_level: "",
      from: "",
      to: "",
    });
  }

  return (
    <section>
      {data !== undefined ? (
        <>
          {data.data.results.length !== 0 ? (
            <TeachersTable saves={data.data.results} />
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
export default function SavedTeachersTab() {
  const url = `api/v1/subjects/institution/levels/`;
  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <>
      {data !== undefined ? (
        <TeachersTableSection institutional_levels={data.data} />
      ) : null}
    </>
  );
}
