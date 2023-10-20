import Layout from "../components/Layout";
import client from "../../../tina/__generated__/client";
import { PageQuery } from "../../../tina/__generated__/types";

// async function fetchMyPost() {
//   const content = await client.queries.page({ relativePath: "press.md"})

//   console.log(content.data);
//   return content;
// }






export default function Page() {
  // const content = fetchMyPost();

return (
    <Layout>
      <main>
        <Page/>
        
      </main>
    </Layout>
  );
}
