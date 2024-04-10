import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import arrowBack from "/icons/arrow_back.svg";
import close from "/icons/close.svg";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useNavigate } from "react-router-dom";

export default function EditSchoolDescription() {
  const navigate = useNavigate();

  return (
    <section
      className={
        "mx-auto bg-white rounded border border-gray-200 px-6 pb-3 max-w-[1000px]"
      }
    >
      <div className={"flex flex-row items-center justify-between my-5"}>
        <div className={"flex flex-row items-center gap-4"}>
          <button
            className={""}
            onClick={() => navigate("../../", { relative: "path" })}
          >
            <img src={arrowBack} alt={"back"} className={"w-6 h-6"} />
          </button>
          <h2 className={"font-bold text-lg"}>Edit School Profile</h2>
        </div>

        <button
          className={""}
          onClick={() => navigate("../../", { relative: "path" })}
        >
          <img src={close} alt={"back"} className={"w-6 h-6"} />
        </button>
      </div>

      <form>
        <label className="flex flex-row items-center justify-between  bg-gray-50 border border-gray-200 rounded-lg px-2 mb-3">
          <div className="flex flex-row items-center gap-2">
            <div className={"bg-purple-50 p-2 rounded-3xl m-3"}>
              <img
                src={paperPlaneTiltPlain}
                alt={"logo"}
                className={"w-8 h-8"}
              />
            </div>

            <div className="w-2/3 flex flex-col gap-1">
              <p className={"text-sm font-bold"}>Add institution logo</p>
              <p className={"text-xs text-gray-500"}>
                This logo will appear as the profile picture
              </p>
            </div>
          </div>
          <input type="file" className={"w-fit"} />
        </label>

        <div className={"flex flex-row gap-3 mb-3"}>
          <div className={"w-1/2"}>
            <label>Institution Name</label>
            <input type={"text"} placeholder={"Enter name"} />
          </div>
          <div className={"w-1/2"}>
            <label>Institution Name</label>
            <div>
              <RadioGroup.Root
                defaultValue={"primary-school"}
                className={
                  "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
                }
              >
                <RadioGroup.Item
                  value={"ecdce"}
                  className={
                    "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                  }
                >
                  ECDE
                </RadioGroup.Item>
                <RadioGroup.Item
                  value={"primary-school"}
                  className={
                    "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                  }
                >
                  Primary School
                </RadioGroup.Item>
                <RadioGroup.Item
                  value={"high-school"}
                  className={
                    "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                  }
                >
                  High School
                </RadioGroup.Item>
              </RadioGroup.Root>
            </div>
          </div>
        </div>

        <div className={"flex flex-row gap-3 mb-3"}>
          <div className={"w-1/2"}>
            <label>Institution Name</label>
            <RadioGroup.Root
              defaultValue={"day"}
              className={
                "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
              }
            >
              <RadioGroup.Item
                value={"day"}
                className={
                  "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                }
              >
                Day School
              </RadioGroup.Item>
              <RadioGroup.Item
                value={"boarding"}
                className={
                  "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                }
              >
                Boarding School
              </RadioGroup.Item>
              <RadioGroup.Item
                value={"mixed"}
                className={
                  "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                }
              >
                Mixed
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div className={"w-1/2"}>
            <label>Gender</label>
            <RadioGroup.Root
              defaultValue={"mixed"}
              className={
                "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
              }
            >
              <RadioGroup.Item
                value={"boys"}
                className={
                  "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                }
              >
                Boys
              </RadioGroup.Item>
              <RadioGroup.Item
                value={"girls"}
                className={
                  "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                }
              >
                Girls
              </RadioGroup.Item>
              <RadioGroup.Item
                value={"mixed"}
                className={
                  "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                }
              >
                Mixed
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>
        </div>

        <label>About School</label>
        <textarea
          placeholder={"Describe the school, vision, mission"}
          rows={6}
        />

        <div className={"flex flex-row items-center justify-end py-2 gap-3"}>
          <button className={"btn-outlined"}>Cancel</button>
          <button className={"btn"}>Submit</button>
        </div>
      </form>
    </section>
  );
}
