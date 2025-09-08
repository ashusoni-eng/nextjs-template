import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold">Welcome to Next Template</h1>            
      <p className="text-center">
        Get started by editing <code className="font-mono font-bold">app/page.tsx</code>
        <Link href="/login" className="text-center"><button className="login-button">Login</button></Link>
      </p>      
    </div>
  );
}
