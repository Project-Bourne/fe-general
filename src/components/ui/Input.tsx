import Image from "next/image";
import React, { useRef, useState } from "react";
import { InputModel, DropdownModel } from "@/models/ui/components.models";
import { useOnClickOutside } from "../custom-hooks";

const countries = require("../../utils/countries.json");

function Input(props: InputModel) {
  const { type, value, onChange, placeholder, classNameStyle, onFocus, onBlur, isDisabled } =
    props;
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <>
      {type === "password" ? ( // add toggle button, if input type is password
        <div className="flex w-full">
          <input
            className={`w-[90%] py-2 px-3 font-light rounded-l border-y-2 border-l-2 border-r-0 border-y-gray-100 border-l-gray-100 focus:border-gray-100 ${classNameStyle}`}
            value={value}
            placeholder={placeholder}
            type={toggle ? "text" : "password"}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={isDisabled}
            onChange={onChange}
          />
          <div
            className="w-[10%] rounded-r border-y-2 border-r-2 border-l-0 border-y-gray-100 border-r-gray-100 focus:border-gray-100 outline-none flex justify-center"
            onClick={handleToggle}
          >
            {!toggle ? (
              <Image
                src={require("../../assets/icons/Hide.svg")}
                alt="Filter"
                width={20}
                height={20}
                className=""
                priority
              />
            ) : (
              <Image
                src={require("../../assets/icons/show-pass.svg")}
                alt="Filter"
                width={20}
                height={20}
                className=""
                priority
              />
            )}
          </div>
        </div>
      ) : (
        <input
          className={`w-full py-2 px-3 rounded-md border-[1px] font-light border-gray-100 focus:border-gray-100 outline-none ${classNameStyle}`}
          value={value}
          placeholder={placeholder}
          type={type}
          readOnly={isDisabled}
          onChange={onChange}
        />
      )}
    </>
  );
}

// drop down component
function Dropdown(props: DropdownModel) {
  const { data, onChange, className } = props;

  return (
    <>
      <select
        className={`w-full py-2 px-3 rounded-md border-[1px] border-gray-100 focus:border-gray-100 outline-none ${className}`}
        onChange={onChange}
      >
        {data?.map((item: { id: number; role: string }) => (
          <option key={item?.id} value={item?.id} className="text-[12px]">
            {item?.role}
          </option>
        ))}
      </select>
    </>
  );
}

// dropdown component of countries and flag
function DropdownWithFlag(props) {
  const { selectItem, style } = props;
  const [dropdown, setDropdown] = useState(false);
  const [country, setCountry] = useState({
    name: 'Nigeria',
    flag: 'https://flagcdn.com/ng.svg',
  });
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [countrySearch, setCountrySearch] = useState('');

  const dropdownRef = useRef();
  const searchInput = useRef();

  useOnClickOutside(dropdownRef, () => {
    setDropdown(false);
    setCountrySearch('');
  });

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleItemSelect = (countryName, flag) => {
    setCountry({ name: countryName, flag });
    setDropdown(false);
    selectItem(countryName);
    setFilteredCountries(countries);
    setCountrySearch('');
  };

  const filterCountries = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().startsWith(searchText)
    );
    setFilteredCountries(filteredCountries);
    setCountrySearch(searchText);
  };

  const Menu = () => {
    return (
      <div className="h-[170px] hover:cursor-pointer w-full shadow-md overflow-scroll bg-white absolute z-7">
        <input
          className="static w-[400px] mx-auto px-4 mb-2 border-b-2 h-[40px] text-black"
          id="country-search"
          placeholder="Search"
          type="text"
          onChange={filterCountries}
          value={countrySearch}
          ref={searchInput}
        />
        <div className="">
          {filteredCountries.map((item, index) => (
            <div
              key={index}
              className={`flex gap-2 px-2 py-1 hover:bg-gray-200 cursor-pointer items-center`}
              onClick={() => handleItemSelect(item.name, item.flag)}
            >
              <Image
                src={item.flag}
                alt="Flag"
                height={20}
                width={20}
                className="rounded-full h-[20px] w-[20px]"
                priority
              />
              <div className="text-[15px] font-light">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className={`relative ${style}`}>
      <div
        className={`flex justify-between items-center py-2 px-3 rounded-md border-[1px] border-gray-100 hover:cursor-pointer`}
        onClick={handleDropdown}
      >
        <div className="flex gap-2 items-center">
          <Image
            src={country.flag}
            alt="Flag"
            height={20}
            width={20}
            className="rounded-full h-[20px] w-[20px]"
            priority
          />
          <div className="text-[15px] font-light">{country.name}</div>
        </div>
        <div>&#8964;</div>
      </div>
      {dropdown && <Menu />}
    </div>
  );
}


export { Input, Dropdown, DropdownWithFlag };
