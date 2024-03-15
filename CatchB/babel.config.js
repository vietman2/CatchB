/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            assets: "./assets",
            ".components": "./src/components",
            ".constants": "./src/constants",
            ".data": "./src/constants/test_data",
            ".services": "./src/services",
            ".store": "./src/store",
            ".themes": "./src/constants/themes",
            ".types": "./src/constants/types",
            ".utils": "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
