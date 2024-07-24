import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Chip,
} from "@material-tailwind/react";
import { Controller } from "react-hook-form";

const DropdownSelect = ({ options, control, name, label }) => {
  const handleSelect = (option, selectedOptions, onChange) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(newSelectedOptions);
  };

  const handleRemove = (value, selectedOptions, onChange) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== value
    );
    onChange(newSelectedOptions);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="w-64">
          <Menu>
            <MenuHandler>
              <Button variant="outlined" className="w-full">
                {field.value.length > 0
                  ? `${field.value.length} selected`
                  : `Select ${label}`}
              </Button>
            </MenuHandler>
            <MenuList className="w-full max-w-[300px]">
              {options.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() =>
                    handleSelect(option, field.value, field.onChange)
                  }
                  className={`hover:bg-gray-200 cursor-pointer ${
                    field.value.includes(option) ? "bg-gray-200" : ""
                  }`}
                >
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <div className="mt-2">
            {field.value.map((value) => (
              <Chip
                key={value}
                value={value}
                onClose={() => handleRemove(value, field.value, field.onChange)}
                className="mb-2 mr-2 bg-gray bg-opacity-70"
              />
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default DropdownSelect;
