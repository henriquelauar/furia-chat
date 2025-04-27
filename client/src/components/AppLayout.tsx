import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import Header from "../components/Header";

export default function Layout ({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-grow-1 flex-column flex-md-row">
        <Sidebar />
        <MobileSidebar />
        <main className="flex-grow-1">
          {children}
        </main>
      </div>
    </div>
  );
}
