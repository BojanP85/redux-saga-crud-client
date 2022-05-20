import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { UserModel } from "../types";
import { getUser, getUserId } from "../redux/slice/user";

const UserRow = ({
  user,
  tableRowStyle,
}: {
  user: UserModel;
  tableRowStyle: SxProps<Theme>;
}) => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState("");

  const { id, name, surname, city } = user;

  const handleDeleteUser = async (id: string) => {
    setDeleteId(id);
    dispatch(getUserId(id));
  };

  return (
    <TableRow sx={tableRowStyle}>
      {deleteId === id ? (
        <TableCell colSpan={5}>
          <Skeleton
            sx={{ borderRadius: "4px" }}
            variant="rectangular"
            height={36.5}
          />
        </TableCell>
      ) : (
        <>
          <TableCell component="th" scope="row">
            {name}
          </TableCell>
          <TableCell align="right">{surname}</TableCell>
          <TableCell align="right">{city}</TableCell>
          <TableCell align="right">
            <Button
              onClick={() => dispatch(getUser(user))}
              variant="contained"
              fullWidth
            >
              Edit
            </Button>
          </TableCell>
          <TableCell align="right">
            <Button
              onClick={() => handleDeleteUser(id)}
              variant="contained"
              fullWidth
            >
              Delete
            </Button>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default UserRow;
