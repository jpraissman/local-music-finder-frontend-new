import { QueryDetailDTO } from "@/dto/analytics/queryResponse/QueryDetail.dto";
import { BasicSessionDTO } from "@/dto/analytics/session/BasicSession.dto";
import { useAdminApi } from "@/hooks/useAdminApi";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Modal,
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

interface ListSessionsTableProps {
  title: string;
  rows: BasicSessionDTO[];
}

export default function ListSessionsTable({
  title,
  rows,
}: ListSessionsTableProps) {
  const { getSessionLogs } = useAdminApi();

  const [sessionLogs, setSessionLogs] = useState<string>("");
  const [showSessionLogs, setShowSessionLogs] = useState(false);

  const [orderBy, setOrderBy] = useState<keyof BasicSessionDTO>("sessionId");
  const [order, setOrder] = useState<Order>("desc");

  const handleSort = (property: keyof BasicSessionDTO) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Modal open={showSessionLogs} onClose={() => setShowSessionLogs(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 600,
            maxHeight: "80vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Session Logs
          </Typography>

          <Typography
            component="pre"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "monospace",
              fontSize: 14,
            }}
          >
            {sessionLogs}
          </Typography>
        </Box>
      </Modal>
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
                      active={orderBy === "sessionId"}
                      direction={orderBy === "sessionId" ? order : "asc"}
                      onClick={() => handleSort("sessionId")}
                    >
                      Session Id
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "durationInSec"}
                      direction={orderBy === "durationInSec" ? order : "asc"}
                      onClick={() => handleSort("durationInSec")}
                    >
                      Duration (min)
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "urlEntry"}
                      direction={orderBy === "urlEntry" ? order : "asc"}
                      onClick={() => handleSort("urlEntry")}
                    >
                      Url Entry
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "platform"}
                      direction={orderBy === "platform" ? order : "asc"}
                      onClick={() => handleSort("platform")}
                    >
                      Platform
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "ipAddress"}
                      direction={orderBy === "ipAddress" ? order : "asc"}
                      onClick={() => handleSort("ipAddress")}
                    >
                      Ip Address
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "numScrolls"}
                      direction={orderBy === "numScrolls" ? order : "asc"}
                      onClick={() => handleSort("numScrolls")}
                    >
                      Num Scrolls
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "newSession"}
                      direction={orderBy === "newSession" ? order : "asc"}
                      onClick={() => handleSort("newSession")}
                    >
                      Type
                    </TableSortLabel>
                  </TableCell>

                  <TableCell align="right">Logs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortRows(rows, orderBy, order).map((row) => (
                  <TableRow key={row.sessionId}>
                    <TableCell>{row.sessionId}</TableCell>
                    <TableCell align="right">
                      {Math.round((row.durationInSec / 60) * 100) / 100}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="name"
                      sx={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        maxWidth: "250px",
                      }}
                    >
                      {row.urlEntry}
                    </TableCell>
                    <TableCell align="right">{row.platform}</TableCell>
                    <TableCell align="right">{row.ipAddress}</TableCell>
                    <TableCell align="right">{row.numScrolls}</TableCell>
                    <TableCell align="right">
                      {row.newSession ? "New" : "Returning"}
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={async () => {
                        const logs = await getSessionLogs(row.sessionId);
                        setSessionLogs(logs);
                        setShowSessionLogs(true);
                      }}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                          color: "primary.main",
                        },
                        textDecoration: "underline",
                        color: "blue",
                      }}
                    >
                      View
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
