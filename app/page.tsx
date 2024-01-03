import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import Workspace from "@/components/Workspace";

export default function Home() {
  return (
    <div className="h-dvh">
      <Navigation />
      <div className="h-[calc(100%-40px)] flex flex-col-reverse md:flex-row divide-x divide-y divide-y-reverse">
        <Sidebar />
        <Workspace />
      </div>
    </div>
  );
}
