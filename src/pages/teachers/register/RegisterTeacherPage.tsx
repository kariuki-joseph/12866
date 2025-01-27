import FormSection from "../../../components/FormSection.tsx";
import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import EnterEmailTab from "./EnterEmailTab.tsx";
import CreateTeacherTab from "./CreateTeacherTab.tsx";
import EnterPasswordTab from "./EnterPasswordTab.tsx";
import EnterOtpTab from "./EnterOtpTab.tsx";
// import EnterOtpTab from "./EnterOtpTab.tsx";
// import EnterPasswordTab from "./EnterPasswordTab.tsx";
// import CreateSchoolTab from "./CreateSchoolTab.tsx";

export default function RegisterSchoolPage() {
  const [tab, setTab] = useState("enter-email-tab");
  const previousPage = "/";
  const navigate = useNavigate();

  return (
    <FormSection title={"Register Teacher"} previousPage={previousPage}>
      <Tabs.Root value={tab}>
        <Tabs.Content value={"enter-email-tab"}>
          <EnterEmailTab setTab={setTab} />
        </Tabs.Content>

        <Tabs.Content value={"enter-otp-tab"}>
          <EnterOtpTab setTab={setTab} />
        </Tabs.Content>

        <Tabs.Content value={"enter-password-tab"}>
          <EnterPasswordTab setTab={setTab} />
        </Tabs.Content>

        <Tabs.Content value={"create-teacher-tab"}>
          <CreateTeacherTab />
        </Tabs.Content>
      </Tabs.Root>
    </FormSection>
  );
}
