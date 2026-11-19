import { captureMetadata } from "../meta";
import ProductPage from "../product";

export const metadata = captureMetadata("product", "en");

export default function Page() {
  return <ProductPage lang="en" />;
}
