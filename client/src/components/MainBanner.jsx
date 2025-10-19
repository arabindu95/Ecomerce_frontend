import React from "react";
import { useLocation } from "react-router-dom";
import bannericon from "../assets/main_banner_bg.png";
import mobilebanner from "../assets/main_banner_bg_sm.png";
import whitearrowicon from "../assets/white_arrow_icon.svg";
import blackarrowicon from "../assets/black_arrow_icon.svg";
import bannerCoc from "../assets/mainBannerCoc.jpg";
import bannerBakery from "../assets/mainBannerrBakery.jpg";
import bannerFruits from "../assets/MainBannerFruits.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MainBanner = () => {
  const [current, setCurrent] = useState(0);
  const DesktopImg = [
    { img: bannericon, color: "text-black" },
    { img: bannerCoc, color: "text-white" },
    { img: bannerFruits, color: "text-white" },
    { img: bannerBakery, color: "text-white" },
  ];

  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  if (isSellerPath) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % DesktopImg.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!isSellerPath && (
        <div className="relative">
          <img
            src={DesktopImg[current].img}
            alt={`banner ${current}`}
            className="w-full hidden md:block md:h-[500px] py-8 px-16 lg:px-24 "
          />

          <img src={mobilebanner} alt="mobilebanner" className=" md:hidden" />
          <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-26 lg:pl-48">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72       md:max-w-80 lg:max-w-96 leading-tight lg:leading-14 cursor-context-menu ${DesktopImg[current].color}`}
            >
              Freshness You Can Trust, Savings Yoy Will Love !
            </h1>

            <div className=" flex items-center mt-6 font-medium">
              <Link
                to={"/products"}
                className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
              >
                Shop now
                <img
                  src={whitearrowicon}
                  alt="whitearrowicon"
                  className="md:hidden  transition group-focus:translate-x-1"
                />
              </Link>

              <Link
                to={"/products"}
                className={`group hidden md:flex items-center gap-2 md:px-9 py-3 cursor-pointer ${DesktopImg[current].color}`}
              >
                Explore Deals
                <img
                  src={blackarrowicon}
                  alt="blackarrowicon"
                  className={`transition group-hover:translate-x-1 ${DesktopImg[current].color}`}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainBanner;
