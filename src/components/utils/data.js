import {
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineInbox,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdOutlineUpcoming } from "react-icons/md";

export const getSidebarOptions = (segment) => [
  {
    name: "Dashboard",
    href: "/home",
    icon: AiOutlineDashboard,
    current: segment === "home",
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
    href: "/day",
    icon: AiOutlineCalendar,
    current: segment === "day",
  },
  {
    name: "Upcoming",
    href: "/coming",
    icon: MdOutlineUpcoming,
    current: segment === "coming",
  },
];
