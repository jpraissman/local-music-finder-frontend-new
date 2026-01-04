import { useAdminApi } from "@/hooks/useAdminApi";
import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import AnalyticsCard from "./AnalyticsCard";
import QueryDetailsTable from "./table/QueryDetailsTable";
import ListSessionsTable from "./table/ListSessionsTable";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

interface SessionDetailsProps {
  platform: string | null;
  subgroup: string | null;
  postMemo: string | null;
  dateRange: DateRange | undefined;
  includeAdmin: boolean;
  minDurationInSec: number;
}

export default function SessionDetails({
  platform,
  subgroup,
  postMemo,
  dateRange,
  includeAdmin,
  minDurationInSec,
}: SessionDetailsProps) {
  const { querySessions } = useAdminApi();

  const { data: sessionsData, isLoading: sessionsIsLoading } = useQuery({
    queryKey: [
      "querySessions",
      platform,
      subgroup,
      postMemo,
      dateRange,
      includeAdmin,
      minDurationInSec,
    ],
    queryFn: () => {
      if (dateRange && dateRange.to && dateRange.from && platform && subgroup) {
        const startDate = formatLocalDate(dateRange.from);
        const endDate = formatLocalDate(dateRange.to);
        const platformToUse = platform === "All" ? null : platform;
        const subgroupToUse = subgroup === "All" ? null : subgroup;
        const postMemoToUse = postMemo === "All" ? null : postMemo;
        return querySessions({
          platform: platformToUse,
          subgroup: subgroupToUse,
          postMemo: postMemoToUse,
          startDate,
          endDate,
          includeAdmin,
          minDurationInSec,
        });
      }

      return {
        total: -1,
        totalUnique: -1,
        totalUniqueNew: -1,
        totalUniqueReturning: -1,
        totalUniqueMobile: -1,
        avgDurationInSec: -1,
        sublayerDetails: [],
        pathDetails: [],
        sessions: [],
      };
    },
  });

  if (sessionsIsLoading) {
    return <Box paddingTop={"50px"}>Sessions are loading...</Box>;
  }

  if (!sessionsData) {
    return (
      <Box paddingTop={"50px"}>
        There is an issue loading the sessions. Please try again.
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"row"} spacing={10}>
          <AnalyticsCard title="Total Sessions" value={sessionsData.total} />
          <AnalyticsCard
            title="Total Unique Users"
            value={sessionsData.totalUnique}
          />
          <AnalyticsCard
            title="New User %"
            value={Math.round(
              (sessionsData.totalUniqueNew / sessionsData.totalUnique) * 100
            )}
          />
          <AnalyticsCard
            title="Mobile %"
            value={Math.round(
              (sessionsData.totalUniqueMobile / sessionsData.totalUnique) * 100
            )}
          />
          <AnalyticsCard
            title="Avg Duration (min)"
            value={Math.round((sessionsData.avgDurationInSec / 60) * 100) / 100}
          />
        </Stack>
        <QueryDetailsTable
          title="Users Grouped By Campaign"
          rows={sessionsData.sublayerDetails}
          tableHeaders={[
            "Sublayer",
            "Total Sessions",
            "Total Unique Users",
            "New User %",
            "Mobile User %",
            "Avg Duration (min)",
          ]}
        />
        <QueryDetailsTable
          title="Users Grouped By Entry URL"
          rows={sessionsData.pathDetails}
          tableHeaders={[
            "Entry URL",
            "Total Sessions",
            "Total Unique Users",
            "New User %",
            "Mobile User %",
            "Avg Duration (min)",
          ]}
        />
        <ListSessionsTable title="All Sessions" rows={sessionsData.sessions} />
      </Stack>
    </Box>
  );
}
