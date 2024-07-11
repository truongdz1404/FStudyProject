import { Attachment } from "@/types/attachment"
import { FC } from "react"

type Props = {
    data: Attachment[]
}

const AttachmentBox:FC<Props> = () => {
  return (
    <div>AttachmentBox</div>
  )
}

export default AttachmentBox