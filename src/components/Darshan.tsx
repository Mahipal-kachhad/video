const Darshan = () => {
  return (
    <div className="w-full sm:bg-black flex items-center justify-center">
      <div className="w-[90vw] sm:w-[85vw] max-w-7xl mx-auto flex-col xl:flex-row flex  justify-between bg-[#1d1d1f] sm:p-3 lg:p-7 my-15 gap-5 rounded-4xl">
        <div className=" text-white px-3 sm:p-3 xl:py-7 xl:p-8 xl:w-md ">
          <h2 className="text-3xl text-center xl:text-left sm:text-2xl xl:text-3xl font-bold text-orange-500 mb-4 sm:mb-8 uppercase">
            Darshan Time
          </h2>

          <ul className="space-y-6 text-neutral-100 sm:hidden xl:block">
            <li className="border-b border-b-white/15 pb-4">
              <p className="font-semibold text-[1.1rem] sm:text-[0.8rem] lg:text-lg">
                What is the daily darshan time schedule?
              </p>
              <ul className="mt-2 text-neutral-400 space-y-1">
                <li className= "ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">
                  - Morning: 7:30 AM to 1:00 PM (Everyday)
                </li>
                <li className= "ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">
                  - Afternoon: 2:30 PM to 8:30 PM (Everyday)
                </li>
              </ul>
            </li>
            <li className="border-b border-b-white/15 pb-4">
              <p className="font-semibold text-[1.1rem] sm:text-[0.8rem] lg:text-lg">
                What is the Himalaya darshan closing time?
              </p>
              <p className="mt-2 text-neutral-400  ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">- Everyday: 7:00 PM</p>
            </li>
            <li >
              <p className="font-semibold text-[1.1rem] sm:text-[0.8rem] lg:text-lg">What is the aarti time?</p>
              <ul className="mt-2 text-neutral-400 space-y-1">
                <li className= "ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">- Morning: 8:15 AM (Everyday)</li>
                <li className= "ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">- Evening: 7:15 PM (Everyday)</li>
              </ul>
            </li>
          </ul>


          <ul className="text-neutral-100 hidden sm:flex flex-row xl:hidden">
            <li className="border-e border-e-white me-4 lg:me-10 flex-1 pe-1">
              <p className="font-semibold text-[1rem]">
                What is the daily darshan time schedule?
              </p>
              <ul className="mt-2 text-neutral-400 space-y-1">
                <li className= "lg:ps-10 text-[0.8rem] lg:text-[1rem]">
                  - Morning: 7:30 AM to 1:00 PM
                </li>
                <li className= "lg:ps-10 text-[0.8rem] lg:text-[1rem]">
                  - Afternoon: 2:30 PM to 8:30 PM
                </li>
              </ul>
            </li>
            <li className="border-e border-e-white me-4 lg:me-10 flex-1">
              <p className="font-semibold text-[1rem]">
                What is the Himalaya darshan closing time?
              </p>
              <p className="mt-2 text-neutral-400  lg:ps-10 text-[0.8rem] lg:text-[1rem]">- Everyday: 7:00 PM</p>
            </li>
            <li className="">
              <p className="font-semibold text-[1rem]">What is the aarti time?</p>
              <ul className="mt-2 text-neutral-400 space-y-1 pt-5">
                <li className= "lg:ps-10 text-[0.8rem] lg:text-[1rem]">- Morning: 8:15 AM (Everyday)</li>
                <li className= "lg:ps-10 text-[0.8rem] lg:text-[1rem]">- Evening: 7:15 PM (Everyday)</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="sm:bg-black text-white sm:p-8 lg:px-10 xl:p-7 pt-10 sm:pt-4 rounded-4xl w-full ">
          <h2 className="text-3xl text-center xl:text-left sm:text-2xl xl:text-3xl font-bold text-orange-500 mb-4 xl:mb-8 uppercase">
            Darshan Rules
          </h2>
          <p className="font-bold text-white mb-4 text-[1.1rem] sm:text-[1rem] lg:text-[1.3rem] xl:text-lg">
            Following the new rules for Darshan at the Temple is mandatory.
          </p>

          <ul className="space-y-3 text-neutral-300 list-disc text-[1.1rem] sm:text-[0.9rem] lg:text-[1.1rem] xl:text-lg list-outside ps-9">
            <li>
              Women should come fully dressed (in saree or full attire) for
              Darshan.
            </li>
            <li>
              All visitors should come in proper, respectful attire and maintain
              decorum.
            </li>
            <li>
              Maintain peace and cleanliness in the premises and cooperate with
              the volunteers.
            </li>
            <li>
              Bringing pets or animals into the premises is strictly prohibited.
            </li>
            <li>Outside food or cooking is not allowed within the premises.</li>
            <li>
              Items like tobacco, gutkha, and alcohol are strictly prohibited
              inside the premises.
            </li>
            <li>
              Mobile phones, cameras, and loud talking are discouraged during
              the TirthYatra.
            </li>
            <li>
              Climbing trees, plucking flowers/fruits, or damaging plants is
              strictly prohibited.
            </li>
            <li>
              Vehicles, sound systems, and other disruptive equipment are not
              allowed without permission.
            </li>
            <li>
              For Darshan and Seva-related queries or help, please contact the
              office.
            </li>
          </ul>

          <div className="w-9/10 sm:w-fit mt-4 sm:mt-3 xl:mt-4 bg-red-600 mx-auto px-5 py-2 lg:px-10 text-white text-[0.9rem] sm:text-[0.7rem] lg:text-sm font-semibold text-center p-1 lg:p-3 rounded-2xl uppercase sm:rounded-full">
            * Violation of the above rules may result in legal action.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Darshan;
