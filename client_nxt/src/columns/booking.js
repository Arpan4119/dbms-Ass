const bookingCols = [
  {
    name: "Hotel No",
    selector: (row) => row.Hno,
  },
  {
    name: "Guest Number",
    selector: (row) => row.Gno,
  },
  {
    name: "Hotel No",
    selector: (row) => row.Date_from,
  },
  {
    name: "City",
    selector: (row) => row.Date_to,
  },
];
export default bookingCols;
