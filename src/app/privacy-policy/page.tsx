import { Box, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - The Local Music Finder",
  description:
    "This Privacy Policy outlines how we collect, use, and safeguard your information when you use our website.",
};

export default function Page() {
  return (
    <>
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
              Privacy Policy
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Effective Date: August 1, 2024
            </Typography>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                1. Introduction
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                Welcome to TheLocalMusicFinder.com (the &quot;Site&quot;). We
                are committed to protecting your privacy and ensuring that your
                personal information is handled in a safe and responsible
                manner. This Privacy Policy outlines how we collect, use, and
                safeguard your information when you use our Site. When you use
                our Site, you consent to our collection, use, and disclosure of
                information about you as described in this Privacy Policy.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                2. Information We Collect
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Personal Information:</strong> If you register (post an
                event and/or sign up for weekly event notifications) on the
                Site, we may collect personal information such as your name,
                email address, and any other information you choose to provide.
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Non-Personal Information:</strong> We may also collect
                non-personal information about your use of the Site, such as IP
                addresses, browser types, referring pages, and pages visited.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                3. How We Use Your Information
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>To Provide Services:</strong> We use your information to
                operate and maintain the Site, including posting local music
                events and providing other services you request.
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>To Communicate with You:</strong> If you register on the
                Site, we may use your contact information to send you updates,
                newsletters, and other communications related to the Site. You
                can opt out of these communications at any time.
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>To Improve the Site:</strong> We may use non-personal
                information to analyze how our Site is used and improve its
                functionality and content.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                4. Cookies and Tracking Technologies
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Cookies:</strong> We use cookies and similar tracking
                technologies to enhance your experience on the Site. Cookies are
                small data files stored on your device that help us remember
                your preferences and understand how you use the Site.
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Managing Cookies:</strong> You can manage your cookie
                preferences through your browser settings. Please note that
                disabling cookies may affect the functionality of the Site.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                5. Third-Party Services
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Service Providers:</strong> We may engage third-party
                service providers to assist us in operating the Site and
                providing services to you. These providers may have access to
                your personal information as necessary to perform their
                functions, but they are not permitted to use it for any other
                purpose.
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Links to Other Sites:</strong> The Site may contain
                links to other websites. We are not responsible for the privacy
                practices or content of those sites. We encourage you to review
                the privacy policies of any third-party sites you visit.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                6. Data Security
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                We implement security measures to protect your personal
                information from unauthorized access, use, or disclosure.
                However, no internet transmission is completely secure, and we
                cannot guarantee the security of your information.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                7. Children&apos;s Privacy
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                The Site is not intended for use by individuals under the age of
                21. We do not knowingly collect personal information from
                individuals under 21. If we become aware that we have
                inadvertently collected such information, we will take steps to
                delete it.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                8. Your Rights
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Access and Correction:</strong> You have the right to
                access and correct any personal information we hold about you.
                If you would like to exercise this right, please contact us at{" "}
                <a href="mailto:questions@thelocalmusicfinder.com">
                  questions@thelocalmusicfinder.com
                </a>
                .
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                <strong>Opt-Out:</strong> You can opt out of receiving
                communications from us at any time by following the instructions
                in the communication or contacting us directly.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                9. Changes to This Privacy Policy
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of any significant changes by posting the new policy on the
                Site and updating the effective date. Your continued use of the
                Site after any changes constitutes your acceptance of the
                updated policy.
              </Typography>
            </Stack>
            <Stack direction="column" spacing={0.5}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                10. Contact Us
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  paddingLeft: "25px",
                }}
              >
                If you have any questions or concerns about this Privacy Policy
                or our privacy practices, please contact us at{" "}
                <a href="mailto:questions@thelocalmusicfinder.com">
                  questions@thelocalmusicfinder.com
                </a>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
