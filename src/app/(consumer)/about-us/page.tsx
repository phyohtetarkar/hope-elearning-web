import { ContentRenderer } from "@/components/editor";
import { API_URL_LOCAL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

const getAboutUs = async () => {
  const url = `${API_URL_LOCAL}/content/site-settings/about-us`;
  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .json()
    .then((json) => json)
    .catch((e) => undefined);
};

export default async function AboutUs() {
  const aboutUs = await getAboutUs();

  return (
    <div className="container max-w-3xl 2xl:max-w-4xl py-5 mb-10">
      <h1 className="mb-6">About Us</h1>
      <ContentRenderer lexical={aboutUs} />
    </div>
  );
}
