import { captureMetadata } from "../meta";
import PrivacyPage from "../privacy";

export const metadata = captureMetadata("privacy", "ko");

export default function Page() {
  return <PrivacyPage lang="ko" />;
}
