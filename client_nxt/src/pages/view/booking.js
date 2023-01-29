import hotelCols from "@/columns/booking";
import DataTableWrapper from "@/components/DataTableWrapper";

export default function GuestView() {
  return (
    <DataTableWrapper
      cols={hotelCols}
      url="http://localhost:8800/booking"
      pageHeader={"Booking Table"}
    />
  );
}
