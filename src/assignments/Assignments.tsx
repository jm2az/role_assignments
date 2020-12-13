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
import { validateEmail } from "../common/util/textUtil";
import { Alert } from "@material-ui/lab";
import { hasDuplicates } from "../common/util/arrayUtil";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "20px",
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

interface MatchValidation {
  valid: boolean;
  errors: string[];
}

function validateMatches(
  roles: RoleAssignment[],
  players: PlayerAssignment[]
): MatchValidation {
  const errors = [];

  const allRoleCountsNonnegative = roles.reduce(
    (allNonNegative, currentRoleAssignment) =>
      allNonNegative && currentRoleAssignment.count >= 0,
    true
  );
  if (!allRoleCountsNonnegative) {
    errors.push("Some role counts are negative");
  }

  const totalRoleSpots = roles.reduce(
    (totalCount, currentRoleAssignment) =>
      totalCount + currentRoleAssignment.count,
    0
  );
  const totalPlayerCount = players.length;
  if (totalRoleSpots !== totalPlayerCount) {
    errors.push("Total role spots must match total player count");
  }

  const validEmails = players.reduce(
    (allValidEmails, currentPlayerAssignment) =>
      allValidEmails && validateEmail(currentPlayerAssignment.email),
    true
  );
  if (!validEmails) {
    errors.push("Some emails are invalid");
  }

  const validRoleNames = roles.reduce(
    (allValidNames, currentRoleAssignment) =>
      allValidNames && currentRoleAssignment.name !== "",
    true
  );
  if (!validRoleNames) {
    errors.push("Some role names are blank!");
  }

  const duplicatedRoleNames = hasDuplicates(roles.map((role) => role.name));
  if (duplicatedRoleNames) {
    errors.push("Some role names are duplicated");
  }

  const validPlayerNames = roles.reduce(
    (allValidNames, currentPlayerAssignment) =>
      allValidNames && currentPlayerAssignment.name !== "",
    true
  );
  if (!validPlayerNames) {
    errors.push("Some role names are blank!");
  }

  const duplicatedPlayerEmails = hasDuplicates(
    players.map((player) => player.email)
  );
  if (duplicatedPlayerEmails) {
    errors.push("Some player emails are duplicated");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export const Assignments: React.FC<Props> = (_props: Props) => {
  const classes = useStyles();
  const [roles, setRoles] = useState<RoleAssignment[]>([]);
  const [players, setPlayers] = useState<PlayerAssignment[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [displayNotification, setDisplayNotification] = useState<boolean>(
    false
  );

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
        {displayNotification && (
          <Alert severity={validationErrors.length === 0 ? "info" : "error"}>
            {validationErrors.length === 0
              ? "Emails sent!"
              : validationErrors.join(", ")}
          </Alert>
        )}
        <Button
          onClick={() => {
            const matchValidation = validateMatches(roles, players);
            setValidationErrors(matchValidation.errors);
            if (matchValidation.valid) {
              console.log(roles);
              console.log(players);
            }
            setDisplayNotification(true);
          }}
        >
          Assign!
        </Button>
      </Card>
    </div>
  );
};
