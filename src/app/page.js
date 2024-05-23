import Link from "next/link";
import Navbar from "./Components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen relative flex-col items-center justify-center p-24 landing-page">
      <div className="z-10 absolute top-0 right-0 pr-4 py-4">
        <Navbar />
      </div>

      <h1 className="h1">
        Welcome to <span>OpenTech Global Service </span> Limited
      </h1>
      <p className="h2">
        Click here to reach out to us with your inquiries, and we'll get back to
        you as soon as possible. <br /> We're here to assist you.
      </p>
      <Link href="/logissue" className="button">
        Log an Issue
      </Link>
    </main>
  );
}
