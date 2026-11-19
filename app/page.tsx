import type { Metadata } from "next";
import { JsonLd } from "./capture/chrome";
import { HOME_JSONLD } from "./capture/meta";
import Site from "./site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <JsonLd data={HOME_JSONLD} />
      <Site />
    </>
  );
}
