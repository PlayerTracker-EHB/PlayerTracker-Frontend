import { Bot, ChartColumn, Upload } from "lucide-react";

const features = [
  {
    name: 'Effortlessly Upload Your Match Videos',
    description:
      'Easily upload your futsal match videos to our secure platform. Coaches and players can quickly share gameplay, ensuring your content is stored safely and accessible for analysis.',
    icon: <Upload aria-hidden="true" className="absolute top-1 left-1 size-5 text-teal-600" />,
  },
  {
    name: 'Leverage AI for In-Depth Game Analysis',
    description: 'Utilize advanced AI to track player movements and analyze gameplay. Gain valuable insights into performance and strategies, helping coaches and players improve effectively.',
    icon: <Bot aria-hidden="true" className="absolute top-1 left-1 size-5 text-teal-600" />,
  },
  {
    name: 'Comprehensive Futsal Statistics at Your Fingertips',
    description: 'Access a user-friendly dashboard with key statistics from your futsal matches. Track player metrics and team performance to enhance strategies and gameplay.',
    icon: <ChartColumn aria-hidden="true" className="absolute top-1 left-1 size-5 text-teal-600" />,
  },
];

export default function FeatureSection() {
  return (
    <div id="feature" className="overflow-hidden bg-white py-24 sm:py-32">
      <div className=" px-16 lg:px-32">
        <div className="mx-auto flex max-w-2xl flex-col lg:flex-row lg:max-w-none lg:items-center lg:gap-16">

          {/* Left Section - Text (Takes More Space) */}
          <div className=" lg:w-1/2">
            <h2 className="text-base font-semibold text-teal-600">Elevate Your Futsal Experience</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Streamlined Workflow for Futsal Clubs
            </p>
            <p className="mt-6 text-lg text-gray-600">
              Transform the way your futsal club operates with our innovative platform designed to enhance performance, analysis, and engagement.
            </p>
            <dl className="mt-10 space-y-8 text-base text-gray-600">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    {feature.icon}
                    <span className="ml-3">{feature.name}</span>
                  </dt>
                  <dd className="mt-2 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Section - Image (Fixed Position) */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              alt="PlayerTracker screenshot"
              src="/PlayerTracker.jpeg"
              width={480} // Adjust width if needed
              height={360} // Adjust height if needed
              className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

