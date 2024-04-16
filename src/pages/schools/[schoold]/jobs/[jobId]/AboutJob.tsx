import { Job } from "../../../../../interfaces/api.ts";

export default function AboutJob({ job }: { job: Job }) {
  return (
    <section className={"flex flex-col gap-3"}>
      <div className={"flex flex-row gap-3"}>
        <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
          <p className={"font-bold mb-3 text-sm"}>Subjects & Skills</p>

          <ul className={"text-sm text-gray-500"}>
            {job.teacher_requirements.map((qualifiication) => (
              <li key={qualifiication.id}> - {qualifiication.name}</li>
            ))}
          </ul>
        </div>

        <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
          <p className={"font-bold mb-3 text-sm"}>
            Duties and responsibilities
          </p>

          <p className={"text-justify text-sm text-gray-500"}>
            {job.duties_and_responsibilities ?? "-"}
          </p>
        </div>
      </div>
      <div className={"px-6 py-5 border border-gray-200 rounded-lg w-full"}>
        <p className={"font-bold mb-3 text-sm"}>Requirements</p>

        <div className={"text-gray-500 mb-6 text-sm"}>
          <p>Minimum Requirements</p>
          <hr className={"my-1"} />

          <p className={"text-xs"}>{job.minimum_requirements ?? "-"}</p>
        </div>

        <div className={"text-gray-500 mb-6 text-sm"}>
          <p>Additional Requirements</p>
          <hr className={"my-1"} />

          <p className={"text-xs"}>{job.additional_requirements ?? "-"}</p>
        </div>
      </div>
    </section>
  );
}
