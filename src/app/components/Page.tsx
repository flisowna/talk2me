import client from "../../../tina/__generated__/client";
import { PageQuery } from "../../../tina/__generated__/types";
import { PageComponent } from "./PageComponent"


export default async function Page() {
    const result = await client.queries.page({ relativePath: "press.md"})
    
    return <PageComponent {...result} />
  
} 