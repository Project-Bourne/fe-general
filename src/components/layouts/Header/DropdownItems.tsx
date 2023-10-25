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

const BASE_URL = 'http://192.81.213.226';

const dropdownItems = [
  {
    name: 'IRP',
    to: `${BASE_URL}:30/home`,
    key: 'irp',
    icon: irp
  },
  {
    name: 'Collab',
    to: `${BASE_URL}:36/home`,
    key: 'collab',
    icon: collab
  },
  {
    name: 'Analyzer',
    to: `${BASE_URL}:31/home`,
    key: 'analyser',
    icon: analyzer
  },
  {
    name: 'Summarizer',
    to: `${BASE_URL}:32/home`,
    key: 'summarizer',
    icon: summarizer
  },
  {
    name: 'Translator',
    to: `${BASE_URL}:33/home`,
    key: 'translator',
    icon: translator
  },
  {
    name: 'Fact checker',
    to: `${BASE_URL}:34/home`,
    key: 'fact checker',
    icon: fact
  },
  {
    name: 'Deep Chat',
    to: `${BASE_URL}:35/home`,
    key: 'deep chat',
    icon: deep_chat
  },

  {
    name: 'Interrogator',
    to: `${BASE_URL}:82/home`, // change route
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
    <ul className="bg-sirp-lightGrey shadow absolute top-[4rem] -right-[6.7rem] pt-1 flex md:grid grid-cols-3 rounded z-[70] w-[130px] md:w-[300px]">
      {dropdownItems.map((item, index) => {
        const shouldRender = item.key === 'irp' || permissions.includes(item.key);
        
        return (
          shouldRender && (
            <li
              key={index}
              className="py-1.5 px-2  text-black border-b-[1px] border-r-[1px] border-b-gray-200/[0.5] border-r-gray-200/[0.5] text-[12px] text-center"
            >
              <Link href={item.to} className="grid gap-x-3 items-center">
                <Image
                  src={item.icon}
                  alt={item.key}
                  className={`${
                    item.key !== "deep chat"
                      ? "h-[15px] w-[20px] md:mx-auto"
                      : "h-[25px] w-[20px] md:mx-auto"
                  } `}
                />
                <span>{item.name}</span>
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
}

export default DashboardDropdown;

