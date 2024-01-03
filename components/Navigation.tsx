import Link from "next/link";
import { Github } from "lucide-react";

export default function Navigation() {
  return (
    <div className="w-full h-[40px] flex justify-between items-center bg-slate-900 text-white px-4">
      <Link href="/">String Search Visualizer</Link>
      <Link href="https://github.com/jihundoh0109/string-search-visualizer">
        <Github />
      </Link>
    </div>
  );
}
