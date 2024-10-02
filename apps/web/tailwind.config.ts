import sharedConfig from "@elearning/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@elearning/ui/dist/**/*.js",
    "./node_modules/@elearning/block-editor/dist/**/*.js",
    "../../packages/config-tailwind/node_modules/@nextui-org/theme/dist/components/(navbar|listbox).js",
  ],
  presets: [sharedConfig],
};
export default config;
