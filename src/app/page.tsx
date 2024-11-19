/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container } from "@mui/material";
import ShowTaks from "./Components/showTask";

import Sidebar from "./Components/sidebar";
const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container>
        <h1>Todolist</h1>
        <ShowTaks />
      </Container>
    </Box>
  );
};
export default Home;
