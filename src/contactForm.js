import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export function NewContactForm() {
  const classes = useStyles();

  return (
    <div>
      <h3>Contact Me!</h3>
      <div className={classes.container}>
        <TextField
          label="Email"
          id="margin-none"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
        />
        <TextField
          label="Name"
          id="margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
        />
      </div>
    </div>
  );
}

export const OldContactForm = () => {
  return (
    <div>
      <label>Email </label>
      <input />
      <button>Submit</button>
    </div>
  );
};
