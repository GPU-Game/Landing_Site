import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";

const features = [
  "GPUs (NFTs): 50,000",
  "Dev Fee: 0%",
  "Build (mint) Price: 0.02 ETH",
  "Upgrade Price: 50k HASH",
  "Network: Base",
  "Mint Asset: wETH",
  "Upgrade Asset: HASH",
  "No Whitelist",
];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const gif = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 100) setIsScrolled(true);
      else setIsScrolled(false);
    };

    const startTime = new Date();

    const handleLoad = () => {
      const timeTaken = new Date() - startTime;

      if (timeTaken > 1000) setIsLoading(false);
      else setTimeout(() => setIsLoading(false), 500 - timeTaken);
    };

    window.addEventListener("scroll", handleScroll);
    gif.current.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      gif.current.removeEventListener("load", handleLoad);
    };
  }, []);

  gsap.registerPlugin(ScrollTrigger);

  const wrapper = useRef(null);
  const contentWrapper = useRef(null);
  const content = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentWrapper.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.current,
            start: "top top",
            end: "50% bottom",
            scrub: true,
            onLeave: () => {
              gsap.fromTo(
                content.current,
                { opacity: 0, yPercent: 10 },
                { opacity: 1, yPercent: 0, duration: 0.3 }
              );
            },
            onEnterBack: () => {
              gsap.fromTo(
                content.current,
                { opacity: 1, yPercent: 0 },
                { opacity: 0, yPercent: -10, duration: 0.3 }
              );
            },
          },
        }
      );
    },
    { revertOnUpdate: true, dependencies: [isLoading] }
  );

  return (
    <div
      ref={wrapper}
      className={`w-full ${
        isLoading ? "h-[100dvh] overflow-hidden pr-[15px]" : "h-[300dvh]"
      }`}
    >
      <div className="w-full h-[100dvh] flex justify-center items-center sticky top-0">
        <div
          className={`absolute inset-0 font-varela text-2xl flex justify-center items-center transition-opacity duration-300 z-10 bg-black ${
            isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Loading
        </div>

        <div className="w-full h-full flex justify-center items-center relative">
          <img
            ref={gif}
            src="/wanna-play.gif"
            alt="Wanna play a game?"
            className="w-[80%] max-h-full object-contain"
          />

          <span
            className={`absolute font-varela text-2xl bounce transition-all duration-300 ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          >
            Scroll To Play
          </span>
        </div>

        <div
          ref={contentWrapper}
          style={{ opacity: 0 }}
          className="absolute inset-0 bg-black flex items-center justify-center"
        >
          <div
            ref={content}
            style={{ opacity: 0 }}
            className="flex flex-col w-[90%] gap-8 xs:gap-10 md:gap-12 relative"
          >
            <div>
              <h1 className="text-[min(24vh,14.4vw)] xs:text-[min(20vh,12vw)] !leading-[1.05]">
                GPU.Game
              </h1>

              <h2 className="text-[min(8.4vh,5.04vw)] xs:text-[min(7vh,4.2vw)] !leading-[1.05]">
                Build, Upgrade, and start mining!
              </h2>
            </div>

            <ul>
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="font-varela text-sm xs:text-base md:text-lg opacity-50 underline !leading-[1.9]"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <div className="absolute bottom-0 right-0 flex flex-col items-end translate-y-[-1vh]">
              <h3 className="text-[min(20vh,12vw)] leading-[0.75]">#HASH</h3>
              <p className="text-[min(3vh,1.8vw)] md:text-[min(2.8vh,1.68vw)] leading-[0.75] mr-[1.2em]">
                {"What to expect --> Coming Soon!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;