/* eslint-disable no-undef */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            'assets': './assets',
          }
        }
      ],
      "react-native-reanimated/plugin"
    ]
  };
};
