import Image from "next/image";

 function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 felx flex-col w-full lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/home.gif" fill alt="home image"/>

      </div>
      
    </div>
  );
}

export default Home