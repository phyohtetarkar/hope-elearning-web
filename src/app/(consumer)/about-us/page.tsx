import { API_URL_LOCAL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Start a new career in the software developing industry.",
};

const getAboutUs = async () => {
  const url = `${API_URL_LOCAL}/content/site-settings/about-us`;
  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .text()
    .then((text) => text)
    .catch((e) => undefined);
};

export default async function AboutUs() {
  const aboutUs = await getAboutUs();

  return (
    <div className="container max-w-3xl 2xl:max-w-4xl py-5 mb-10">
      <article
        className="prose prose-headings:mt-0 max-w-none"
        dangerouslySetInnerHTML={{
          __html: aboutUs ?? "",
        }}
      ></article>
    </div>
  );
}
