import { API_URL_LOCAL } from "@/lib/constants";
import { ContentRenderer } from "@elearning/block-editor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms And Conditions",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

const getTermsAndConditions = async () => {
  const url = `${API_URL_LOCAL}/content/site-settings/terms-and-conditions`;
  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .text()
    .catch((e) => undefined);
};

export default async function TermsAndConditions() {
  const termsAndConditions = await getTermsAndConditions();

  return (
    <div className="container max-w-3xl 2xl:max-w-4xl py-5 mb-10">
      <h1 className="mb-6">Terms And Conditions</h1>
      <ContentRenderer html={termsAndConditions} />
    </div>
  );
}
