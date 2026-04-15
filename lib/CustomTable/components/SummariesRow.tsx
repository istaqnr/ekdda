import { TableCell, TableRow } from "@mui/material";
import { Column } from "@/lib/interfaces";
import { get, isNil } from "lodash";

const SummariesRow = ({
  visibleColumns,
  summaries,
}: {
  visibleColumns: Column[];
  summaries: any;
}) => (
  <TableRow className="bg-sky-100">
    {visibleColumns?.map((col: Column) => {
      const sum = get(summaries, col.field);
      if (isNil(sum)) return <TableCell key={col.field} />;
      return (
        <TableCell
          key={col.field}
          align="right"
          className="bg-white border-4 border-sky-100 p-2"
        >
          {sum}
        </TableCell>
      );
    })}
    <TableCell />
  </TableRow>
);

export default SummariesRow;
