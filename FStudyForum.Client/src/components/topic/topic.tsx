// src/components/Topic.tsx
import React from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import type { Topic as TopicType } from "@/types/topic"; 

interface TopicProps {
  topic: TopicType; 
}

const TopicCard: React.FC<TopicProps> = ({ topic }) => { 
  return (
    <Card className="mt-3 w-50 border border-gray-300">
      <CardBody>
        <Typography variant="h5" color="gray" className="mb-2">
          {topic.name}
        </Typography>
        <Typography>{topic.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={`/TopicDetail/${topic.id}`}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
