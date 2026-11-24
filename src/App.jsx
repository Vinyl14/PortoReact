import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { motion } from 'framer-motion';
import "./App.css";
import DotGrid from "./Components/DotGrid/DotGrid.jsx";
import LogoLoop from "./Components/LogoLoop/LogoLoop.jsx";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiGo } from "react-icons/si";
import CardNav from "./Components/CardNav/CardNav.jsx";

// --- ICON COMPONENTS (Tidak ada perubahan) ---
const ReactIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-11.5 -10.23174 23 20.46348"
    className="h-5 w-5 text-[#61DAFB]"
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);
const GoIcon = () => <SiGo className="h-5 w-5 text-[#00ADD8]" />;
const NextjsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-black"
    viewBox="0 0 128 128"
  >
    <path
      fill="currentColor"
      d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM42.2759 104.228V23.7725H53.9019V84.0042L95.5866 23.7725H105.724V104.228H94.0978V43.9961L52.4131 104.228H42.2759Z"
    />
  </svg>
);
const VuejsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 256 221"
  >
    <path fill="#41B883" d="M204.8,0,128,134.4,51.2,0H0L128,220.8,256,0Z" />
    <path
      fill="#34495E"
      d="M204.8,0,128,134.4,51.2,0H102.4l25.6,44.8L153.6,0Z"
    />
  </svg>
);
const TypescriptIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-[#3178C6]"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M1.5,1.5H22.5V22.5H1.5V1.5M21,21V7.5L13.5,15V21H21M13.5,6H21V7.5L16.5,12H13.5V6M3,3V21H12V19.5H4.5V4.5H12V3H3Z" />
  </svg>
);

const DotNetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-[#512BD4]"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24v1.24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396v1.233zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372v8.806zM1.17 16.517a.885.885 0 0 1-.663-.277.934.934 0 0 1-.27-.68c0-.276.09-.506.27-.688a.893.893 0 0 1 .663-.274c.27 0 .494.091.674.274.18.182.27.412.27.688 0 .276-.09.503-.27.68a.903.903 0 0 1-.674.277z" />
  </svg>
);

const DotsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

const techLogos = [
  {
    node: (
      <FaReact className="text-gray-700 hover:text-blue-600 transition-colors" />
    ),
    title: "React",
    href: "https://react.dev",
  },
  {
    node: (
      <SiNextdotjs className="text-gray-700 hover:text-black transition-colors" />
    ),
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: (
      <SiTypescript className="text-gray-700 hover:text-blue-600 transition-colors" />
    ),
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: (
      <SiTailwindcss className="text-gray-700 hover:text-cyan-500 transition-colors" />
    ),
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: (
      <FaPython className="text-gray-700 hover:text-blue-600 transition-colors" />
    ),
    title: "Python",
    href: "https://python.org",
  },
];

const ProjectCard = ({
  icon,
  title,
  description,
  techStack,
  projectType,
  link,
  cardVariants,
}) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`group block p-6 rounded-2xl shadow-lg border border-gray-200 bg-white cursor-pointer`}
    variants={cardVariants}
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.5 }}
    whileHover={{
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    }}
    whileTap={{ scale: 0.95 }}
  >
    <div className={`flex justify-between items-start text-gray-800`}>
      <div className="flex items-center justify-center bg-black/10 rounded-lg p-2">
        {icon}
      </div>
      <DotsIcon />
    </div>
    <div className={`mt-4 text-gray-800`}>
      <p className="text-xl font-bold">{title}</p>
      <p className={`text-sm mt-2 h-16 text-gray-600`}>{description}</p>
    </div>
    <div className="flex justify-between items-end mt-4">
      <p className="text-sm opacity-80 font-medium text-gray-800">
        {techStack}
      </p>
      <p
        className={`text-xs font-semibold py-1 px-2 rounded-full bg-blue-100 text-blue-800`}
      >
        {projectType}
      </p>
    </div>
  </motion.a>
);

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const navTargets = ["home", "resume", "projects"];

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      for (const id of navTargets) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = id;
            break;
          }
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navTargets]);

  const cardVariants = {
    offscreen: { y: 100, opacity: 0, scale: 0.95 },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 },
    },
  };

  const items = [
    {
      label: "Home",
      bgColor: "#f0f4f8",
      textColor: "#1f2937",
      links: [
        { label: "Back to Top", href: "#home", ariaLabel: "Scroll to top" },
      ],
    },
    {
      label: "Resume",
      bgColor: "#e0e7ff",
      textColor: "#1f2937",
      links: [
        { label: "Summary", href: "#resume", ariaLabel: "View Summary" },
        { label: "Experience", href: "#resume", ariaLabel: "View Experience" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#dbeafe",
      textColor: "#1f2937",
      links: [
        {
          label: "Corp Banking ETL",
          href: "https://corpbankingdashboard.onrender.com",
          ariaLabel: "View Corporate Banking Analytics Dashboard",
        },
        {
          label: "Portfolio",
          href: "#projects",
          ariaLabel: "View other projects",
        },
      ],
    },
  ];

  const projectData = [
    {
      icon: <ReactIcon />,
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with React and Framer Motion to showcase my skills and projects.",
      techStack: "React, Tailwind CSS",
      projectType: "Frontend",
      link: "https://github.com/Vinyl14/PortoReact",
    },
    {
      icon: <DotNetIcon />,
      title: "Corporate Banking ETL & Dashboard",
      description:
        "286-column flat-file ELT pipeline and Blazor analytics dashboard with automated batch audit and PL/pgSQL data marts.",
      techStack: ".NET 9, Blazor, PostgreSQL",
      projectType: "Data & Full-stack",
      link: "https://corpbankingdashboard.onrender.com",
    },
    {
      icon: <ReactIcon />,
      title: "OrderAja Sales Officer App",
      description:
        "A sales officer application that provides real-time sales data for any location.",
      techStack: "React Native",
      projectType: "Mobile App",
      link: "https://play.google.com/store/apps/details?id=com.adira.nbmsurveyor&hl=id",
    },
  ];

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 z-0" />

      {/* Lapisan 2: DotGrid di atas latar putih */}
      <DotGrid
        className="absolute inset-0 z-[5]"
        dotSize={5}
        gap={20}
        baseColor="#FFFFFF"
        activeColor="#3b82f6"
        proximity={100}
        shockRadius={500}
        shockStrength={5}
        resistance={500}
        returnDuration={1}
      />

      {/* === LAPISAN KONTEN (di atas DotGrid) === */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Wrapper Sticky untuk Navbar */}
        <div className="sticky top-0 z-50 py-4">
          <CardNav
            logo={reactLogo}
            logoAlt="Company Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            activeSection={activeSection}
          />
        </div>

        {/* Sisa konten halaman */}
        <main className="flex-grow">
          <header id="home" className="relative w-full">
            <div className="flex flex-col md:flex-row min-h-screen">
              <div className="w-full md:w-3/5 bg-transparent flex flex-col justify-center p-8 md:p-16 lg:p-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1
                    className="!text-7xl md:text-8xl lg:text-9xl font-serif text-gray-800 mb-6 tracking-wide"
                    style={{ textShadow: "8px 4px 8px rgba(0, 0, 0, 0.2)" }}
                  >
                    Software Developer
                  </h1>
                  <button
                    className="!bg-blue-100/80 !text-gray-600 font-semibold py-3 px-8 rounded-full hover:!bg-blue-200 transition-colors duration-300 mb-12"
                    style={{ textShadow: "8px 4px 8px rgba(0, 0, 0, 0.2)" }}
                  >
                    <a
                      style={{ color: "#000" }}
                      href="https://www.linkedin.com/in/alvinlinardi"
                    >
                      Hire Me
                    </a>
                  </button>
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="text-left">
                      <p
                        className="text-4xl md:text-5xl font-bold text-gray-800"
                        style={{ textShadow: "8px 4px 8px rgba(0, 0, 0, 0.2)" }}
                      >
                        8+
                      </p>
                      <p
                        className="text-gray-500 mt-1"
                        style={{ textShadow: "8px 4px 8px rgba(0, 0, 0, 0.2)" }}
                      >
                        Project Experience in Software development
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 h-32 flex items-center justify-center">
                    <LogoLoop
                      logos={techLogos}
                      speed={60}
                      direction="left"
                      logoHeight={48}
                      gap={40}
                      pauseOnHover={true}
                      scaleOnHover={true}
                      fadeOut={false}
                      ariaLabel="Technology partners"
                    />
                  </div>
                </motion.div>
              </div>
              <div className="relative w-full md:w-2/5 bg-blue-100/80 min-h-[50vh] md:min-h-screen rounded-4xl shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.img
                    src="/self_picture.png"
                    alt="Portrait of Alvin Linardi"
                    className="h-full w-full object-cover origin-center scale-130"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
                <div className="absolute top-0 right-0 h-full flex items-center p-4 md:p-6">
                  <h2
                    className="text-blue-900/50 font-bold text-2xl md:text-3xl"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    ALVIN LINARDI
                  </h2>
                </div>
              </div>
            </div>
          </header>

          <div className="relative text-black py-24 px-4 bg-transparent">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <motion.div
                id="resume"
                className="w-full p-10 bg-white rounded-2xl shadow-2xl border border-gray-200 scroll-mt-20"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
              >
                <div className="text-gray-800">
                  <p className="text-sm font-semibold text-blue-500 tracking-widest">
                    RESUME
                  </p>
                  <h2 className="text-4xl font-bold mb-8">CHECK MY RESUME</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
                          Summary
                        </h3>
                        <h4 className="text-xl font-semibold">Alvin Linardi</h4>
                        <p className="text-gray-600 mt-2 text-sm">
                          Computer Science graduate from BINUS University with
                          hands-on experience in enterprise full-stack
                          development and banking data engineering. Skilled in
                          .NET, Java Spring Boot, Vue.js, React Native,
                          PostgreSQL, and IBM InfoSphere DataStage, with a
                          proven track record of delivering scalable internal
                          web systems and ETL pipelines.
                        </p>
                        <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                          <li>
                            Tangerang / Jakarta Metropolitan Area, Indonesia
                          </li>
                          <li>+62 813-1531-4116</li>
                          <li>linardialvin12@gmail.com</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold border-b-2 border-blue-600 pb-2 mb-4">
                          Education
                        </h3>
                        <div className="mb-4">
                          <h4 className="text-xl font-semibold">
                            Bachelor of Computer Science (S.Kom)
                          </h4>
                          <p className="text-sm text-blue-600 font-medium">
                            2022 - 2026
                          </p>
                          <p className="text-gray-600 mt-1 text-sm">
                            BINUS University, Alam Sutera, Tangerang (GPA: 3.59
                            / 4.00).
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold">
                            High School Graduate
                          </h4>
                          <p className="text-sm text-blue-600 font-medium">
                            2019 - 2022
                          </p>
                          <p className="text-gray-600 mt-1 text-sm">
                            Strada St. Thomas Aquinas High School, Pabuaran,
                            Tangerang.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold border-b-2 border-blue-600 pb-2 mb-4">
                        Professional Experience
                      </h3>
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold">
                          Junior Fullstack Developer (Contract)
                        </h4>
                        <p className="text-sm text-blue-600 font-medium">
                          April 2026 - Present
                        </p>
                        <p className="italic text-gray-700 mt-1 text-sm">
                          PT Mitra Integrasi Informatika — Placement at Bank
                          BNI, Jakarta
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 text-sm">
                          <li>
                            Developed and enhanced internal enterprise web
                            applications using .NET Framework / .NET Core for
                            fullstack feature improvements and system
                            optimizations.
                          </li>
                          <li>
                            Designed and executed data integration and ETL
                            pipelines using IBM InfoSphere DataStage to process,
                            transform, and prepare large-scale financial data
                            for internal banking systems.
                          </li>
                          <li>
                            Implemented RESTful APIs and backend services using
                            .NET to support scalable business workflows and
                            seamless frontend-backend integration.
                          </li>
                          <li>
                            Optimized database queries and data processing jobs
                            in Oracle and SQL Server to ensure data accuracy and
                            optimal query performance.
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold">
                          IT Developer Intern (Full-Time)
                        </h4>
                        <p className="text-sm text-blue-600 font-medium">
                          February 2025 - February 2026
                        </p>
                        <p className="italic text-gray-700 mt-1 text-sm">
                          Adira Finance, Jakarta, Indonesia
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 text-sm">
                          <li>
                            Developed and maintained backend services using Java
                            Spring Boot and implemented RESTful APIs to
                            integrate mobile and web features.
                          </li>
                          <li>
                            Modified and optimized Oracle Database schemas and
                            queries to support application version control and
                            new business requirements.
                          </li>
                          <li>
                            Improved the performance and UI reliability of a
                            customer sales survey app (OrderAja) by migrating
                            React Native from 0.68 to 0.81.
                          </li>
                          <li>
                            Designed and built user-friendly screens for a
                            digital signing application (React Native) and
                            internal proposal tools (Vue.js).
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div id="projects" className="w-full scroll-mt-20">
                <p className="text-sm font-semibold text-blue-600 tracking-widest text-center">
                  ACTIVITIES
                </p>
                <h2 className="text-4xl font-bold mb-8 text-center">
                  PROJECT SHOWCASE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectData.map((data, index) => (
                    <ProjectCard
                      key={index}
                      {...data}
                      cardVariants={cardVariants}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full bg-blue-100 text-gray-800 py-8 px-4 md:px-8">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-gray-800">&copy; 2026 Alvin Linardi.</p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="!text-gray-800 hover:!text-blue-600 transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="!text-gray-800 hover:!text-red-600 transition-colors duration-300"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="#"
                className="!text-gray-800 hover:!text-blue-700 transition-colors duration-300"
              >
                <FaFacebookF size={24} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
