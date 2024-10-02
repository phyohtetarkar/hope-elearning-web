import { API_URL_LOCAL } from "@/lib/constants";
import AboutUsPage from "./about-us-page";

const getAboutUs = async () => {
  const url = `${API_URL_LOCAL}/content/site-settings/about-us`;
  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp.text().catch((e) => undefined);
};

export default async function AboutUs() {
  const aboutUs = await getAboutUs();
  return <AboutUsPage value={aboutUs} />;
}
