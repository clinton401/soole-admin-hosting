// import Image from "next/image";

import Sidebar from "./components/Sidebar";
import Wrapper from "./components/Wrapper";



export default function Home() {
  return (
    <div className="d-flex container">
      <Sidebar/>
      <Wrapper/>
    </div>
  );
}
