import Image from "next/image"
import Link from "next/link"
import icon from "@img/sccbd-icon.png"

export default function Header() {
	  return (
	<header className="flex justify-between bg-white items-center w-full h-24 md:px-24 px-8 shadow-md z-[100]">
	  <Link className="flex items-center" href="/">
		<Image src={icon} alt="logo" width={60} height={60} />
		<h1 className="text-3xl font-bold ml-1 hidden md:block">TelecoToken</h1>
	  </Link>
	  <div className="h-full flex items-center justify-between [&>a]:mx-2 [&>a]:text-lg">
		{/* <Link className="h-full px-4 flex items-center hover:bg-neutral-200" href="/marks">
		  Poner Notas
		</Link> */}
		<Link className="h-full px-4 flex items-center bg-blue-600 font-bold text-white hover:bg-blue-700" href="/">
		  Login
		</Link>
		<Link className="h-full px-4 flex items-center hover:bg-neutral-200 font-bold" href="/register">
		  Registrarse
		</Link>
	  </div>
	</header>
  )
}