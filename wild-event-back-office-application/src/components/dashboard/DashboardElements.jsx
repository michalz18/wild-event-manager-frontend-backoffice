import EventIcon from "@mui/icons-material/Event";
import NotificationIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";

const itemList = [
  { text: "Event management", icon: <EventIcon />, path: "/event-management/event", requiredRole: 'EVENT-MANAGEMENT' },
  { text: "My events", icon: <NotificationIcon />, path: "/my-events/event", requiredRole: 'MY-EVENTS' },
  { text: "Employee management", icon: <PersonIcon />, path: "/staff-management", requiredRole: 'EMPLOYEE-MANAGEMENT' },
  { text: "Map configuration", icon: <MapIcon />, path: "/map-config/map", requiredRole: 'MAP-CONFIGURATION' },
];


export default itemList; 