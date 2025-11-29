"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { useRef, useState } from "react";

export type SectionType = "LOCATION" | "DISTANCE" | "DATE";

interface ScrollAndHighlightType {
  ref: React.RefObject<HTMLDivElement>;
  areaToHighlight: SectionType;
}

export function useFilterRefs() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const locationRef = useRef<HTMLDivElement>(null);
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const maxDistanceRef = useRef<HTMLDivElement>(null);
  const searchFiltersContainerRef = useRef<HTMLDivElement>(null);

  const [areaToHighlight, setAreaToHighlight] = useState<SectionType | null>(
    null
  );
  const [pendingScrollAndHighlight, setPendingScrollAndHighlight] =
    useState<ScrollAndHighlightType | null>(null);

  const doScrollAndHighlight = (scrollAndHighlight: ScrollAndHighlightType) => {
    searchFiltersContainerRef.current?.scrollTo({
      top: scrollAndHighlight.ref?.current?.offsetTop
        ? scrollAndHighlight.ref?.current?.offsetTop - 100
        : undefined,
      behavior: "smooth",
    });
    setPendingScrollAndHighlight(null);
    setAreaToHighlight(scrollAndHighlight.areaToHighlight);
  };

  const getScrollAndHighlight = (
    section: SectionType
  ): ScrollAndHighlightType => {
    switch (section) {
      case "LOCATION":
        return {
          ref: locationRef,
          areaToHighlight: "LOCATION",
        };
      case "DISTANCE":
        return {
          ref: maxDistanceRef,
          areaToHighlight: "DISTANCE",
        };
      case "DATE":
        return {
          ref: dateRangeRef,
          areaToHighlight: "DATE",
        };
    }
  };

  const handleChipFilterClick = (sectionClicked: SectionType) => {
    const scrollAndHighlight = getScrollAndHighlight(sectionClicked);
    if (!isMdUp) {
      setPendingScrollAndHighlight(scrollAndHighlight);
    } else {
      doScrollAndHighlight(scrollAndHighlight);
    }
  };

  return {
    locationRef,
    dateRangeRef,
    maxDistanceRef,
    searchFiltersContainerRef,
    areaToHighlight,
    pendingScrollAndHighlight,
    doScrollAndHighlight,
    handleChipFilterClick,
    setAreaToHighlight,
  };
}

export type FilterRefsType = ReturnType<typeof useFilterRefs>;
