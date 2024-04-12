import content_copy from "/icons/content_copy.svg";
import mail from "/icons/mail.svg";
import call from "/icons/call.svg";
import location_on from "/icons/location_on.svg";
import language from "/icons/language.svg";
import { School } from "../../../interfaces/api.ts";

interface AboutSchoolTabProps {
  school: School;
}

export default function AboutSchoolTab(props: AboutSchoolTabProps) {
  const { school } = props;

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
    <section>
      <div className={"px-6 py-5 border border-gray-200 rounded-lg mb-3"}>
        <p className={"font-bold mb-2 text-sm "}>School Bio</p>
        <p className={"text-sm text-gray-500 text-justify"}>
          {school.about ?? "-"}
        </p>
      </div>

      <div className={"flex flex-row gap-4"}>
        <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
          <p className={"font-bold mb-3 text-sm"}>Contact Us</p>

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
                <p className={"text-xs"}>{school.primary_email}</p>
              </div>

              <button
                className={"flex flex-row items-center gap-2"}
                onClick={() => handleCopy(school.primary_email)}
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
                <p className={"text-xs"}>{school.phone_number}</p>
              </div>

              <button
                className={"flex flex-row items-center gap-2"}
                onClick={() => handleCopy(school.phone_number)}
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
                  href={"https://" + school.web_site}
                  target={"_blank"}
                  className={"text-xs underline"}
                >
                  {school.web_site}
                </a>
              </div>

              <button
                className={"flex flex-row items-center gap-2"}
                onClick={() => handleCopy(school.web_site)}
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

        <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
          <p className={"font-bold mb-3 text-sm"}>Location Information</p>

          <div className={"text-gray-500 mb-6 text-sm"}>
            <p>Region</p>
            <hr className={"my-1"} />

            <div className={"flex flex-row items-center gap-2 py-3"}>
              <img src={location_on} className={"w-5 h-5"} />
              <p className={"text-xs"}>
                <b>County: </b>
                {school.county !== null ? school.county.name : "-"}
              </p>
            </div>

            <div className={"flex flex-row items-center gap-2 py-3"}>
              <img src={location_on} className={"w-5 h-5"} />
              <p className={"text-xs"}>
                <b>Sub-County: </b>
                {school.sub_county !== null ? school.sub_county.name : "-"}
              </p>
            </div>

            <div className={"flex flex-row items-center gap-2 py-3"}>
              <img src={location_on} className={"w-5 h-5"} />
              <p className={"text-xs"}>
                <b>Location: </b>
                {school.formated_address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
