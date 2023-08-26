import React, { useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import { NavbarDefault } from '../components/layout/NavbarDefault';
import { UploadModal } from '../components/common/UploadModal';
import { useAppSelector } from '../app/hooks/storeHook';
import { ImageCardWithModal } from '../components/common/ImageCardWithModal';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { tier, accessToken } = useAppSelector(state => state.userReducer);
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  console.log("acc", accessToken)

  useEffect(() => {
    if(!accessToken) navigate("/")
  }, [accessToken])
  return (
    <div className='relative h-full w-full bg-white'>
      <div className='fixed z-10 w-full'>
        <NavbarDefault />
      </div>
      <UploadModal handleOpen={handleOpen} open={open} />
      <div className='mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 max-w-screen-xl py-20 px-4 lg:px-8 lg:py-28'>
        <ImageCardWithModal />
        <ImageCardWithModal />
        <ImageCardWithModal />
        <ImageCardWithModal />
        <ImageCardWithModal />
        <ImageCardWithModal />
        <ImageCardWithModal />
        <ImageCardWithModal />
      </div>
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10">
        <Button
          onClick={handleOpen} variant="gradient"
          color={tier === "PRO" ? "deep-purple" : "gray"}
          className="flex items-center rounded-full py-4 px-8 md:py-5 md:px-10 gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload Files
        </Button>
      </div>
    </div>
  );
}
