import {SidebarCollection} from "./SidebarCollection.js";
import {Header} from "./Header";

export const Home = () => {
  return <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-3 max-md:col-span-3 max-lg:col-span-2 min-xl:col-span-3">
          <div className="fixed h-full left-5 top-3 pb-9">
              <SidebarCollection/>
          </div>
      </div>
      <div className="max-md:col-span-9 max-lg:col-span-10 min-xl:col-span-9 min-h-screen items-center justify-center flex">
          <div className="w-full">
              <Header/>
          </div>
          {/*bg-clip-text: cắt văn bản vào nền; text-transparent làm cho văn bản trở nên trong suốt.*/}
          <h1 className="font-black font-mono text-[26px]
          bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400
          inline-block text-transparent bg-clip-text">Xin chào, Ban!</h1>
      </div>
  </div>
}