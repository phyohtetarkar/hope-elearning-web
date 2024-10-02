import { API_URL_LOCAL } from "@/lib/constants";
import PrivacyPolicyPage from "./privacy-policy-page";

const getPrivacyPolicy = async () => {
  const url = `${API_URL_LOCAL}/content/site-settings/privacy-policy`;
  const resp = await fetch(url, {
    cache: "no-store",
  });

  return resp
    .text()
    .catch((e) => undefined);
};

export default async function PrivacyPolicy() {
  const privacyPolicy = await getPrivacyPolicy();
  return <PrivacyPolicyPage value={privacyPolicy} />;
}
