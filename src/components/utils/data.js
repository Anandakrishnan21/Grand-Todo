import {
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineInbox,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdOutlineGroups, MdOutlineUpcoming } from "react-icons/md";

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
    name: "Group",
    href: "/group",
    icon: AiOutlineUsergroupAdd,
    current: segment === "group",
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
