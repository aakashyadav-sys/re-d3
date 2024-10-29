"use client";
import React, { useState , useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../../public/assets/images/express-group-logo-footer.png";
import Image from "next/image";
import { Menu, MenuItem } from "@mui/material";
import { useRouter , usePathname} from 'next/navigation';


const drawerWidth = 240;

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
      // Check for the token in localStorage when the component mounts
      const token = localStorage.getItem('token');
      if (token) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
      }
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login or home page
    router.push('/login'); // Adjust the path as needed
};


  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "left" }}>
      <Box className="flex flex-col pl-4 pt-4 ">
        <Button
          href="http://expresswayshipping.com/"
          className=" text-black hover:text-[#ffc400] justify-start "
        >
          HOME
        </Button>
        <Button
          href="http://expresswayshipping.com/about-us.html"
          className=" text-black hover:text-[#ffc400] justify-start "
        >
          About US
        </Button>
        <div className="flex items-center ">
          <Button
            className=" text-black hover:text-[#ffc400] justify-start "
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            href="http://expresswayshipping.com/services.html"
          >
            SERVICES
          </Button>
          <span className="expand-btn" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </span>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
          className="flex flex-col"
        >
          <MenuItem>
            <Button
              className=" text-black hover:text-[#ffc400] w-full justify-start "
              href="http://expresswayshipping.com/nvocc.html"
            >
              NVOCC
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              className=" text-black hover:text-[#ffc400] w-full justify-start "
              href="http://expresswayshipping.com/agency.html"
            >
              AGENCY
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              className=" text-black hover:text-[#ffc400] w-full justify-start "
              href="http://expresswayshipping.com/air-cargo.html"
            >
              AIR CARGO
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              className=" text-black hover:text-[#ffc400] w-full justify-start "
              href="http://expresswayshipping.com/freight-forwarding.html"
            >
              FREIGHT FORWARDING
            </Button>
          </MenuItem>
        </Menu>

        <Button
          href="http://expresswayshipping.com/our-presence.html"
          className=" text-black hover:text-[#ffc400] justify-start "
        >
          Our Presence
        </Button>
        <Button
          onClick={handleDrawerToggle}
          className=" text-black hover:text-[#ffc400] justify-start "
          href={path ===   `/customerPortal/bl/list` ? `#` : `/customerPortal/bl/list` }
        >
          Customer Portals
        </Button>
        <Button
          href="http://expresswayshipping.com/career.html"
          className=" text-black hover:text-[#ffc400] justify-start "
        >
          Career
        </Button>
        <Button
          href="http://expresswayshipping.com/contact-us.html"
          className=" text-black hover:text-[#ffc400] justify-start "
        >
          Contact Us
        </Button>
        <Button
          // href="/login"
          className=" text-black bg-[#ffc400] hover:bg-[#ffc400]  rounded-none font-bold w-fit justify-start "
          onClick={handleLogout}
        >
          {isAuthenticated ? 'Logout': 'Login' }
        </Button>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" position="relative" sx={{ boxShadow: "none" }}>
        <Toolbar
          className="flex sm:flex-row  flex-row-reverse justify-between w-full py-2 "
          sx={{ backgroundColor: "white" }}
        >
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <a
            className="logo header-logo"
            href="http://expresswayshipping.com/"
          >
            <Image
              src={logo}
              width={155}
              height={175}
              alt="logo"
              layout="responsive"
              sizes="(max-width: 768px) 120px, 155px"
            />
          </a>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              background: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              padding: "10px",
            }}
          >
            <Button
              className=" text-black hover:text-[#ffc400] "
              href="http://expresswayshipping.com/"
            >
              HOME
            </Button>
            <Button
              className=" text-black hover:text-[#ffc400] "
              href="http://expresswayshipping.com/about-us.html"
            >
              About US
            </Button>
            <Button
              className=" text-black hover:text-[#ffc400] "
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              href="http://expresswayshipping.com/services.html"
            >
              SERVICES
              <span
                className="expand-btn"
                onClick={handleClick}
                onMouseOver={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </span>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              className="flex flex-col"
            >
              <MenuItem>
                <Button
                  className=" text-black hover:text-[#ffc400] w-full justify-start "
                  href="http://expresswayshipping.com/nvocc.html"
                >
                  NVOCC
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  className=" text-black hover:text-[#ffc400] w-full justify-start "
                  href="http://expresswayshipping.com/agency.html"
                >
                  AGENCY
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  className=" text-black hover:text-[#ffc400] w-full justify-start "
                  href="http://expresswayshipping.com/air-cargo.html"
                >
                  AIR CARGO
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  className=" text-black hover:text-[#ffc400] w-full justify-start "
                  href="http://expresswayshipping.com/freight-forwarding.html"
                >
                  FREIGHT FORWARDING
                </Button>
              </MenuItem>
            </Menu>

            <Button
              className=" text-black hover:text-[#ffc400] "
              href="http://expresswayshipping.com/our-presence.html"
            >
              Our Presence
            </Button>
            <Button className=" text-black hover:text-[#ffc400] " href={path ===   `/customerPortal/bl/list` ? `#` : `/customerPortal/bl/list` }
            >
              Customer Portals
            </Button>
            <Button
              className=" text-black hover:text-[#ffc400] "
              href="http://expresswayshipping.com/career.html"
            >
              Career
            </Button>
            <Button
              className=" text-black hover:text-[#ffc400] "
              href="http://expresswayshipping.com/contact-us.html"
            >
              Contact
            </Button>
            <Button
              className=" text-black bg-[#ffc400] hover:bg-[#ffc400]  rounded-none font-bold ml-2 "
              onClick={handleLogout}
            >
              {isAuthenticated ? 'Logout': 'Login' }
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#f3f3f3",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
