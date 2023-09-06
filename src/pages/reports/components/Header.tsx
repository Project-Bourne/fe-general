import Image from "next/image";

function Header() {
  return (
    <div className="flex flex-wrap justify-between items-center py-4">
      <h1 className="text-[20px] md:text-[30px] font-bold">Reports</h1>
      <div className="flex gap-x-2 items-center">
        <Image
          src={require("../../../assets/icons/on.exports.svg")}
          alt="exports"
          height={35}
          width={35}
          className="p-2 border-[2px] border-gray-200 rounded-md cursor-pointer"
        />
        <Image
          src={require("../../../assets/icons/on.share.svg")}
          alt="archive"
          height={35}
          width={35}
          className="p-2 border-[2px] border-gray-200 rounded-md cursor-pointer"
        />
        <Image
          src={require("../../../assets/icons/on.bookmark.svg")}
          alt="archive"
          height={35}
          width={35}
          className="p-2 border-[2px] border-gray-200 rounded-md cursor-pointer"
        />
        <div className="flex gap-x-2 items-center py-2 px-1.5 md:px-4 bg-sirp-primary text-white cursor-pointer rounded-md">
          <Image
            src={require("../../../assets/icons/doc.svg")}
            alt="export"
            height={20}
            width={20}
            className=""
          />
          <p className="text-[12px] md:text-[14px]">Export report</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
