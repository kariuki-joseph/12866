import FormSection from "../../../components/FormSection.tsx";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import SelectPackageTab from "./SelectPackageTab.tsx";
import JobViewPricing from "./JobViewPricing.tsx";
import JobPostPricing from "./JobPostPricing.tsx";
import TeacherProfileViewPricing from "./TeacherProfileVieweingPrice.tsx";
import TeacherProfilePostingPrice from "./TeacherProfilePostingPrice.tsx";

export default function ManagePayments() {
  const [tab, setTab] = useState("select-package-tab");

  return (
    <FormSection title={"Manage Payments"} previousPage={"../"}>
      <Tabs.Root value={tab}>
        <Tabs.Content value={"select-package-tab"}>
          <SelectPackageTab setTab={setTab} />
        </Tabs.Content>

        <Tabs.Content value={"job-view-pricing"}>
          <JobViewPricing setTab={setTab} />
        </Tabs.Content>

        <Tabs.Content value={"job-posting-pricing"}>
          <JobPostPricing />
        </Tabs.Content>

        <Tabs.Content value={"teacher-profile-viewing-pricing"}>
          <TeacherProfileViewPricing />
        </Tabs.Content>
        <Tabs.Content value={"teacher-profile-posting-pricing"}>
          <TeacherProfilePostingPrice />
        </Tabs.Content>


      </Tabs.Root>
    </FormSection>
  );
}
