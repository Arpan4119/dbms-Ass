import axios from "axios";
import * as React from "react";
import DataTable from "react-data-table-component";
import Navbar from "@/components/Navbar";


export default function DataTableWrapper({ pageHeader, url, cols }) {
  let [rows_, setRows] = React.useState([]);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        setRows(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const commonCols = [
    {
      
    }
  ]
  return (
    <div>
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          width: "100%",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {pageHeader} Table
      </h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataTable columns={cols} data={rows_} />
      </div>
    </div>
  );
}

