import { HeaderLogo } from "@/components/headerlogo"
import { Navigation } from "./navigation"

export const Header = () => {
  return (
    <>
      <header className='bg-gradient-to-b from-blue-500 to-bl px-4 py-8 lg:px-14 pb-36'>
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full flex items-center justify-between mb-14">
            <div className="flex items-center lg:gap-x-16">
              <HeaderLogo/>
              <Navigation/>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

