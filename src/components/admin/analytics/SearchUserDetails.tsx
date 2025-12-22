import { useAdminApi } from "@/hooks/useAdminApi";
import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import AnalyticsCard from "./AnalyticsCard";
import QueryDetailsTable from "./QueryDetailsTable";
import ListSessionsTable from "./ListSessionsTable";

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

interface SearchUserDetailsProps {
  platform: string | null;
  subgroup: string | null;
  postMemo: string | null;
  dateRange: DateRange | undefined;
  includeAdmin: boolean;
  minDurationInSec: number;
}

export default function SearchUserDetails({
  platform,
  subgroup,
  postMemo,
  dateRange,
  includeAdmin,
  minDurationInSec,
}: SearchUserDetailsProps) {
  const { querySearchUserEvents } = useAdminApi();

  const { data: searchUserData, isLoading: searchUserDataIsLoading } = useQuery(
    {
      queryKey: [
        "querySearchUserEvents",
        platform,
        subgroup,
        postMemo,
        dateRange,
        includeAdmin,
        minDurationInSec,
      ],
      queryFn: () => {
        if (
          dateRange &&
          dateRange.to &&
          dateRange.from &&
          platform &&
          subgroup
        ) {
          const startDate = formatLocalDate(dateRange.from);
          const endDate = formatLocalDate(dateRange.to);
          const platformToUse = platform === "All" ? null : platform;
          const subgroupToUse = subgroup === "All" ? null : subgroup;
          const postMemoToUse = postMemo === "All" ? null : postMemo;
          return querySearchUserEvents({
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
          counties: [],
          towns: [],
          formattedAddresses: [],
          searchContexts: [],
          sublayerDetails: [],
        };
      },
    }
  );

  if (searchUserDataIsLoading) {
    return <Box paddingTop={"50px"}>Search data is loading...</Box>;
  }

  if (!searchUserData) {
    return (
      <Box paddingTop={"50px"}>
        There is an issue loading the search data. Please try again.
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"row"} spacing={10}>
          <AnalyticsCard title="Total Searches" value={searchUserData.total} />
          <AnalyticsCard
            title="Total Unique Users Who Searched"
            value={searchUserData.totalUnique}
          />
        </Stack>
        <QueryDetailsTable
          title="Searches Grouped By Campaign"
          rows={searchUserData.sublayerDetails}
          tableHeaders={[
            "Sublayer",
            "Total Searches",
            "Total Unique Users Who Searched",
          ]}
        />
        <QueryDetailsTable
          title="Searches by County"
          rows={searchUserData.counties}
          tableHeaders={[
            "County",
            "Total Searches",
            "Total Unique Users Who Searched",
          ]}
        />
        <QueryDetailsTable
          title="Searches by Town"
          rows={searchUserData.towns}
          tableHeaders={[
            "Town",
            "Total Searches",
            "Total Unique Users Who Searched",
          ]}
        />
        <QueryDetailsTable
          title="Searches by Address"
          rows={searchUserData.formattedAddresses}
          tableHeaders={[
            "Address",
            "Total Searches",
            "Total Unique Users Who Searched",
          ]}
        />
        <QueryDetailsTable
          title="Searches by Context"
          rows={searchUserData.searchContexts}
          tableHeaders={[
            "Context",
            "Total Searches",
            "Total Unique Users Who Searched",
          ]}
        />
      </Stack>
    </Box>
  );
}
