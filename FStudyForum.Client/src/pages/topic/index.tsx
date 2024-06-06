    import React from 'react';
    import Topic from "@/components/topic/topic";
    import { Button, Select, Option } from "@material-tailwind/react";

    const TopicList: React.FC = () => {
        const totalTopics = 15;
        // mảng chứa các component Topic
        const topics = Array.from({ length: totalTopics }, (_, index) => (
            <Topic key={index + 1} />
        ));

        return (
            <div>
                 <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
                <Select label="Chọn Kỳ" className="w-full">
                    <Option>Kỳ 1</Option>
                    <Option>Kỳ 2</Option>
                    <Option>Kỳ 3</Option>
                    <Option>Kỳ 4</Option>
                    <Option>Kỳ 5</Option>
                    <Option>Kỳ 6</Option>
                    <Option>Kỳ 7</Option>
                    <Option>Kỳ 8</Option>
                    <Option>Kỳ 9</Option>
                </Select>
                <Select label="Ngành" className="w-full">
                    <Option>SE</Option>
                    <Option>AI</Option>
                    <Option>DSN</Option>
                    <Option>MKT</Option>
                </Select>
            </div>
            <Button variant="filled" color="indigo">
                Thêm
            </Button>
        </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
                    {topics.map((topic, index) => (
                        <div key={index}>
                            {topic}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    export default TopicList;
