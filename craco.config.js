const path = require("path");

module.exports = {
  webpack: {
    //Set alias
    alias: {
      //Set @ to src dirctory. This is useful for importing files from src directory without using relative paths.
      //For example, instead of importing a file like this: import MyComponent from "../../components/MyComponent";
      //You can import it like this: import MyComponent from "@/components/MyComponent";
      "@": path.resolve(__dirname, "src"),
    },
  },
};
