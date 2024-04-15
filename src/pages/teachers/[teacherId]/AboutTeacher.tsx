import { Teacher } from "../../../interfaces/api.ts";
import location_on from "/icons/location_on.svg";

export default function AboutTeacher({ teacher }: { teacher: Teacher }) {
  return (
    <section className={"flex flex-row gap-3"}>
      <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
        <p className={"font-bold mb-3 text-sm"}>Qualifications</p>

        <div className={"text-gray-500 mb-6 text-sm"}>
          <p>Subjects & Skills</p>

          <hr className={"my-1"} />

          <ul>
            {teacher.qualifications.map((qualifiication) => (
              <li key={qualifiication.id}> - {qualifiication.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
        <p className={"font-bold mb-3 text-sm"}>Location Information</p>

        <div className={"text-gray-500 mb-6 text-sm"}>
          <p>Region</p>
          <hr className={"my-1"} />

          <div className={"flex flex-row items-center gap-2 py-3"}>
            <img src={location_on} className={"w-5 h-5"} />
            <p className={"text-xs"}>
              <b>County: </b>
              {teacher.county !== null ? teacher.county.name : "-"}
            </p>
          </div>

          <div className={"flex flex-row items-center gap-2 py-3"}>
            <img src={location_on} className={"w-5 h-5"} />
            <p className={"text-xs"}>
              <b>Sub-County: </b>
              {teacher.sub_county !== null ? teacher.sub_county.name : "-"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
