import paperPlaneTilt from "/icons/paper-plane-tilt.svg";

function SummarySection() {
  const data = [
    { src: paperPlaneTilt, heading: 32806, text: "Schools on the platform" },
    { src: paperPlaneTilt, heading: 32806, text: "Schools on the platform" },
    { src: paperPlaneTilt, heading: 32806, text: "Schools on the platform" },
    { src: paperPlaneTilt, heading: 32806, text: "Schools on the platform" },
  ];

  return (
    <section className="flex flex-row items-center w-full justify-evenly gap-3">
      {data.map((d, index) => (
        <div key={index} className="flex flex-row items-center">
          <div className="w-1/3 bg-gray-200 p-3 rounded-3xl">
            <img src={d.src} alt={"paper-plane-tilt"} />
          </div>
          <div className="w-2/3 flex flex-col">
            <p className={"text-lg bold"}>{d.heading}</p>
            <p className={"text-sm text-nowrap"}>{d.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function SchoolsTableSection() {
  const schools = [
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
    {
      name: "Merishaw International",
      institutionalLevel: "Highschool",
      totalJobPosts: 5,
      location: "Westlands, Nairobi",
      phoneNumber: "+2547800020979",
      joinedOn: "May 12 2023",
    },
  ];
  return (
    <section>
      <div className={"flex flex-row"}>
        <button>Filter</button>
        <button>Search</button>
      </div>

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
          {schools.map((school, index) => {
            return (
              <tr key={index}>
                <td>{school.name}</td>
                <td>{school.institutionalLevel}</td>
                <td>{school.totalJobPosts}</td>
                <td>{school.location}</td>
                <td>{school.phoneNumber}</td>
                <td>{school.joinedOn}</td>
                <td>:</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={"flex flex-row justify-end items-center"}>
        <button>{"<"}</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>{">"}</button>
      </div>
    </section>
  );
}

function SchoolSection() {
  return (
    <section>
      <div className={"flex flex-row justify-between p-3 my-3"}>
        <div>
          <h1>Schools on Platform</h1>
          <p>
            Explore and manage the profiles of schools which have signed up onto
            the platform
          </p>
        </div>

        <button className={"flex flex-row items-center"}>
          <img src={paperPlaneTilt} />
          <p>Register School</p>
        </button>
      </div>

      <SchoolsTableSection />
    </section>
  );
}

export default function SchoolPage() {
  return (
    <>
      <SummarySection />
      <SchoolSection />
    </>
  );
}
