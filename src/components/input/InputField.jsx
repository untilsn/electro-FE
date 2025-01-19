import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { useController } from "react-hook-form";


const Icon = ({ onClick, icon }) => {
  return (
    <i onClick={onClick}>
      {icon}
    </i>
  )
}


const InputField = ({
  control,
  name,
  className,
  displayButton,
  type,
  placeholder,
  icon,
  onClick = () => { },
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    type,
    defaultValue: "",
  });
  return (
    <div className="relative flex w-full">
      <Input
        type={type}
        name={name}
        id={name}
        variant="standard"
        label={placeholder}
        className={` ${className} w-full text-darkPrimary placeholder:capitalize`}
        icon={<Icon icon={icon} onClick={onClick}></Icon>}
        // placeholder={placeholder}
        {...field}
        {...rest}
      />
    </div>
  );
};

export default InputField;
