import React, { useState } from "react";

import { Role } from "./Role";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    role: {
      display: "block",
    },
  })
);

interface Props {}

interface RoleAssignment {
  name: string;
  count: number;
}

export const Assignments: React.FC<Props> = (_props: Props) => {
  const classes = useStyles();
  const [roles, setRoles] = useState<RoleAssignment[]>([]);

  return (
    <div>
      {roles.map((role, i) => (
        <Role
          className={classes.role}
          onChange={(name: string, count: number) => {
            roles[i] = { name, count };
          }}
        />
      ))}

      <Button
        onClick={() => {
          setRoles(roles.concat([{ name: "", count: 0 }]));
        }}
      >
        Add Role
      </Button>

      <Button
        onClick={() => {
          console.log(roles);
        }}
      >
        Get Roles
      </Button>
    </div>
  );
};
