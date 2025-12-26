'use client';
import Chat from "@/components/Chat"
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/footer";


export default function Home() {
  return (


    <div className="dark:bg-dark pt-10 px-10 bg-slate-50">
    <div className="flex items-center justify-between">
      <Navbar />
      <Header />
      <ThemeToggle />
    </div>
    <div className="flex min-h-screen items-center justify-center">
      <Chat />
    
    </div>
    <Footer />
  </div>
  )
}
 