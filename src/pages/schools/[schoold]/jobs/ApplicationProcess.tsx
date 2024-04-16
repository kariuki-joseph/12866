import mail from "/icons/mail.svg";
import content_copy from "/icons/content_copy.svg";
import call from "/icons/call.svg";
import language from "/icons/language.svg";
import { Job } from "../../../../interfaces/api.ts";

export default function ApplicationProcess({ job }: { job: Job }) {
  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Copying to clipboard was successful!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  }

  return (
    <section className={"flex flex-row gap-3"}>
      <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
        <p className={"font-bold mb-3 text-sm"}>How To Apply</p>

        <p className={"text-sm text-gray-500"}>{job.how_to_apply ?? "-s"}</p>
      </div>

      <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
        <p className={"font-bold mb-3 text-sm"}>Contact Information</p>

        <div className={"text-gray-500 mb-6 text-sm"}>
          <p>Email</p>

          <hr className={"my-1"} />

          <div
            className={
              "flex flex-row items-center justify-between py-3 text-xs"
            }
          >
            <div className={"flex flex-row items-center gap-2"}>
              <img src={mail} className={"w-5 h-5"} />
              <p className={"text-xs"}>{job.school.primary_email}</p>
            </div>

            <button
              className={"flex flex-row items-center gap-2"}
              onClick={() => handleCopy(job.school.primary_email)}
            >
              <img
                src={content_copy}
                className={"w-5 h-5"}
                alt={content_copy}
              />
              <span>copy</span>
            </button>
          </div>
        </div>

        <div className={"text-gray-500 mb-6 text-sm"}>
          <p>Phone Number</p>
          <hr className={"my-1"} />

          <div
            className={
              "flex flex-row items-center justify-between py-3 text-xs"
            }
          >
            <div className={"flex flex-row items-center gap-2"}>
              <img src={call} className={"w-5 h-5"} />
              <p className={"text-xs"}>{job.school.phone_number}</p>
            </div>

            <button
              className={"flex flex-row items-center gap-2"}
              onClick={() => handleCopy(job.school.phone_number)}
            >
              <img
                src={content_copy}
                className={"w-5 h-5"}
                alt={content_copy}
              />
              <span>copy</span>
            </button>
          </div>
        </div>

        <div className={"text-gray-500 text-sm"}>
          <p>Website</p>
          <hr className={"my-1"} />

          <div
            className={
              "flex flex-row items-center justify-between py-3 text-xs"
            }
          >
            <div className={"flex flex-row items-center gap-2"}>
              <img src={language} className={"w-5 h-5"} />
              <a
                href={"https://" + job.school.web_site}
                target={"_blank"}
                className={"text-xs underline"}
              >
                {job.school.web_site}
              </a>
            </div>

            <button
              className={"flex flex-row items-center gap-2"}
              onClick={() => handleCopy(job.school.web_site)}
            >
              <img
                src={content_copy}
                className={"w-5 h-5"}
                alt={content_copy}
              />
              <span>copy</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
