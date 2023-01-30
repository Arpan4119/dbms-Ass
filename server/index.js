import express from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel_management",
});
// db.connect(() => {
//   console.log("Connected to db");
// });
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is backend");
});

app.get("/hotel", (req, res) => {
  const q = "SELECT * FROM hotel_management.hotel";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/hotel", (req, res) => {
  const q =
    "INSERT INTO hotel_management.hotel(`Hno`, `Hname`, `city`, `Phone`, `Room_type`, `Price`) VALUES (?)";

  const values = [
    req.body.Hno,
    req.body.Hname,
    req.body.city,
    req.body.Phone,
    req.body.Room_Type,
    req.body.Price,
    // "120",
    // "from backend",
    // "from backend",
    // "from backend",
    // "from backend",
    // "from backend",
  ];
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.json({ err: "Hotel number already exists!" });
      }
      return res.json({ err: err.message });
    }
    console.log("No error");
    return res.json("working post method");
  });
});

app.delete("/hotel/:Hno", (req, res) => {
  const Hotelno = req.params.Hno;
  const q = " DELETE FROM hotel_management.hotel WHERE Hno = ? ";

  db.query(q, [Hotelno], (err, data) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.put("/hotel/:Hno", (req, res) => {
  const Hno = req.params.Hno;
  const q =
    "UPDATE hotel_management.hotel SET `Hno`= ?, `Hname`= ?, `city`= ?, `Phone`= ?, `Room_Type`= ?, `Price`= ? WHERE Hno = ?";

  const values = [
    req.body.Hno,
    req.body.Hname,
    req.body.city,
    req.body.Phone,
    req.body.Room_Type,
    req.body.Price,
  ];

  db.query(q, [...values, Hno], (err, data) => {
    if (err) return res.send(err);
    return res.json("updated successfully");
  });
});

app.get("/guest", (req, res) => {
  const q = "SELECT * FROM hotel_management.guest";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/guest", (req, res) => {
  const q =
    "INSERT INTO hotel_management.guest(`Gno`, `gname`, `Address`, `Phone`) VALUES (?)";

  const values = [
    req.body.Gno,
    req.body.gname,
    req.body.Address,
    req.body.Phone,
    // "120",
    // "from backend",
    // "from backend",
    // "from backend",
    // "from backend",
    // "from backend",
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("working post method");
  });
});

app.delete("/guest/:Gno", (req, res) => {
  const Guestno = req.params.Gno;
  const q = " DELETE FROM hotel_management.guest WHERE Gno = ? ";

  db.query(q, [Guestno], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/guest/:Gno", (req, res) => {
  const Gno = req.params.Gno;
  const q =
    "UPDATE hotel_management.guest SET `Gno`= ?, `Gname`= ?, `address`= ?, `Phone`= ? WHERE Gno = ?";

  const values = [
    req.body.Gno,
    req.body.Gname,
    req.body.address,
    req.body.Phone,
  ];

  db.query(q, [...values, Gno], (err, data) => {
    if (err) return res.send(err);
    return res.json("updated successfully");
  });
});

app.get("/booking", (req, res) => {
  const q = "SELECT * FROM hotel_management.booking";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/booking", (req, res) => {
  const q =
    "INSERT INTO hotel_management.booking(`Gno`, `Hno`, `Date_from`, `Date_to`) VALUES (?)";

  const values = [
    req.body.Gno,
    req.body.Hno,
    req.body.Date_from,
    req.body.Date_to,
    // "120",
    // "from backend",
    // "from backend",
    // "from backend",
    // "from backend",
    // "from backend",
  ];
  console.log(req.body);
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("working post method");
  });
});

app.delete("/booking/:Gno", (req, res) => {
  const Guestno = req.params.Gno;
  const q = " DELETE FROM hotel_management.booking WHERE Gno = ? ";

  db.query(q, [Guestno], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/booking/:Gno", (req, res) => {
  const Gno = req.params.Gno;
  const q =
    "UPDATE hotel_management.booking SET `Gno`= ?, `Hno`= ?, `Date_from`= ?, `Date_to`= ? WHERE Gno = ?";

  const values = [
    req.body.Gno,
    req.body.Hno,
    req.body.Date_from,
    req.body.Date_to,
  ];

  db.query(q, [...values, Gno], (err, data) => {
    if (err) return res.send(err);
    return res.json("updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.!!");
});
