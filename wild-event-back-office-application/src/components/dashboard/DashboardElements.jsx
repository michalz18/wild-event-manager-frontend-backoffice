import EventIcon from "@mui/icons-material/Event";
import NotificationIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";

const itemList = [
  { text: "Event management", icon: <EventIcon />, path: "/event-management/event" },
  { text: "My events", icon: <NotificationIcon />, path: "/my-events/event" },
  { text: "Employee management", icon: <PersonIcon />, path: "/staff-management" },
  { text: "Map configuration", icon: <MapIcon />, path: "/map-config/map" },
];

export default itemList; 