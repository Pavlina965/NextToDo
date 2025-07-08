/* eslint-disable @typescript-eslint/no-unused-vars */
import ShowTask from "./components/showTask";
import AuthGuard from "./components/authGuard";

const Home = () => {
  return (
    <AuthGuard>
      <ShowTask />
    </AuthGuard>
  );
};
export default Home;
