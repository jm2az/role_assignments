import React, { useState } from "react";
import { TextField } from "@material-ui/core";

interface Props {
  className?: string;
  onChange: (roleName: string, email: string) => void;
}

export const Player: React.FC<Props> = (props: Props) => {
  const { className, onChange } = props;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <div className={className}>
      <TextField
        label="Name"
        defaultValue={name}
        onChange={(event) => {
          const updatedName = event.target.value;
          setName(updatedName);
          onChange(updatedName, email);
        }}
      />
      <TextField
        label="Email"
        defaultValue={email}
        onChange={(event) => {
          const updatedEmail = event.target.value;
          setEmail(updatedEmail);
          onChange(name, updatedEmail);
        }}
      />
    </div>
  );
};
