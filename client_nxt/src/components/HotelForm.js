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

export default function HotelForm({ open, onClose, initialValues }) {
  function handleClose() {
    onClose();
  }
  const [hotel, setHotel] = useState(initialValues);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setHotel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      validationSchema
        .validate(hotel)
        .then(async () => {
          const response = await axios.post(
            "http://localhost:8800/hotel",
            hotel
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
    Hno: Yup.string()
      .required()
      .min(4, "Must be exactly 4 digits")
      .max(4, "Must be exactly 4 digits"),
    Hname: Yup.string().required(),
    Phone: Yup.string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    Price: Yup.string().required(),
    Room_Type: Yup.string().required(),
    city: Yup.string().required(),
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
                  <h2>HOTEL</h2>
                </Grid>
                <>
                  <TextField
                    id="standard-basic"
                    label="Hotel No"
                    placeholder="Enter Hotel No"
                    variant="standard"
                    fullWidth
                    // {...register('hotelno')}
                    // error={errors.hotelno ? true : false}

                    onChange={handleChange}
                    name="Hno"
                  />
                  <br />
                  <TextField
                    id="standard-basic"
                    label="Hotel Name"
                    placeholder="Enter Hotel Name"
                    variant="standard"
                    fullWidth
                    // {...register('hotelname')}

                    onChange={handleChange}
                    name="Hname"
                  />
                  <TextField
                    id="standard-basic"
                    label="City"
                    placeholder="Enter City"
                    variant="standard"
                    fullWidth
                    // {...register('city')}
                    onChange={handleChange}
                    name="city"
                  />
                  <TextField
                    id="standard-basic"
                    label="Phone no"
                    placeholder="Enter Phone no"
                    variant="standard"
                    fullWidth
                    // {...register('phoneNo')}

                    onChange={handleChange}
                    name="Phone"
                  />

                  <InputLabel id="Room_Type_label">Hotel Type</InputLabel>
                  <Select
                    labelId="Room_Type_label"
                    id="Room_Type"
                    onChange={handleChange}
                    label="Room_type"
                    name="Room_Type"
                    sx={{ w: 30 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Non AC single bedded"}>
                      Non AC single bedded
                    </MenuItem>
                    <MenuItem value={"AC single bedded"}>
                      AC single bedded
                    </MenuItem>
                    <MenuItem value={"Non AC double bedded"}>
                      Non AC double bedded
                    </MenuItem>
                    <MenuItem value={"AC double bedded"}>
                      AC double bedded
                    </MenuItem>
                  </Select>
                  <TextField
                    id="standard-basic"
                    label="Price"
                    placeholder="Enter Price "
                    variant="standard"
                    fullWidth
                    // {...register('price')}

                    onChange={handleChange}
                    name="Price"
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
