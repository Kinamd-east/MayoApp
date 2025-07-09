import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./Button.tsx";

export const InfiniteMovingCards = ({
  items,
  direction,
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    image: string;
    name: string;
    supply: string;
    mindshare: string;
    change: string;
    username: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden ",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex flex-col bg-[#cccaa1] w-full max-w-4xl p-4 rounded-xl space-y-4"
          >
            {/* Top section */}
            <div className="flex flex-row justify-between items-start p-2">
              {/* Left: Avatar + Info */}
              <div className="flex flex-row gap-3 items-center flex-grow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-full w-14 h-14 border p-0.5 object-cover"
                />
                <div className="flex flex-col overflow-hidden">
                  <h1 className="font-bold text-xl text-black truncate">
                    {item.name}
                  </h1>
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {item.username}
                  </p>
                </div>
              </div>

              {/* Right: Mindshare */}
              <div className="flex flex-col items-end text-right whitespace-nowrap">
                <h1 className="font-bold text-black text-lg">
                  {item.mindshare}
                </h1>
                <p
                  className={`text-[14px] font-semibold ${
                    parseFloat(item.change) < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {parseFloat(item.change) < 0 ? "🔻" : "🔺"} {item.change}%
                </p>
              </div>
            </div>

            {/* Bottom section */}
            <div className="w-full flex flex-col gap-1 text-left">
              <p className="text-gray-500">Total Token Supply</p>
              <h1 className="font-bold text-black text-lg">{item.supply}</h1>
              <Button className="w-full cursor-pointer hover:bg-gray-600">
                View
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
