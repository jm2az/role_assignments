import React, { useState } from "react";

import { Role } from "./Role";
import { Player } from "./Player";
import {
  Button,
  Card,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      columnGap: "20px",
      rowGap: "20px",
    },
    role: {
      display: "block",
    },
    player: {
      display: "block",
    },
    assignContainer: {
      gridColumnEnd: "span 2",
    },
  })
);

interface Props {}

interface RoleAssignment {
  name: string;
  count: number;
}

interface PlayerAssignment {
  name: string;
  email: string;
}

export const Assignments: React.FC<Props> = (_props: Props) => {
  const classes = useStyles();
  const [roles, setRoles] = useState<RoleAssignment[]>([]);
  const [players, setPlayers] = useState<PlayerAssignment[]>([]);

  return (
    <div className={classes.container}>
      <Card>
        {roles.map((role, i) => (
          <Role
            className={classes.role}
            onChange={(name: string, count: number) => {
              roles[i] = { name, count };
              setRoles(roles);
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
      </Card>
      <Card>
        {players.map((player, i) => (
          <Player
            className={classes.player}
            onChange={(name: string, email: string) => {
              players[i] = { name, email };
              setPlayers(players);
            }}
          />
        ))}

        <Button
          onClick={() => {
            setPlayers(players.concat([{ name: "", email: "" }]));
          }}
        >
          Add Player
        </Button>
      </Card>
      <Card className={classes.assignContainer}>
        <Button
          onClick={() => {
            console.log(roles);
            console.log(players);
          }}
        >
          Assign!
        </Button>
      </Card>
    </div>
  );
};
