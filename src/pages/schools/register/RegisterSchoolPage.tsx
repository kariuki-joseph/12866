import FormSection from "../../../components/FormSection.tsx";
import * as Tabs from "@radix-ui/react-tabs";
import EnterEmailTab from "./EnterEmailTab.tsx";
import { useState } from "react";
import EnterOtpTab from "./EnterOtpTab.tsx";
import EnterPasswordTab from "./EnterPasswordTab.tsx";
import CreateSchoolTab from "./CreateSchoolTab.tsx";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api.ts";
import { AxiosResponse, InstitutionLevel } from "../../../interfaces/api.ts";

export default function RegisterSchoolPage() {
  const [tab, setTab] = useState("enter-email-tab");
  const previousPage = "/teachers";

  const url = `api/v1/subjects/institution/levels/`;
  const { data } = useQuery<AxiosResponse<InstitutionLevel[]>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Register School"} previousPage={previousPage}>
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

        <Tabs.Content value={"create-school-tab"}>
          {data !== undefined ? (
            <CreateSchoolTab institution_levels={data.data} />
          ) : null}
        </Tabs.Content>
      </Tabs.Root>
    </FormSection>
  );
}
