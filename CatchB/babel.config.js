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
            ".types": "./src/constants/types",
            //'components': './src/components',
            //'constants': './src/constants',
            //'navigation': './src/navigation',
            //'screens': './src/screens',
            //'services': './src/services',
            //'store': './src/store',
            //'styles': './src/styles',
            //'utils': './src/utils'
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
