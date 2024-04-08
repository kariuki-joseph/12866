import * as Select from "@radix-ui/react-select";

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

export default function PostedJobsTab() {
  return (
    <section>
      <div className={"flex flex-row items-center justify-between"}>
        <p>Posted jobs</p>
        <button>Post new job</button>
      </div>

      <div className={"flex flex-row items-center"}>
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Post status" />
            <Select.Icon>\ /</Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Item value={"open"}>Open</Select.Item>
                <Select.Item value={"closed"}>Closed</Select.Item>
              </Select.Viewport>
              <Select.ScrollDownButton />
              <Select.Arrow />
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Publicity Package" />
            <Select.Icon>\ /</Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Item value={"open"}>Open</Select.Item>
                <Select.Item value={"closed"}>Closed</Select.Item>
              </Select.Viewport>
              <Select.ScrollDownButton />
              <Select.Arrow />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <SchoolsTableSection />
    </section>
  );
}
