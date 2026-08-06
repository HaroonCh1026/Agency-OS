import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Agency OS</h1>

      <Link href="/login">Login</Link>

      <br />

      <Link href="/signup">Signup</Link>
    </main>
  );
}
