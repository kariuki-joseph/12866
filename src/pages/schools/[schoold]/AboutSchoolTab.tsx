import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";

export default function AboutSchoolTab() {
  return (
    <section>
      <div className={"flex flex-row items-center justify-between"}>
        <p className={"text-lg font-bold"}>About School</p>
      </div>

      <hr className={"my-3"} />

      <div className={"px-6 py-5 border border-gray-200 rounded-lg mb-3"}>
        <p className={"font-bold mb-2 text-sm "}>School Bio</p>
        <p className={"text-sm text-gray-500 text-justify"}>
          Greensteds is a co-educational boarding and day school (IAPS and CIS)
          following the National Curriculum of England & Wales from Early Years
          to IGCSE, and A level. Greensteds School is situated 140 km north of
          Nairobi, in the heart of Kenya’s Rift Valley and within ten minutes
          drive of Lake Nakuru National Park. The School is set in a rural
          secluded, 50-acre site and is one of the leading International
          boarding schools in Kenya serving internationally minded parents all
          over the world
        </p>
      </div>

      <div className={"flex flex-row gap-4"}>
        <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
          <p className={"font-bold mb-3 text-sm"}>Contact Us</p>

          <div className={"text-gray-500 mb-3 text-sm"}>
            <p>Email</p>
            <hr className={"my-2"} />

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>

              <p className={"text-left text-black"}>copy</p>
            </div>

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>

              <p className={"text-left text-black"}>copy</p>
            </div>
          </div>

          <div className={"text-gray-500 mb-3 text-sm"}>
            <p>Phone Number</p>
            <hr className={"my-2"} />

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>

              <p className={"text-left text-black"}>copy</p>
            </div>

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>

              <p className={"text-left text-black"}>copy</p>
            </div>
          </div>

          <div className={"text-gray-500 mb-3 text-sm"}>
            <p>Website</p>
            <hr className={"my-2"} />

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>

              <p className={"text-left text-black"}>copy</p>
            </div>
          </div>
        </div>

        <div className={"px-6 py-5 border border-gray-200 rounded-lg w-1/2"}>
          <p className={"font-bold mb-3 text-sm"}>Location</p>

          <div className={"text-gray-500 mb-3 text-sm"}>
            <p>Region</p>
            <hr className={"my-2"} />

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>
            </div>

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>
            </div>
          </div>

          <div className={"text-gray-500 mb-3 text-sm"}>
            <p>Location Pin</p>
            <hr className={"my-2"} />

            <div className={"flex flex-row items-center justify-between py-3"}>
              <div className={"flex flex-row items-center gap-2"}>
                <img src={paperPlaneTiltPlain} className={"w-5 h-5"} />
                <p>Accomodation</p>
              </div>

              <p className={"text-left text-black text-gray-500"}>
                View in maps
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
