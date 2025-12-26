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
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Order, sortRows } from "./TableUtils";

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
  const [orderBy, setOrderBy] = useState<keyof QueryDetailDTO>("total");
  const [order, setOrder] = useState<Order>("desc");

  const handleSort = (property: keyof QueryDetailDTO) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    {tableHeaders[0]}
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "total"}
                    direction={orderBy === "total" ? order : "asc"}
                    onClick={() => handleSort("total")}
                  >
                    {tableHeaders[1]}
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "totalUnique"}
                    direction={orderBy === "totalUnique" ? order : "asc"}
                    onClick={() => handleSort("totalUnique")}
                  >
                    {tableHeaders[2]}
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "totalUniqueNew"}
                    direction={orderBy === "totalUniqueNew" ? order : "asc"}
                    onClick={() => handleSort("totalUniqueNew")}
                  >
                    {tableHeaders[3]}
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "totalUniqueReturning"}
                    direction={
                      orderBy === "totalUniqueReturning" ? order : "asc"
                    }
                    onClick={() => handleSort("totalUniqueReturning")}
                  >
                    {tableHeaders[4]}
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortRows(rows, orderBy, order).map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    align="right"
                    className="name"
                    sx={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      maxWidth: "250px",
                    }}
                  >
                    {row.name}
                  </TableCell>
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
