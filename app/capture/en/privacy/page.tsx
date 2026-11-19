import { captureMetadata } from "../../meta";
import PrivacyPage from "../../privacy";

export const metadata = captureMetadata("privacy", "en");

export default function Page() {
  return <PrivacyPage lang="en" />;
}
