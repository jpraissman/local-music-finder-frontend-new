import { QueryDetailDTO } from "@/dto/analytics/queryResponse/QueryDetail.dto";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface QueryDetailsTableProps {
  title: string;
  rows: QueryDetailDTO[];
  tableHeaders: string[];
}

export default function QueryDetailsTable({
  title,
  rows,
  tableHeaders,
}: QueryDetailsTableProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h4" component="span">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table
            size="small"
            sx={{
              "& th": {
                fontSize: 22,
                fontWeight: 600,
              },
              "& td": {
                fontSize: 21,
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>{tableHeaders[0]}</TableCell>
                <TableCell align="right">{tableHeaders[1]}</TableCell>
                <TableCell align="right">{tableHeaders[2]}</TableCell>
                <TableCell align="right">{tableHeaders[3]}</TableCell>
                <TableCell align="right">{tableHeaders[4]}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">{row.totalUnique}</TableCell>
                  <TableCell align="right">{row.totalUniqueNew}</TableCell>
                  <TableCell align="right">
                    {row.totalUniqueReturning}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
