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
    selector: (row) => Address.Hno,
  },
  {
    name: "Phone",
    selector: (row) => row.Phone,
  },
];
export default guestCols;
