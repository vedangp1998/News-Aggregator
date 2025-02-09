import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Avatar } from "@mui/material";

interface Props {
  window?: () => Window;
}

const drawerWidth = 250;
const navItems = ["Home ", "For you", "Top-Headlines"];

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <IconButton>
          <NewspaperIcon />
        </IconButton>
        <Typography variant="h6" sx={{ my: 2 }}>
          News Aggregator
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: "10px",
        }}
      >
        <Button sx={{ color: "#ffffff" }}>Login</Button>
        <Button sx={{ color: "#ffffff" }}>Signup</Button>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar component="nav">
        <Toolbar
          sx={{
            background: " linear-gradient(90deg, #132130 0%, #303030 100%)",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton>
                <NewspaperIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: {
                    sm: "block",
                  },
                }}
              >
                News Aggregator
              </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    flexDirection: "row",
                    color: "#ffffff",
                    fontWeight: 500,
                    padding: "12px",
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <Button sx={{ color: "#ffffff" }}>Login</Button>
                <Button sx={{ color: "#ffffff" }}>Signup</Button>
              </Box>
              <IconButton
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar sx={{ bgcolor: "grey" }}>V</Avatar>
              </IconButton>
            </Box>
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box sx={{ p: 3 }}></Box>
    </Box>
  );
}
