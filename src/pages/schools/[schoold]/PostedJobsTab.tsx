import filterList from "/icons/filter_list.svg";
import addSecondary from "/icons/add_secondary.svg";
import expandMore from "/icons/expand_more.svg";
import search from "/icons/search.svg";

export default function PostedJobsTab() {
  return (
    <section>
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"flex flex-row gap-3"}>
          <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px]">
            <img src={filterList} alt={"filter"} />
            <p>Filter by</p>
            <img src={expandMore} alt={"expand more"} />
          </button>

          <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px] w-[300px]">
            <img src={search} alt={"search"} />
            <p>Search</p>
          </button>
        </div>
        <button className={"btn-outlined"}>
          <img src={addSecondary} className={"w-6 h-6"} />
          <span>Post new job</span>
        </button>
      </div>
    </section>
  );
}
