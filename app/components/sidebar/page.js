"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const linkNames = [
    {
      name: "Request for Quote",
      link: "/customerPortal/quotation/list",
      formLink: "/customerPortal/quotation",
    },
    {
      name: "Booking",
      link: "/customerPortal/booking/list",
      formLink: "/customerPortal/booking",
    },
    {
      name: "Shipper Instruction",
      link: "/customerPortal/bl/list",
      formLink: "/customerPortal/bl",
    },
    {
      name: "Invoice",
      link: "/customerPortal/invoice/list",
      formLink: "/customerPortal/invoice",
    },
    {
      name: "Track and Trace",
      link: "/customerPortal/track",
    },
    {
      name: "Vessel Schedule",
      link: "/customerPortal/vesselSchedule",
    },
  ];

  return (
    <div className=" h-full md:px-0 px-4 ">
      <ul className="md:w-48 md:fixed relative top-1/4 border border-[#ffc400] rounded-[40px] md:rounded-tl-none md:rounded-bl-none overflow-hidden  ">
        {linkNames.map((item, index) => {
          return (
            <li className="w-full group " key={index}>
              <Link
                href={item.link}
                className={`p-3 border-b border-[#ffc400] group-last:border-none hover:bg-[#ffc400] hover:text-white ${
                  pathname === item.link || pathname.startsWith(item.formLink)
                    ? "bg-[#ffc400] text-white"
                    : ""
                } transition-all ease-out whitespace-nowrap w-full h-full flex `}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
