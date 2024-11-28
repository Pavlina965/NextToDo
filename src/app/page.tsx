/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container } from "@mui/material";
import ShowTaks from "./Components/showTask";

import Sidebar from "./Components/sidebar";
import { Suspense } from "react";
const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container>
        <h1>Todolist</h1>
        <Suspense>
          <ShowTaks />
        </Suspense>
      </Container>
    </Box>
  );
};
export default Home;
