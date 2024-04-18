import FormSection from "../../../components/FormSection.tsx";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api.ts";

const schema = z.object({
  charges: z.coerce.number().min(1),
  days: z.coerce.number().min(1),
});
export default function EditRatePage() {
  const url = ``;
  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });
  return (
    <FormSection title={"Edit Payment Rate"} previousPage={"../../"}>
      EditRatePage
    </FormSection>
  );
}
