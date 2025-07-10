import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import ProjectSection from "@/components/ProjectSection";
import ProjectCards from "@/components/ProjectCards";
import Leaderboard from "@/components/Leaderboard";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const Home = () => {
  const words = [
    {
      text: "Proof",
    },
    {
      text: "of",
    },
    {
      text: "contribution",
    },
    {
      text: "engine",
    },
    {
      text: "powering",
    },
    {
      text: "the",
    },
    {
      text: "rewards",
    },
    {
      text: "economy",
    },
  ];
  return (
    <div>
      <BackgroundBeamsWithCollision>
        <div className="relative z-20 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white font-sans tracking-tight">
            Mayo AI...
          </h2>
          <div className="mt-2 bg-clip-text text-transparent bg-[#dedcb1]">
            <TypewriterEffectSmooth
              className="text-xl md:text-3xl lg:text-4xl font-bold"
              words={words}
            />
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      <div className="flex p-8">
        <ProjectCards />
      </div>
      <div className="flex p-8 items-center justify-center w-full">
        <ProjectSection />
      </div>
      <div className="flex p-8">
        <Leaderboard />
      </div>

      <footer className="bg-white rounded-lg shadow-sm m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="#" className="hover:underline">
              Mayo™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
