import MobileSidebar from "./MobileSidebar"

function MobileHeader() {
  return (
   <nav className="bg-green-500 z-50 px-6 h-[50px] w-full flex items-center border-b fixed top-0 lg:hidden">
    <MobileSidebar/>
   </nav>
  )
}

export default MobileHeader