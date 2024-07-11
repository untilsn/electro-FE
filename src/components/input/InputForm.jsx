import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { useController } from "react-hook-form";

const InputForm = ({
  control,
  name,
  className,
  displayButton,
  type,
  placeholder = "",
  onClick = () => {},
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
        className={` ${className} w-full`}
        {...field}
        {...rest}
      />
      {displayButton ? (
        <Button
          onClick={onClick}
          size="sm"
          className="!absolute right-1 top-1 rounded text-black"
        >
          Invite
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputForm;
