import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import StatCard from "../../components/StatCard.tsx";
import tune from "/icons/tune.svg";
import visibility from "/icons/visibility.svg";
import attach_money from "/icons/attach_money.svg";
import * as Tabs from "@radix-ui/react-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import JobPayments from "./JobPayments.tsx";
import ViewPayments from "./ViewPayments.tsx";
import { Link } from "react-router-dom";
import ProfilePostPayment from "./ProfilePostPayments.tsx";
import ProfileViewPayments from "./ProfileViewPayments.tsx";

function FinanceStats() {
  const url = "api/v1/dashboard/finances/statistics/";

  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  if (isLoading)
    return (
      <div className={"mb-3"}>
        <LoadingBlocks numberOfBlocks={4} />
      </div>
    );

  return (
    <section className="flex flex-row w-full justify-evenly gap-4 mb-3">
      <StatCard
        imageSrc={attach_money}
        title={data?.data.total_revenue}
        text={"Total Platform Revenue"}
      />

      <StatCard
        imageSrc={attach_money}
        title={data?.data.job_post_revenue}
        text={"Revenue from Job Posts"}
      />

      <StatCard
        imageSrc={attach_money}
        title={data?.data.job_view_revenue}
        text={"Revenue from Job Views"}
      />

      <StatCard
        imageSrc={visibility}
        title={data?.data.post_publicity_packages}
        text={"Post Publicity Packages"}
      />
    </section>
  );
}

export default function FinancesPage() {
  return (
    <>
      <FinanceStats />

      <div
        className={
          "flex flex-row justify-between p-6 bg-gradient-to-r from-[#E2E3FF]  to-[#F8E2FF] rounded-lg mb-3"
        }
      >
        <div className={""}>
          <h1 className={"text-lg font-bold mb-2"}>Manage Payment Packages</h1>
          <p className={"text-sm text-gray-700"}>
            Set up the amounts paid to view job posts as well as the cost of
            different post publicity packages for schools
          </p>
        </div>
        <Link
          className={
            "flex flex-row items-center text-secondary gap-4 bg-white py-1 px-6 rounded"
          }
          to={"manage"}
          relative={"path"}
        >
          <img src={tune} alt={"tune"} className={"w-5 h-5"} />
          <span>Manage</span>
        </Link>
      </div>

      <h1 className={"text-lg font-bold"}>Finances</h1>
      <p className={"text-sm text-gray-500 mb-3"}>
        Explore the financial reports for the platform with the details of
        transactions from multiple sources
      </p>

      <Tabs.Root defaultValue={"job-posts"} className={"mt-3 mb-3"}>
        <Tabs.List
          className={
            "flex flex-row items-center bg-gray-100 w-fit p-1 rounded-lg *:px-4 *:py-2 *:rounded-lg mb-3 text-sm gap-2"
          }
        >
          <Tabs.Trigger
            value={"job-posts"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Jobs Posts
          </Tabs.Trigger>

          <Tabs.Trigger
            value={"job-views"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Job Views
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"profile-post"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Profile Post
          </Tabs.Trigger>
          <Tabs.Trigger
            value={"profile-view"}
            className={
              "data-[state=active]:bg-white data-[state=active]:text-secondary"
            }
          >
            Profile View
          </Tabs.Trigger>
        </Tabs.List>
        <TabsContent value={"job-posts"}>
          <JobPayments />
        </TabsContent>
        <TabsContent value={"job-views"}>
          <ViewPayments />
        </TabsContent>
        <TabsContent value={"profile-post"}>
          <ProfilePostPayment />
        </TabsContent>
        <TabsContent value={"profile-view"}>
          <ProfileViewPayments />
        </TabsContent>
      </Tabs.Root>
    </>
  );
}
