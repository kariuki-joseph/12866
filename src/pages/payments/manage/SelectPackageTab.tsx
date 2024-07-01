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
    <section className="text-gray-500">
      <p className={"mb-3 "}>Choose a package</p>

      <RadioGroup.Root
        name={"institution_level"}
        defaultValue={packageType}
        className={
          "*:px-6 *:py-3 text-sm *:rounded *:border *:border-gray-200 *:w-full flex flex-col gap-3 *:text-left "
        }
        onValueChange={(value) => setPackageType(value)}
      >
        <RadioGroup.Item
          value={"job-view-pricing"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Job View Pricing
          <p>Set up the cost of viewing a job post for the teachers</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"job-posting-pricing"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Job Posting pricing
          <p>Set up the cost of posting a job post for the schools</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"teacher-profile-viewing-pricing"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Teacher Profile Viewing Pricing
          <p>Set up the cost of viewing a teacher’s profile by a school</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"teacher-profile-posting-pricing"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Teacher Profile Post Pricing
          <p>Set up the cost of posting a profile for teachers</p>
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
    </section>
  );
}
