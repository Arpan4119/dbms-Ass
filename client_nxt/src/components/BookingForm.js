import TextfieldWrapper from "./TextField";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
//const { useForm, Controller } = dynamic(() => import("react-hook-form"));
import { useForm, Controller } from "react-hook-form";
import { InputLabel, Select, MenuItem } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GuestForm({ open, onClose, initialValues }) {
  function handleClose() {
    onClose();
  }
  const [guest, setGuest] = useState(initialValues);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setGuest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      validationSchema
        .validate(guest)
        .then(async () => {
          const response = await axios.post(
            "http://localhost:8800/guest",
            guest
          );

          if (response.data.err) {
            console.log(response.data.err);
            alert(response.data.err);
            return;
          }
          if (typeof window !== "undefined") window.location.reload();
        })
        .catch(function (err) {
          alert("ERROR: " + err);
        });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const validationSchema = Yup.object().shape({
    Gno: Yup.string()
      .required()
      .min(4, "Must be exactly 4 digits")
      .max(4, "Must be exactly 4 digits"),
    gname: Yup.string().required(),
    Phone: Yup.string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    Address: Yup.string().required(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
      >
        <Fade in={true}>
          <Box sx={style}>
            <Grid>
              <Paper sx={{ p: 5 }} className="paperStyleHotel">
                <Grid align="center">
                  <h2>Guest</h2>
                </Grid>
                <>
                  <TextField
                    id="standard-basic"
                    label="Guest no"
                    placeholder="Enter Guest No"
                    variant="standard"
                    fullWidth
                    // {...register('hotelno')}
                    // error={errors.hotelno ? true : false}

                    onChange={handleChange}
                    name="Gno"
                  />
                  <br />
                  <TextField
                    id="standard-basic"
                    label="Hotel Number"
                    placeholder="Enter Hotel No"
                    variant="standard"
                    fullWidth
                    // {...register('hotelname')}

                    onChange={handleChange}
                    name="Hno"
                  />
                  <TextField
                    id="standard-basic"
                    label="Address"
                    placeholder="Enter Address"
                    variant="standard"
                    fullWidth
                    // {...register('city')}
                    onChange={handleChange}
                    name="Address"
                  />

                  <br />
                  <br />
                  <Button variant="contained" onClick={handleClick} fullWidth>
                    Submit
                  </Button>
                </>
              </Paper>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
