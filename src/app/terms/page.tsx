import { Box, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions - The Local Music Finder",
  description:
    "These Terms and Conditions outline the rules and guidelines for using our website and services.",
};

export default function Page() {
  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: "50px",
      }}
    >
      <Box
        sx={{
          width: { xs: "90vw", md: "70vw", xl: "50vw" },
          backgroundColor: "whitesmoke",
          p: 2,
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Terms and Conditions
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Last Updated: August 19, 2024
          </Typography>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              1. Acceptance of Terms
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              By accessing and using the TheLocalMusicFinder.com website (the
              &quot;Site&quot;), you agree to comply with and be bound by these
              Terms and Conditions. If you do not agree to these terms, please
              do not use the Site.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              2. Use of the Sites
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Eligibility:</strong> The Site is intended for users who
              are 21 years of age or older. By using the Site, you represent and
              warrant that you are at least 21 years old.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>License:</strong> We grant you a limited, non-exclusive,
              non-transferable license to access and use the Site.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Prohibited Conduct:</strong> You agree not to use the Site
              for any unlawful purpose or in violation of any local, state,
              national, or international law; post or transmit any content that
              is defamatory, obscene, pornographic, harmful, or otherwise
              objectionable; attempt to interfere with the operation of the Site
              or access any data or information not intended for you.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              3. Content Submission
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>User Content:</strong> By submitting content (including
              but not limited to event listings, comments, and messages) to the
              Site, you grant us a non-exclusive, royalty-free, perpetual, and
              worldwide license to use, reproduce, modify, and distribute the
              content in connection with the Site.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Content Guidelines:</strong> All content submitted must be
              accurate, not misleading, and comply with all applicable laws and
              regulations. We reserve the right to remove any content that
              violates these guidelines or is otherwise inappropriate.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              4. Registration
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Optional Registration:</strong> Registration on the Site
              is optional. However, certain features may only be accessible to
              registered users.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Account Responsibility:</strong> If you choose to register
              (post an event and/or sign up for weekly email notifications about
              events), you are responsible for maintaining the confidentiality
              of your account information (including your Event ID) and for all
              activities that occur under your account.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              5. Privacy
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              Your use of the Site is also governed by our Privacy Policy, which
              can be found <Link href="/privacy-policy">here</Link>.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              6. Disclaimers
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>No Warranty:</strong> The Site is provided on an
              &quot;as-is&quot; and &quot;as-available&quot; basis. We make no
              warranties, express or implied, regarding the operation or
              availability of the Site or the accuracy, completeness, or
              reliability of any content available on the Site.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Limitation of Liability:</strong> To the fullest extent
              permitted by law, we disclaim all liability for any damages
              arising out of or in connection with your use of the Site,
              including but not limited to direct, indirect, incidental,
              punitive, and consequential damages.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              7. Modifications to Terms
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be effective immediately upon posting on
              the Site. Your continued use of the Site after any such changes
              constitutes your acceptance of the new terms.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              8. Governing Law
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              These Terms and Conditions are governed by and construed in
              accordance with the laws of Passaic County/New Jersey, without
              regard to its conflict of law principles.
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              9. Contact Information
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at{" "}
              <a href="mailto:questions@thelocalmusicfinder.com">
                questions@thelocalmusicfinder.com
              </a>
              .
            </Typography>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              10. Miscellaneous
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Severability:</strong> If any provision of these Terms and
              Conditions is found to be invalid or unenforceable, the remaining
              provisions will remain in full force and effect.
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                paddingLeft: "25px",
              }}
            >
              <strong>Entire Agreement:</strong> These Terms and Conditions
              constitute the entire agreement between you and us regarding the
              use of the Site and supersede any prior agreements.
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: "16px",
              paddingTop: "20px",
            }}
          >
            By using the Site, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and Conditions.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
