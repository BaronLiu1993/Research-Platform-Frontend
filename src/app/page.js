import Navbar from "./components/navbar";
import Login from "./pages/login"
import Register from "./pages/register"
import Repository from "./pages/repository";
import Resume from "./pages/resume"
import Email from "./pages/email"

export default function Home() {
  return (
    <>
      <Navbar />
      <Repository />
      <Email />
      <Resume />
      <Login />
      <Register />
    </>
    
  );
}
