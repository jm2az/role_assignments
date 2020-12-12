import React, { useState } from "react";
import { TextField } from "@material-ui/core";

interface Props {
  className?: string;
  onChange: (roleName: string, count: number) => void;
}

export const Role: React.FC<Props> = (props: Props) => {
  const { className, onChange } = props;
  const [name, setName] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  return (
    <div className={className}>
      <TextField
        label="Name"
        defaultValue={name}
        onChange={(event) => {
          const updatedName = event.target.value;
          setName(updatedName);
          onChange(updatedName, count);
        }}
      />
      <TextField
        label="Count"
        type="number"
        defaultValue={count}
        onChange={(event) => {
          const updatedCount = Number.parseInt(event.target.value);
          setCount(updatedCount);
          onChange(name, updatedCount);
        }}
      />
    </div>
  );
};
