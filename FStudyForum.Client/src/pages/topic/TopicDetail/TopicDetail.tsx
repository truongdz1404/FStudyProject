// src/components/TopicDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const TopicDetail: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [unlockDate, setUnlockDate] = useState<Date | null>(null);
  const { id } = useParams<{ id?: string }>(); // Đặt kiểu của id là string hoặc undefined
  const [topic, setTopic] = useState<{ name: string; description: string } | null>(null);
  
  useEffect(() => {
    if (!id) {
      // Nếu id là undefined, không làm gì cả
      return;
    }

    const fetchTopicById = async (id: string) => {
      try {
        const response = await fetch(`/api/topics/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };
    fetchTopicById(id);
  }, [id]);
  useEffect(() => {
    // Gọi hàm kiểm tra trạng thái khóa ở đây
    checkLockStatus();
  }, []);
  const checkLockStatus = async () => {
    // Thực hiện logic kiểm tra trạng thái khóa ở đây
    // const isLockedUser = await isUserLocked(); // Phương thức này cần được triển khai để gọi API hoặc thực hiện kiểm tra khác
    // if (isLockedUser) {
    //   setIsLocked(true);
    //   // Lấy thời gian mở khóa
    //   const unlockDate = await getUnlockDate(); // Phương thức này cũng cần được triển khai để gọi API hoặc thực hiện kiểm tra khác
    //   setUnlockDate(unlockDate);
    // } else {
    //   setIsLocked(false);
    // }
  };
  if (!topic) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Chi Tiết Chủ Đề</h2>
      <p>Tên: {topic.name}</p>
      <p>Mô tả: {topic.description}</p>
    </div>
  );
};

export default TopicDetail;
