export enum BandType {
  TRIBUTE_BAND = "TRIBUTE_BAND",
  COVER_BAND = "COVER_BAND",
  ORIGINALS = "ORIGINALS",
  ORIGINALS_AND_COVERS = "ORIGINALS_AND_COVERS",
  OTHER = "OTHER",
}

export const BandTypeLabels: Record<BandType, string> = {
  [BandType.TRIBUTE_BAND]: "Tribute Band",
  [BandType.COVER_BAND]: "Cover Band",
  [BandType.ORIGINALS]: "Originals",
  [BandType.ORIGINALS_AND_COVERS]: "Originals and Covers",
  [BandType.OTHER]: "Other",
};
