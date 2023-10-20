import { PageQuery } from "../../../tina/__generated__/types"

export function PageComponent(props: {
    data: PageQuery
    variables:{
        relativePath: string
    }
    query: string
}) {
    return (
    <div>
        {props.data.page.title}
    </div>

    )
} 