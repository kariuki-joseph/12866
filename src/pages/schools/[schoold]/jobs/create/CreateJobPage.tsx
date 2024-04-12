import FormSection from "../../../../../components/FormSection.tsx";
import * as Tabs from "@radix-ui/react-tabs";
import { Photos } from "../../../../../components/Photos.tsx";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  school: z.string(),
  title: z.string(),
  deadline: z.string().datetime(),
});

export default function CreateJobPage() {
  const [school, setSchool] = useState();
  return (
    <FormSection title={"Post New Job"} previousPage={"../.."}>
      <Tabs.Root defaultValue={"select-institution"} className={"mt-3"}>
        <Tabs.Content value={"job-details"}>job-details</Tabs.Content>
        <Tabs.Content value={"gallery"}>
          <Photos />
        </Tabs.Content>
      </Tabs.Root>
    </FormSection>
  );
}
