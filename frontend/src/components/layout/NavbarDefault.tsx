import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Switch
} from "@material-tailwind/react";
import { SubscriptionModal } from "../common/SubscriptionModal";
import { useAppDispatch } from "../../app/hooks/storeHook";
import { signout } from "../../redux/reducers/userSlice";

export const NavbarDefault: React.FC = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleSignout = () => dispatch(signout());
  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-primary">
          <Typography
            as="a"
            className="mr-4 hidden md:inline-block cursor-pointer py-1.5 text-2xl font-bold"
          >
            Common Image Store
          </Typography>
          <Typography
            as="a"
            className="mr-4 inline-block md:hidden text-2xl cursor-pointer py-1.5 font-semibold"
          >
            CIS
          </Typography>
          <div className="flex align-middle gap-4">
            <Switch
              onChange={handleOpen}
              id="custom-switch-component"
              ripple={false}
              label={
                <Typography color="blue-gray" className="font-medium">
                  PRO
                </Typography>
              }
              className="h-full w-full checked:bg-primary"
              containerProps={{
                className: "w-11 h-6",
              }}
              circleProps={{
                className: "before:hidden left-0.5 border-none",
              }}
              crossOrigin={undefined}
            />
            <Button variant="gradient" type="button" onClick={handleSignout} size="sm" className="inline-block">
              <span>Sign out</span>
            </Button>
          </div>
        </div>
      </Navbar>
      <SubscriptionModal handleOpen={handleOpen} open={open} />
    </>
  );
}