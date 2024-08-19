import RegistrationForm from "@/components/RegistrationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up For Weekly Event Notifications",
  description:
    "Use this form to sign up for personalized weekly event notifications so you never miss live music near you.",
};

export default function Page() {
  return <RegistrationForm />;
}
