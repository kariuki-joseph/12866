import React, { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useNavigate } from "react-router-dom";

export default function SelectPackageTab({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [packageType, setPackageType] = useState("job-view-pricing");
  const navigate = useNavigate();

  return (
    <>
      <p className={"mb-3"}>Choose a package</p>

      <RadioGroup.Root
        name={"institution_level"}
        defaultValue={packageType}
        className={
          "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
        }
        onValueChange={(value) => setPackageType(value)}
      >
        <RadioGroup.Item
          value={"job-view-pricing"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Job view pricing
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"job-posting-pricing"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Job posting pricing
        </RadioGroup.Item>
      </RadioGroup.Root>

      <div className={"flex flex-row justify-end gap-3 mt-3"}>
        <button
          onClick={() => navigate("../", { relative: "path" })}
          className={"btn-outlined"}
          type={"button"}
        >
          Cancel
        </button>
        <button className={"btn"} onClick={() => setTab(packageType)}>
          Proceed
        </button>
      </div>
    </>
  );
}
