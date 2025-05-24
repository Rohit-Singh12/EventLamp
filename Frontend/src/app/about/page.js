"use client";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Your Website</title>
        <meta
          name="description"
          content="Learn more about our company, mission, and expertise."
        />
      </Head>
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
            <p className="text-lg text-gray-600 mt-3">
              Empowering innovation with industry-leading expertise.
            </p>
          </div>

          {/* Company Overview */}
          <div className="bg-white p-8 shadow-md rounded-lg mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600">
              We are a team of passionate professionals dedicated to delivering
              high-quality solutions. With years of industry experience, we
              specialize in building cutting-edge platforms tailored to business
              needs.
            </p>
          </div>

          {/* Industry Expertise */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-semibold text-blue-600">
                Technology
              </h3>
              <p className="text-gray-600 mt-2">
                Experts in modern web development, cloud computing, and
                AI-driven solutions.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-semibold text-blue-600">
                Real Estate
              </h3>
              <p className="text-gray-600 mt-2">
                Deep expertise in digital real estate platforms, ensuring
                seamless property transactions.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-semibold text-blue-600">
                Marketing & Growth
              </h3>
              <p className="text-gray-600 mt-2">
                Strategic marketing insights to scale businesses and maximize
                engagement.
              </p>
            </div>
          </div>

          {/* Meet Our Team */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Meet Our Experts
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <img
                  src="/team1.jpg"
                  alt="CEO"
                  className="w-24 h-24 mx-auto rounded-full mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <img
                  src="/team2.jpg"
                  alt="CTO"
                  className="w-24 h-24 mx-auto rounded-full mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  Jane Smith
                </h3>
                <p className="text-gray-600">CTO</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <img
                  src="/team3.jpg"
                  alt="CMO"
                  className="w-24 h-24 mx-auto rounded-full mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  Michael Johnson
                </h3>
                <p className="text-gray-600">CMO</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Ready to Work with Us?
            </h2>
            <p className="text-gray-600 mt-2">
              Let's build something amazing together.
            </p>
            <a
              href="/contact"
              className="inline-block mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
