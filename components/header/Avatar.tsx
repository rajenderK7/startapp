import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";
import { auth } from "../../lib/firebase/firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import UserContext from "../../lib/contexts/userContext";

interface AvatarI {
  profileURL: string | undefined | null;
  title: string;
}

const Avatar = ({ profileURL, title }: AvatarI) => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      handleClose();
      await auth.signOut();
    } catch (err) {
      toast.error("something went weong... 😥");
    }
  };

  const handleProfileButton = () => {
    handleClose();
    router.push(`/${username}`);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div className="relative object-cover h-[30px] w-[30px]">
          <Image
            className="rounded-lg"
            src={profileURL ?? ""}
            alt={title}
            objectFit="contain"
            layout="fill"
          />
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfileButton}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Avatar;
