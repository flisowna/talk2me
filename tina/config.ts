import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "fc799f68-2d75-4a70-8bc7-e547385c0586", // Get this from tina.io
  token: "9c9f1a045e89a8d549a61828da40a1ccec7ebd76", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        format: "md",
        fields: [{
          name: "title", 
          type: "rich-text"
        }
        ]
      }
    ],
  },
});
