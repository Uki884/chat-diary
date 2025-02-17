import { withTamagui as tamagui } from "@tamagui/next-plugin";
import { withExpo } from "@expo/next-adapter";

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  reactStrictMode: true,
  // swcMinify: true,
  transpilePackages: [
    "react-native",
    "react-native-web",
    "expo",
  ],
  // experimental: {
  //   forceSwcTransforms: true,
  // },
});

const withTamagui = tamagui({
  config: "./tamagui.config.ts",
  components: ["tamagui"],
});

export default withTamagui(nextConfig);
