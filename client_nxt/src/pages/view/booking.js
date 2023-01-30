import AddButton from "@/components/AddButton";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataTableWrapper from "@/components/DataTableWrapper";
import GuestForm from "@/components/GuestForm";
import BookingForm from "@/components/BookingForm";

export default function BookingView() {
  const bookingCols = [
    {
      name: "Guest No",
      selector: (row) => row.Gno,
    },
    {
      name: "Hotel No",
      selector: (row) => row.Hno,
    },
    {
      name: "From Date",
      selector: (row) => row.Date_from,
    },
    {
      name: "To Date",
      selector: (row) => row.Date_to,
    },
    {
      cell: (row) => (
        <Button
          onClick={() => deleteBooking(row)}
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
          onClick={() => modifyBooking(row)}
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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    Gno: "",
    Hno: "",
    Date_from: "",
    Date_to: "",
  });

  async function deleteBooking(row) {
    await axios.delete(`http://localhost:8800/booking/${row.Gno}`);
    if (typeof window !== "undefined") window.location.reload();
  }

  async function modifyBooking(row) {
    console.log(row);
    setInitialValues(row);
    setShowBookingForm(true);
  }
  return (
    <div>
      <DataTableWrapper
        cols={bookingCols}
        url="http://localhost:8800/booking"
        pageHeader={"Booking Table"}
      />
      <AddButton
        onClick={() => {
          setShowBookingForm(true);
          console.log(showBookingForm);
        }}
      />
      {
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          open={showBookingForm}
          initialValues={initialValues}
        />
      }
    </div>
  );
}
