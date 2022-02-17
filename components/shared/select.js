import { FaCaretDown } from "react-icons/fa";

const SelectBox = ({ name = "", options = [], onSelect = () => {}, defaultOption = "", state = "" }) => {
  return (
    <div className="relative flex items-center">
      <select
        className="mb-4 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
        name={name}
        id=""
        onChange={onSelect}
        value={state}
      >
        <option value="" disabled={true}>
          {defaultOption}
        </option>
        {options.map((item, index) => (
          <option value={item.toLowerCase().replace(/\s+/g, "-")} key={Math.random()}>
            {item}
          </option>
        ))}
      </select>

      <div className="absolute right-0 -mt-4 mr-4 pointer-events-none ">
        <FaCaretDown />
      </div>
    </div>
  );
};

export default SelectBox;
