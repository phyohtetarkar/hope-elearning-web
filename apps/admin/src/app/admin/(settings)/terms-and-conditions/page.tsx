import { API_URL_LOCAL } from "@/lib/constants";
import TermsAndConditionsPage from "./terms-and-conditions-page";

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

  return <TermsAndConditionsPage value={termsAndConditions} />;
}
