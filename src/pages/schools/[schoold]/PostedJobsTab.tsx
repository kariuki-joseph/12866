import filterList from "/icons/filter_list.svg";
import expandMore from "/icons/expand_more.svg";

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
      <div className={"flex flex-row items-center py-3 gap-4"}>
        <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px]">
          <img src={filterList} alt={"filter"} />
          <p>Filter by</p>
          <img src={expandMore} alt={"expand more"} />
        </button>

        <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px] w-[300px]">
          <img src={filterList} alt={"filter"} />
          <p>Search</p>
        </button>
      </div>

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
      </div>
    </section>
  );
}

export default function PostedJobsTab() {
  return (
    <section>
      <div className={"flex flex-row items-center justify-between"}>
        <p className={"text-lg font-bold"}>Posted jobs</p>
        <button className={"btn-outlined"}>Post new job</button>
      </div>

      <hr className={"my-2"} />

      <SchoolsTableSection />
    </section>
  );
}
