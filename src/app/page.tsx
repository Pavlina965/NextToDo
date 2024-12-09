/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container } from "@mui/material";
import ShowTask from "./components/showTask";
import Sidebar from "./components/sidebar";

const Home = () => {
  return (
    <>
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        <Box sx={{ width: "250px", height: "100vh" }}>
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <ShowTask />
        </Box>
      </Box>
    </>
  );
};
export default Home;
