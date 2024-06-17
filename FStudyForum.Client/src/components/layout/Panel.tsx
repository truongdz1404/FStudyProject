import { Card } from "@material-tailwind/react"
import { FC, PropsWithChildren } from "react"

const Panel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card className="min-h-72 mx-4 rounded-sm shadow-sm bg-gray-100 p-4">
      {children}
    </Card>
  )
}

export default Panel
