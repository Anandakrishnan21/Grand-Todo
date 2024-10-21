import {
    AiOutlineCalendar,
    AiOutlineDashboard,
    AiOutlineInbox,
    AiOutlineSearch,
  } from "react-icons/ai";
  
export const getSidebarOptions = (segment) => [
  {
    name: "Dashboard",
    href: "/home",
    icon: AiOutlineDashboard,
    current: segment === "home",
  },
  {
    name: "Testing",
    href: "/testing",
    icon: AiOutlineDashboard,
    current: segment === "testing",
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: AiOutlineInbox,
    current: segment === "inbox",
  },
  {
    name: "Search",
    href: "/search",
    icon: AiOutlineSearch,
    current: segment === "search",
  },
  {
    name: "Today",
    href: "/today",
    icon: AiOutlineCalendar,
    current: segment === "today",
  },
  {
    name: "Upcoming",
    href: "/upcoming",
    icon: AiOutlineCalendar,
    current: segment === "upcoming",
  },
];
