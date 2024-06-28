import { ContentRenderer } from "@/components/editor";
import { API_URL_LOCAL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

const getPrivacyPolicy = async () => {
  const url = `${API_URL_LOCAL}/content/site-settings/privacy-policy`;
  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .json()
    .then((json) => json)
    .catch((e) => undefined);
};

export default async function PrivacyPolicy() {
  const privacyPolicy = await getPrivacyPolicy();

  return (
    <div className="container max-w-3xl 2xl:max-w-4xl py-5 mb-10">
      <h1 className="mb-6">Privacy Policy</h1>
      <ContentRenderer lexical={privacyPolicy} />
    </div>
  );
}
