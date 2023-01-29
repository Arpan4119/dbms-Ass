import DataTableWrapper from "@/components/DataTableWrapper";
import AddButton from "@/components/AddButton";
import { useState } from "react";
import HotelForm from "@/components/HotelForm";

import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function HotelView() {
  const hotelCols = [
    {
      name: "Hotel No",
      selector: (row) => row.Hno,
    },
    {
      name: "Hotel Name",
      selector: (row) => row.Hname,
    },
    {
      name: "Hotel No",
      selector: (row) => row.Hno,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Room Type",
      selector: (row) => row.Room_type,
    },
    {
      name: "Price",
      selector: (row) => row.Price,
    },
    {
      cell: (row) => (
        <Button
          onClick={() => deleteHotel(row)}
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
          onClick={() => modifyHotel(row)}
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
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    Hno: "",
    Hname: "",
    city: "",
    Phone: "",
    Room_Type: "",
    Price: "",
  });

  async function deleteHotel(row) {
    await axios.delete(`http://localhost:8800/hotel/${row.Hno}`);
    if (typeof window !== "undefined") window.location.reload();
  }

  async function modifyHotel(row) {
    console.log(row);
    setInitialValues(row);
    setShowHotelForm(true);
  }

  return (
    <div>
      <HotelForm />
      <DataTableWrapper
        cols={hotelCols}
        url="http://localhost:8800/hotel"
        pageHeader={"Hotel Table"}
      />
      <AddButton
        onClick={() => {
          setShowHotelForm(true);
          console.log(showHotelForm);
        }}
      />
      {
        <HotelForm
          onClose={() => setShowHotelForm(false)}
          open={showHotelForm}
          initialValues={initialValues}
        />
      }
    </div>
  );
}
