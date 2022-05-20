import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserState } from "../redux/selectors/user";
import {
  emptyInputData,
  getInputData,
  submitInputData,
} from "../redux/slice/user";

const UserForm = () => {
  const dispatch = useDispatch();
  const { user, loading, errors } = useSelector(getUserState);

  const { submitLoading } = loading;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.currentTarget;
    dispatch(getInputData({ ...user, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    user.id === ""
      ? dispatch(submitInputData({ ...user, id: nanoid() }))
      : dispatch(submitInputData(user));

    document.querySelectorAll("input").forEach((input) => {
      input.blur();
    });
  };

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          value={user.id}
          fullWidth
          disabled
          placeholder="User ID"
          variant="standard"
        />
        <p style={{ color: "red", float: "right", fontSize: "0.8rem" }}>
          * Required field
        </p>
        <TextField
          sx={{ mb: 2 }}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Name"
          label="Name"
          name="name"
          value={user.name}
          fullWidth
          required
          error={errors.name}
        />
        <TextField
          sx={{ mb: 2 }}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Surname"
          label="Surname"
          name="surname"
          value={user.surname}
          fullWidth
          required
          error={errors.surname}
        />
        <TextField
          sx={{ mb: 2 }}
          onChange={(e) => handleChange(e)}
          placeholder="Enter City"
          label="City"
          name="city"
          value={user.city}
          fullWidth
          required
          error={errors.city}
        />
        <div style={{ display: "flex" }}>
          <LoadingButton
            sx={{
              borderTopRightRadius: user.id && (submitLoading ? "4px" : 0),
              borderBottomRightRadius: user.id && (submitLoading ? "4px" : 0),
              width: user.id ? (submitLoading ? "100%" : "50%") : "100%",
              transition: "all 0.3s",
            }}
            type="submit"
            loading={submitLoading}
            variant="contained"
          >
            Submit
          </LoadingButton>
          <Button
            sx={{
              borderTopLeftRadius: user.id && 0,
              borderBottomLeftRadius: user.id && 0,
              width: user.id ? (submitLoading ? 0 : "50%") : 0,
              padding: user.id ? (submitLoading ? 0 : "") : 0,
              transition: "all 0.3s",
              minWidth: 0,
              overflow: "hidden",
            }}
            onClick={() => dispatch(emptyInputData())}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UserForm;
