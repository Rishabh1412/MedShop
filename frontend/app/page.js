import Link from "next/link";

// app/page.js
export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4">Login or Signup to access your account</p>
      <div className="mt-6">
        <Link href="/login" className="text-zinc-800 mr-4 p-4 rounded-sm bg-yellow-100 ">Login</Link>
        <Link href="/signup" className="text-zinc-800 mr-4 p-4 rounded-sm bg-yellow-100 ">Signup</Link>
      </div>
    </div>
  );
}
