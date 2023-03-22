import React from "react";
import { Select } from "@windmill/react-ui";

const SelectOption = ({ register, name, label}) => {
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <input type="display.value" name="city" list="cityname" />
        <option value="" defaultValue hidden>Select Sub-Category</option>
       
        <option value="Cordless tools & Accessories"> Cordless tools & Accessories</option>
        <option value="Solo Tools">Solo Tools</option>
        <option value="Drilling demolution & Accessories ">Drilling demolition & Accessories </option>
        <option value="Cutting & Griding tools">Cutting & Grinding tools </option>
        <option value="High pressure washer">High pressure washer </option>
        <option value="Combos"> Combos</option>
        <option value="Measuring Tools"> Measuring Tools</option>
        <option value="Leveling Tools">Leveling tools</option>
        <option value="Optical Levels">Optical Levels </option>
        <option value="DEtectors">Detectors</option>
        <option value="Acessory Tools">Accessory Tools</option>
        <option value="Gardening Tools">Gardening Tools </option>
        {/* </input> */}
      </Select>
    </>
  );
};

export default SelectOption;
