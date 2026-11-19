import { captureMetadata } from "./meta";
import ProductPage from "./product";

export const metadata = captureMetadata("product", "ko");

export default function Page() {
  return <ProductPage lang="ko" />;
}
