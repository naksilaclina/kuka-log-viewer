import Image from "next/image";
import LogViewer from "@/components/log-viewer/LogViewer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <LogViewer />
    </div>
  );
}