import { Checkbox, Link, Stack, Typography } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TermsAgreementProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  error: boolean;
  rhfName: Path<TFieldValues>;
}

export default function TermsAgreement<TFieldValues extends FieldValues>({
  control,
  error,
  rhfName,
}: TermsAgreementProps<TFieldValues>) {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Stack
        direction="row"
        spacing={-0.5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Controller
          name={rhfName}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Checkbox
              checked={value ? value : false}
              onChange={() => onChange(!value)}
              slotProps={{ input: { ref: ref } }}
            />
          )}
        />
        <Typography fontSize={"14px"}>
          By posting an event, you agree to our{" "}
          <Link href="/terms" target="_blank">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" target="_blank">
            Privacy Policy
          </Link>
          .
        </Typography>
      </Stack>
      {error && (
        <Typography sx={{ color: "red", fontSize: "16x" }}>
          You must agree to the statement above to post an event.
        </Typography>
      )}
    </Stack>
  );
}
