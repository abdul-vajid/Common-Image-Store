import React, { useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  Switch
} from "@material-tailwind/react";
import { SubscriptionModal } from "../common/SubscriptionModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks/storeHook";
import { signout, setIsJustSignFalse } from "../../redux/reducers/userSlice";
import { TierSwitchAlert } from "../common/TierSwitchingAlert";

export const NavbarDefault: React.FC = () => {
  const { isJustSign, tier } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleSignout = () => dispatch(signout());

  const [isTierSwitchAlert, setTierSwitchAlert] = React.useState(false);

  const handleTierSwitchAlert = () => {
    setTierSwitchAlert(!isTierSwitchAlert)
  };

  const handleSwith = () => {
    switch (tier) {
      case "PRO":
        setTierSwitchAlert(true)
        break;
      default:
        setOpen(true)
    }
  }

  useEffect(() => {
    if (tier === "FREE" && isJustSign) {
      setOpen(true)
      dispatch(setIsJustSignFalse())
    }
  }, [isJustSign])


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
              onChange={handleSwith}
              checked={tier === "PRO" ? true : false}
              id="custom-switch-component"
              ripple={false}
              label={
                <Typography color="blue-gray" className="font-medium">
                  {tier}
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
      {isTierSwitchAlert && <TierSwitchAlert open={isTierSwitchAlert} handleOpen={handleTierSwitchAlert} />}
      <SubscriptionModal handleOpen={handleOpen} open={open} />
    </>
  );
}