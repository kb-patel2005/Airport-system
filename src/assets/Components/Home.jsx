import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const FlightSearch = lazy(() => import("./FlightSearch"));

const assets = {
  logo: "/flight_system.webp",
  hero: "/hero.webp",
  booking: "/seats.webp",
};

const steps = [
  ["Register Or Sign Up", "1", "primary"],
  ["Verify via OTP", "2", "secondary"],
  ["Login With Email and Password", "3", "primary"],
  ["Browse your flight", "4", "secondary"],
  ["Select date from schedules", "5", "primary"],
  ["From seat map select your favourite seat", "6", "secondary"],
  ["Payment", "7", "primary"],
  ["Check your booking section", "8", "secondary"],
];

const features = [
  {
    title: "Live seat map",
    image:
      "https://www.figma.com/api/mcp/asset/f7b983ac-1bf3-44aa-952c-8e6a7f83a194.png",
  },
  {
    title: "Secure payment",
    image:
      "https://www.figma.com/api/mcp/asset/994e3de8-43c5-4b17-96dc-f7b00caafa28.png",
  },
  {
    title: "24 X 7 Support",
    image:
      "https://www.figma.com/api/mcp/asset/a381fea9-10dc-452c-be69-fa70c4c90e6b.png",
  },
  {
    title: "Best Deals",
    image:
      "https://www.figma.com/api/mcp/asset/b6001dbb-8215-4ea3-9ea7-f6670317f8e9.png",
  },
];

function FeatureCards() {
  return (
    <section
      id="features"
      className="w-full bg-[#1397A1] px-4 py-20 sm:px-6 lg:py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Heading */}

        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-roboto text-4xl font-extrabold text-white sm:text-5xl">
            Our Features
          </h2>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  width="300"
                  height="190"
                  loading="lazy"
                  decoding="async"
                  className="h-[145px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[180px] lg:h-[195px]"
                />
              </div>

              <div className="flex min-h-[55px] items-center justify-center px-2 text-center sm:min-h-[60px]">
                <h3 className="font-poetsen text-xs text-[#1980B7] sm:text-sm">
                  {feature.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSteps() {
  return (
    <div className="flex flex-col gap-4">
      {steps.map(([label, number, variant], index) => {
        const isPrimary = variant === "primary";
        const isLeft = index % 2 === 0;

        return (
          <div
            key={number}
            className={`flex items-center ${
              isLeft ? "justify-center lg:justify-start" : "justify-center lg:justify-end"
            }`}
          >
            {isLeft ? (
              <>
                <div className="flex h-[65px] w-[200px] items-center justify-center rounded-[18px] bg-[#35AFB7] px-3 text-center font-poetsen text-[10px] text-white sm:h-[74px] sm:w-[260px]">
                  {label}
                </div>

                <div
                  className={`relative z-10 -ml-3 flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-full font-poetsen text-sm text-white sm:h-[79px] sm:w-[79px] ${
                    isPrimary ? "bg-[#27A3AC]" : "bg-[#5CC7CF]"
                  }`}
                >
                  {number}
                </div>
              </>
            ) : (
              <>
                <div
                  className={`relative z-10 flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-full font-poetsen text-sm text-white sm:h-[79px] sm:w-[79px] ${
                    isPrimary ? "bg-[#27A3AC]" : "bg-[#5CC7CF]"
                  }`}
                >
                  {number}
                </div>

                <div className="-ml-3 flex h-[65px] w-[200px] items-center justify-center rounded-[18px] bg-[#35AFB7] px-3 text-center font-poetsen text-[10px] text-white sm:h-[74px] sm:w-[260px]">
                  {label}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const selector = useSelector((state) => state.staff);

  return (
    <>

      <Helmet>
        <title>
          Flight Booking and Flight Ticket Deals Online | Krish Airline
        </title>

        <meta
          name="description"
          content="Book flights online with live seat updates, seat maps, real-time flight tracking, and the best ticket deals."
        />

        <meta
          property="og:title"
          content="Flight Booking and Flight Ticket Deals Online"
        />

        <meta
          property="og:description"
          content="Book flights online with live seat updates, seat maps, real-time flight tracking, and the best ticket deals."
        />

        <meta
          property="og:image"
          content="https://airportsystem.netlify.app/flight_system.webp"
        />

        <meta
          property="og:url"
          content="https://airportsystem.netlify.app/"
        />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Book Flights Online | Live Seat Updates & Tracking"
        />

        <meta
          name="twitter:description"
          content="Book flights online with live seat updates, seat maps, real-time flight tracking, and the best ticket deals."
        />

        <meta
          name="twitter:image"
          content="https://airportsystem.netlify.app/flight_system.webp"
        />

        <link
          rel="canonical"
          href="https://airportsystem.netlify.app/"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://airportsystem.netlify.app/",
            name: "Krish Airline",
            publisher: {
              "@type": "Person",
              name: "Krish Patel",
              image: {
                "@type": "ImageObject",
                url: "https://airportsystem.netlify.app/flight_system.webp",
              },
            },
          })}
        </script>
      </Helmet>

      <main className="min-h-screen overflow-hidden bg-white text-gray-900">

        <section
          id="home"
          className="relative min-h-[700px] overflow-hidden bg-gradient-to-b from-white via-white to-[#F5FFFF] sm:min-h-[720px] lg:min-h-[760px]"
        >

          <div className="absolute left-[5%] top-[170px] h-8 w-24 rounded-full bg-[#D9F4F5] opacity-80 before:absolute before:-left-1 before:-top-5 before:h-12 before:w-12 before:rounded-full before:bg-[#D9F4F5] after:absolute after:-right-1 after:-top-6 after:h-14 after:w-14 after:rounded-full after:bg-[#D9F4F5]" />
          <div className="absolute right-[8%] top-[100px] h-7 w-20 scale-75 rounded-full bg-[#D9F4F5]" />
          <div className="absolute right-[-15px] top-[330px] h-8 w-24 scale-75 rounded-full bg-[#D9F4F5]" />
          <div className="absolute left-[25%] top-[120px] h-8 w-24 scale-75 rounded-full bg-[#D9F4F5]" />
          <div className="relative mx-auto flex min-h-[650px] w-[calc(100%-30px)] max-w-[1150px] flex-col items-center pt-[130px] sm:w-[calc(100%-40px)] sm:pt-[150px] lg:flex-row lg:items-center lg:pt-[180px]">
            <div className="relative z-10 w-full text-center lg:w-[55%] lg:text-left">
              <h1 className="font-roboto text-[28px] font-extrabold leading-[1.1] text-[#1397A1] drop-shadow-[15px_12px_10px_rgba(0,0,0,0.18)] sm:text-[36px] lg:text-[44px]">
                Smart Flight System for Easy
                <br className="hidden sm:block" />
                Travel Management
              </h1>

              <p className="mx-auto mt-6 max-w-[620px] font-roboto text-xs font-bold leading-relaxed text-[#0E5C70] sm:text-sm lg:mx-0 lg:text-[17px]">
                Find and book flights instantly with our Flight System. Compare ticket deals, view seat maps, and track live flight status—all in one place.
              </p>

              <div className="mt-7 flex justify-center gap-4 sm:gap-7 lg:justify-start">
                <Link
                  to="/flights"
                  className="flex h-[43px] w-[135px] items-center justify-center rounded-full bg-[#EEE0CC] text-sm shadow-[10px_10px_12px_rgba(0,0,0,0.20)] transition hover:-translate-y-1 sm:h-[47px] sm:w-[160px]"
                >
                  Book flight
                </Link>

                <Link
                  to={selector.passenger ? "/AddFlight" : "/signup"}
                  className="flex h-[43px] w-[135px] items-center justify-center rounded-full bg-[#EEE0CC] text-sm shadow-[10px_10px_12px_rgba(0,0,0,0.20)] transition hover:-translate-y-1 sm:h-[47px] sm:w-[160px]"
                >
                  {selector.passenger ? "Add Flight" : "Sign up"}
                </Link>
              </div>
            </div>

            <div className="absolute right-[0%] top-[350px] z-[3] w-[95%] sm:top-[350px] md:right-[-3%] md:w-[82%] lg:right-[-5%] lg:top-[165px] lg:w-[60%]">
              <img
                src={assets.hero}
                alt="Smart flight booking"
                width="1196"
                height="600"
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full object-contain -z-10"
              />
            </div>
          </div>
        </section>
        <section
          id="search"
          className="relative z-20 -mt-[35px] w-full px-4 sm:-mt-[55px] sm:px-6 lg:-mt-[70px]"
        >
          <div className="mx-auto w-full max-w-[880px] rounded-[25px] p-5 shadow-[20px_20px_18px_rgba(0,0,0,0.25)] sm:rounded-[35px] sm:p-8 lg:rounded-[40px] lg:px-[95px] lg:py-5">
            <Suspense
              fallback={
                <div className="flex h-32 items-center justify-center text-white">
                  Loading flight search...
                </div>
              }
            >
              <FlightSearch />
            </Suspense>
          </div>
        </section>

        <FeatureCards />

        <section
          id="about"
          className="w-full bg-white px-4 py-20 sm:px-6 lg:py-[120px]"
        >
          <div className="mx-auto grid w-full max-w-[1100px] gap-16 lg:grid-cols-2 lg:items-center lg:gap-[90px]">

            <div className="text-center lg:text-left">
              <h2 className="font-poetsen text-[42px] leading-none text-[#1397A1] sm:text-[52px] lg:text-[58px]">
                Booking Step
              </h2>

              <p className="mx-auto mt-7 max-w-[580px] font-roboto text-sm leading-relaxed sm:text-base lg:mx-0 lg:text-lg">
                Our Website seamless and easy booking services provide
                with support
              </p>

              <Link
                to="/flights"
                className="mt-7 inline-flex rounded-full bg-[#5CC7CF] px-6 py-3 font-roboto text-xs font-bold text-white transition hover:bg-[#27A3AC]"
              >
                Book your flight →
              </Link>

              <div className="mx-auto mt-10 h-[250px] w-full max-w-[500px] overflow-hidden rounded-[25px] shadow-xl sm:h-[300px] lg:mx-0 lg:mt-[60px] lg:h-[330px]">
                <img
                  src={assets.booking}
                  alt="Flight booking and seat selection"
                  width="500"
                  height="330"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <BookingSteps />
          </div>
        </section>

        <footer
          id="contact"
          className="w-full bg-[#88C3C7] px-4 pt-14 text-white sm:px-6"
        >
          <div className="mx-auto grid w-full max-w-[1100px] gap-12 pb-12 text-center md:grid-cols-3 md:text-left">
          
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-[44px]">
                Krish AirLine
              </h2>

              <p className="mx-auto mt-5 max-w-[370px] text-sm leading-7 text-white/90 md:mx-0">
                Welcome to Krish Airline for seamless experience
                24 X 7 Support
              </p>
            </div>

            <div>
              <h3 className="mb-5 text-xl font-bold">
                Quick Link
              </h3>

              <div className="flex flex-col gap-3 text-sm">
                <Link
                  to="/"
                  className="transition hover:opacity-70"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="transition hover:opacity-70"
                >
                  About
                </Link>

                <Link
                  to="/flights"
                  className="transition hover:opacity-70"
                >
                  Flight
                </Link>

                <Link
                  to="/contact"
                  className="transition hover:opacity-70"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-5 text-xl font-bold">
                Follow Links
              </h3>

              <div className="flex justify-center gap-4 md:justify-start">
                <Link
                  to="/contact"
                  aria-label="Phone"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg transition hover:bg-[#27A3AC]"
                >
                  ☎
                </Link>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 font-bold transition hover:bg-[#27A3AC]"
                >
                  f
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 font-bold transition hover:bg-[#27A3AC]"
                >
                  in
                </a>

                <a
                  href="#"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 font-bold transition hover:bg-[#27A3AC]"
                >
                  ◉
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/50 py-5 text-center text-xs font-semibold sm:text-sm">
            © {new Date().getFullYear()} Krish Airline. All Rights Reserved.
          </div>
        </footer>
      </main>
    </>
  );
}