import AddButton from "@/components/AddButton";
import { useState } from "react";
import HotelForm from "@/components/GuestForm";

import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataTableWrapper from "@/components/DataTableWrapper";
import GuestForm from "@/components/GuestForm";

export default function GuestView() {
  const guestCols = [
    {
      name: "Guest No",
      selector: (row) => row.Gno,
    },
    {
      name: "Guest Name",
      selector: (row) => row.gname,
    },
    {
      name: "Address",
      selector: (row) => row.Address,
    },
    {
      name: "Phone",
      selector: (row) => row.Phone,
    },
    {
      cell: (row) => (
        <Button
          onClick={() => deleteGuest(row)}
          variant="contained"
          startIcon={<DeleteIcon />}
          size="small"
          color="error"
        >
          Delete
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) => (
        <Button
          variant="contained"
          onClick={() => modifyGuest(row)}
          size="small"
          startIcon={<ModeEditIcon />}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const [showGuestForm, setShowHotelForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    Gno: "",
    gname: "",
    Address: "",
    Phone: "",
  });

  async function deleteGuest(row) {
    await axios.delete(`http://localhost:8800/guest/${row.Gno}`);
    if (typeof window !== "undefined") window.location.reload();
  }

  async function modifyGuest(row) {
    console.log(row);
    setInitialValues(row);
    setShowHotelForm(true);
  }
  return (
    <div>
      <DataTableWrapper
        cols={guestCols}
        url="http://localhost:8800/guest"
        pageHeader={"Guest Table"}
      />
      <AddButton
        onClick={() => {
          setShowHotelForm(true);
          console.log(showGuestForm);
        }}
      />
      {
        <GuestForm
          onClose={() => setShowHotelForm(false)}
          open={showGuestForm}
          initialValues={initialValues}
        />
      }
    </div>
  );
}
