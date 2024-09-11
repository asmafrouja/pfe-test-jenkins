import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListOrders from "../components/ListOrders";
import ProfileDetails from "../components/ProfileDetails";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileDisplay, setProfileDisplay] = useState(true);
  const [ordersDisplay, setOrdersDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="flex">
      <Card className="h-full w-16 lg:w-52 p-4 shadow-xl shadow-blue-gray-900/5 fixed">
        <List>
          <ListItem
            className="flex items-center justify-center lg:justify-start gap-3 p-2"
            onClick={() => {
              setProfileDisplay(true);
              setOrdersDisplay(false);
            }}
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-6 w-6 text-black" />
            </ListItemPrefix>
            <span className="hidden lg:inline text-black">Profil</span>
          </ListItem>
          <ListItem
            className="flex items-center justify-center lg:justify-start gap-3 p-2"
            onClick={() => {
              setProfileDisplay(false);
              setOrdersDisplay(true);
            }}
          >
            <ListItemPrefix>
              <Cog6ToothIcon className="h-6 w-6 text-black" />
            </ListItemPrefix>
            <span className="hidden lg:inline text-black">Mes commandes</span>
          </ListItem>
          <ListItem
            className="flex items-center justify-center lg:justify-start gap-3 p-2"
            onClick={() => handleLogout()}
          >
            <ListItemPrefix>
              <PowerIcon className="h-6 w-6 text-black" />
            </ListItemPrefix>
            <span className="hidden lg:inline text-black">Déconnecter</span>
          </ListItem>
        </List>
      </Card>
      <div className="p-6 ml-16 lg:ml-52 w-full">
        {profileDisplay ? <ProfileDetails /> : ordersDisplay && <ListOrders />}
      </div>
    </div>
  );
}
