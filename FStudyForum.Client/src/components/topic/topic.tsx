import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
export function Topic() {
  return (
    <Card className="mt-3 w-50 border border-gray-300">
      <CardBody>
        <Typography variant="h5" color="gray" className="mb-2">
          SWP391
        </Typography>
        <Typography>
        Application Development Project 
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      <Link to="/TopicDetail">
                    <Button>View</Button>
                </Link>
      </CardFooter>
    </Card>
  );
} export default Topic;