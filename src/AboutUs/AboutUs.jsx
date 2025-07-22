import React from "react";

function AboutUs() {
  return (
    <div className="flex justify-center pt-32 bg-[#cbd5e1] min-h-screen pb-20">
      <div className="max-w-7xl px-4 w-full">
        {/* About Section */}
        <div className="About bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">All About Auditeur</h2>
              <p className="text-gray-700">
                Mental health is vital to overall well-being, shaping how we
                think, feel, and navigate life. At <b>Auditeur</b>, we’re
                committed to raising awareness, offering support, and promoting
                mental wellness for all.
              </p>
            </div>
            <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-8">
              <img
                src="aboutUs.png"
                alt="Mental Health Illustration"
                className="w-full max-w-xs md:max-w-sm"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white shadow-lg rounded-lg p-20 mt-12">
          <h3 className="text-3xl font-bold text-center mb-12">
            Meet The Team
          </h3>

          {/* First Row */}
          <div className="flex flex-wrap justify-center gap-50 mb-12">
            {/* Member 1 */}
            <div className="flex flex-col items-center">
              <img
                src="member1.png"
                alt="Anusha Shrestha"
                className="rounded-lg w-32 h-32 object-cover mb-4"
              />
              <p className="font-bold">Anusha Shrestha</p>
            </div>

            {/* Member 2 */}
            <div className="flex flex-col items-center">
              <img
                src="member2.png"
                alt="Aavash Shahi"
                className="rounded-lg w-32 h-32 object-cover mb-4"
              />
              <p className="font-bold">Aavash Shahi</p>
            </div>

            {/* Member 3 */}
            <div className="flex flex-col items-center">
              <img
                src="member3.png"
                alt="Bhawana Dangi"
                className="rounded-lg w-32 h-32 object-cover mb-4"
              />
              <p className="font-bold">Bhawana Dangi</p>
            </div>
          </div>

          {/* Second Row*/}
          <div className="flex flex-wrap justify-center gap-50">
            {/* Member 4 */}
            <div className="flex flex-col items-center">
              <img
                src="member4.png"
                alt="Maniska Gurung"
                className="rounded-lg w-32 h-32 object-cover mb-4"
              />
              <p className="font-bold">Manikala Gurung</p>
            </div>

            {/* Member 5 */}
            <div className="flex flex-col items-center">
              <img
                src="member5.png"
                alt="Sneha Kokh Shrestha"
                className="rounded-lg w-32 h-32 object-cover mb-4"
              />
              <p className="font-bold">Sneha Kokh Shrestha</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
