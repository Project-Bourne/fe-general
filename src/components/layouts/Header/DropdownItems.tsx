import Link from 'next/link';
import { useSelector } from 'react-redux';
import interrogator from "../../../assets/icons/interrogator.svg";
import summarizer from '../../../assets/icons/summarizer.svg';
import irp from '../../../assets/icons/irp.svg';
import translator from '../../../assets/icons/translator.svg';
import collab from '../../../assets/icons/collab.svg';
import fact from '../../../assets/icons/fact.svg';
import analyzer from '../../../assets/icons/analyzer.svg';
import deep_chat from '../../../assets/icons/deep.svg';
import Image from 'next/image';

// const BASE_URL = 'http://192.81.213.226';
// Using environment variables for the base URL and ports
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

const dropdownItems = [
  {
    name: 'IRP',
    // to: `${BASE_URL}:30/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_IRP_PORT}/home`,
    key: 'irp',
    icon: irp
  },
  {
    name: 'Collab',
    // to: `${BASE_URL}:36/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_COLLAB_PORT}/chats`,
    key: 'collab',
    icon: collab
  },
  {
    name: 'Analyzer',
    // to: `${BASE_URL}:31/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_ANALYZER_PORT}/home`,
    key: 'analyser',
    icon: analyzer
  },
  {
    name: 'Summarizer',
    // to: `${BASE_URL}:32/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_SUMMARIZER_PORT}/home`,
    key: 'summarizer',
    icon: summarizer
  },
  {
    name: 'Translator',
    // to: `${BASE_URL}:33/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_TRANSLATOR_PORT}/home`,
    key: 'translator',
    icon: translator
  },
  {
    name: 'Fact checker',
    // to: `${BASE_URL}:34/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_FACT_CHECKER_PORT}/home`,
    key: 'fact checker',
    icon: fact
  },
  {
    name: 'Deep Chat',
    // to: `${BASE_URL}:35/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_DEEP_CHAT_PORT}/home`,
    key: 'deep chat',
    icon: deep_chat
  },
  {
    name: 'Interrogator',
    // to: `${BASE_URL}:82/home`,
    to: `${BASE_URL}:${process.env.NEXT_PUBLIC_INTERROGATOR_PORT}/home`,
    key: 'interrogator',
    icon: interrogator
  }
];

function DashboardDropdown() {
  // Assuming permissions is an array of strings representing permissions
  const { permissions } = useSelector(
    (state: any) => state?.auth?.userInfo?.role
  );

  return (
    <ul className="bg-sirp-lightGrey shadow absolute top-[3rem] right-[1rem] pt-1 flex md:grid grid-cols-3 rounded z-30 w-[130px] md:w-[300px]">
      {dropdownItems.map((item, index) => {
        const shouldRender = item.key === 'irp' || permissions.includes(item.key);
        
        return (
          shouldRender && (
            <li
              key={index}
              className="py-1.5 px-2 min-h-[56px] text-black border-b-[1px] border-r-[1px] border-b-gray-200/[0.5] border-r-gray-200/[0.5] text-[12px] text-center"
            >
              <Link href={item.to} className="h-full rounded-lg grid gap-x-3 justify-center items-center hover:bg-white hover:cursor-pointer hover:text-sirp-primary">
                <Image
                  src={item.icon}
                  alt={item.key}
                  className={`${
                    item.key !== "deep chat"
                      ? "h-[10px] w-[10px] md:mx-auto"
                      : "h-[20px] w-[10px] md:mx-auto"
                  } `}
                />
                <span className="text-center">{item.name}</span>
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
}

export default DashboardDropdown;

