const path = require("path")
const createWebpackConfigAsync = require("webpack-config")

module.exports = async function(env, argv) {
  const config = await createWebpackConfigAsync(env, argv)

  // our @aliases go there
  config.resolve.alias["@navigators"] = path.resolve(
    __dirname,
    "src/navigators/",
  )
  config.resolve.alias["@components"] = path.resolve(
    __dirname,
    "src/components/",
  )
  config.resolve.alias["@screens"] = path.resolve(
    __dirname, 
    "src/screens/"
  )
  config.resolve.alias["@core"] = path.resolve(
    __dirname,
    "src/core/"
  )
  config.resolve.alias["@store"] = path.resolve(
    __dirname,
    "src/store/"
  )

  return config
}
