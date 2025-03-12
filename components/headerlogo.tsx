import Link from "next/link"
import Image from "next/image"

export const HeaderLogo = () => {
  return (
    <Link href={"/"}>
        <div className="items-center hidden lg:flex ">
    <Image src="/public/globe.svg" alt="Logo" width={28}height={20}/>
    <p className="font-semibold text-white text-2xl ml-2.5">Finance</p>
        </div>
    </Link>
  )
}
