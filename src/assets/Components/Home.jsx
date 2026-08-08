import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const FlightSearch = lazy(() => import("./FlightSearch"));

const assets = {
  logo:
    "/flight_system.webp",

  booking:
    "/seats.webp",
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
    icon: "🔒",
    title: "Secure Account",
    description: "Your data is protected with top security.",
  },
  {
    icon: "💎",
    title: "Exclusive Deals",
    description: "Get access to special offers and discounts.",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "We're here to help you anytime.",
  },
  {
    icon: "✈️",
    title: "Easy Travel",
    description: "Simple steps to book your seats.",
  },
];

function FeatureCard() {
  return (
    <section
      id="features"
      className="w-full bg-gray-50 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Why Choose Us
          </span>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need for Easy Travel
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Everything you need for a simple, secure, and comfortable
            flight booking experience.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li key={feature.title}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="mb-4 text-4xl"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BookingSteps() {
  return (
    <div className="grid gap-4">
      {steps.map(([label, number, variant]) => (
        <div
          key={number}
          className={`flex items-center gap-4 rounded-xl border p-4 transition hover:shadow-md ${variant === "primary"
              ? "border-blue-100 bg-blue-50"
              : "border-gray-200 bg-white"
            }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold ${variant === "primary"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
              }`}
          >
            {number}
          </div>

          <p className="text-sm font-semibold text-gray-800">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const selector = useSelector((state) => state.staff);

  return (
    <>
      <Helmet>
        <title>
          Flight Booking and Flight Ticket Deals Online
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
          content="https://airportsystem.netlify.app/flight_system.png"
        />
        <meta
          property="og:url"
          content="https://airportsystem.netlify.app/"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
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
          content="https://airportsystem.netlify.app/flight_system.png"
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
            name: "Airport System",
            publisher: {
              "@type": "Person",
              name: "Krish Patel",
              image: {
                "@type": "ImageObject",
                url: "https://airportsystem.netlify.app/flight_system.png",
              },
            },
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white text-gray-900">

        <section
          id="home"
          className="relative min-h-[650px] w-full overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="/hero.webp"
              alt="Smart flight booking"
              width="1196"
              height="587"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/50"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto flex min-h-[650px] w-full max-w-[1100px] items-center px-4 py-20 sm:px-6 lg:px-0">
            <div className="max-w-3xl text-white">

              <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                ✈ Smart Flight Booking
              </span>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Smart Flight System for Easy Travel Management
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-100">
                Find and book flights instantly with our Flight
                System. Compare ticket deals, view seat maps, and
                track live flight status—all in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/flights"
                  className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Book Flight →
                </Link>

                <Link
                  to={
                    selector.passenger
                      ? "/AddFlight"
                      : "/Signup"
                  }
                  className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {selector.passenger
                    ? "Add Flight"
                    : "Get Started"}
                </Link>
              </div>

            </div>
          </div>
        </section>

        <section
          id="search"
          className="w-full bg-white px-4 py-12 sm:px-6"
        >
          <div className="mx-auto w-full max-w-[1100px]">
            <Suspense
              fallback={
                <div className="flex h-32 items-center justify-center text-gray-600">
                  Loading flight search...
                </div>
              }
            >
              <FlightSearch />
            </Suspense>
          </div>
        </section>

        <FeatureCard />

        <section
          id="about"
          className="w-full bg-white px-4 py-20 sm:px-6"
        >
          <div className="mx-auto grid w-full max-w-[1100px] justify-center gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                How It Works
              </span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Booking Steps
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-gray-700">
                Our website makes every part of your journey seamless, simple, and supported from takeoff to landing.
              </p>

              <Link
                to="/flights"
                className="mt-7 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              > Book Your Flight → </Link>

              {/* <div className="mt-8 overflow-hidden rounded-2xl shadow-xl"> */}
                <img
                  src={assets.booking}
                  alt="Flight booking interface"
                  width="245"
                  height="196"
                  loading="lazy"
                  decoding="async"
                  className="h-[200px] w-[250px] object-cover mt-6 rounded-2xl shadow-xl"
                />
              
            </div>
            <BookingSteps />
          </div>
        </section>

        <footer
          id="contact"
          className="w-full bg-gray-950 px-4 py-14 text-gray-300 sm:px-6"
        >
          <div className="mx-auto grid w-full max-w-[1100px] gap-10 md:grid-cols-3">
            <div>
              <h2 className="text-2xl font-bold text-white"> SkyConnect Airport Services </h2>

              <p className="mt-4 max-w-sm leading-7 text-gray-300">
                Welcome to SkyConnect Airport Services for a seamless travel experience with reliable 24 X 7 support.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">
                Quick Links
              </h3>

              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link
                    to="/"
                    className="transition hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="transition hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/flights"
                    className="transition hover:text-white"
                  >
                    Flights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="transition hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white">
                Follow Links
              </h3>
              <div className="mt-5 flex gap-3">
                <Link
                  to="/contact"
                  aria-label="Phone"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-600"
                >
                  ☎
                </Link>
                <Link
                  to="/contact"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 font-bold transition hover:bg-blue-600"
                >
                  f
                </Link>
                <Link
                  to="/contact"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 font-bold transition hover:bg-blue-600"
                >
                  in
                </Link>
                <Link
                  to="/contact"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-600"
                >
                  ◉
                </Link>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-12 w-full max-w-[1100px] border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SkyConnect Airport Services.
            All Rights Reserved.
          </div>
        </footer>
      </main>
    </>
  );
}