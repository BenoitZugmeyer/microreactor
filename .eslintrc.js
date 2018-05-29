module.exports = {
  extends: "benoitz-prettier",

  globals: {
    require: false,
  },

  env: {
    node: true,
  },

  overrides: [
    {
      files: ["**/__tests__/*.js"],
      env: {
        jest: true,
      },
    },
  ],
}
