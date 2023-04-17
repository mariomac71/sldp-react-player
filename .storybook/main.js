module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-mdx-gfm"],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: false
  },
  webpackFinal: async (config) => {
    // https://github.com/storybookjs/storybook/issues/21242#issuecomment-1495749068
    // Removing the global alias as it conflicts with the global npm pkg
    const { global, ...alias } = config.resolve.alias
    config.resolve.alias = alias
    
    // Return the altered config
    return config;
  }
};