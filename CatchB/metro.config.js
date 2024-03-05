const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  // Get the default Expo Metro configuration
  const config = getDefaultConfig(__dirname);

  // Destructure to get transformer and resolver from the default config
  const { transformer, resolver } = config;

  // Modify the transformer to use react-native-svg-transformer for SVG files
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  // Update the resolver to handle SVG files properly
  config.resolver = {
    ...resolver,
    // Filter out 'svg' from the list of asset extensions if it's there
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    // Add 'svg' to the list of source extensions
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  // Return the modified configuration
  return config;
})();
