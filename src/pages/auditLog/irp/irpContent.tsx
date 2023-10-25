import Link from "next/link";
import { ActivityCardModel } from "@/global/users.module";

const IrpContent = ({
  time,
  actionText,
  activityText,
  // docId,
  moduleName,
  userName
}: ActivityCardModel) => {
  return (
    <div className="w-[90%] mt-[2rem] grid grid-cols-2 md:flex gap-x-2 mx-auto">
      <h3 className="text-[14px] text-[#6F7A82]">{time}</h3>
      <div className="w-full grid rounded-2xl bg-[#F9F9F9] p-6">
        <div>
          <h2 className="inline-block rounded-2xl border-[1px] border-gray-300 bg-white mb-2 px-2 py-1 text-[14px]">
           {moduleName}
          </h2>
        </div>
        <div className="md:flex justify-between flex-col items-start gap-5">
        <div className="flex gap-x-3">
            <label className="text-[13px] text-sirp-grey font-bold">User:</label>
            <p className="text-[14px] capitalize">{userName}</p>
          </div>
          <div className="flex gap-x-3">
            <label className="text-[13px] text-sirp-grey font-bold">Action:</label>
            <p className="text-[14px]">{actionText}</p>
          </div>
          <div className="flex gap-x-3">
            <label className="text-[13px] text-sirp-grey font-bold">IP Address:</label>
            <p className="text-[14px]">{activityText}</p>
          </div>
         
          {/* <div className="py-1 px-4 rounded-xl bg-white text-[12px] text-sirp-primary border-[1px] border-gray-300 cursor-pointer">
            <Link href={`/${docId}`}>view doc</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default IrpContent;
