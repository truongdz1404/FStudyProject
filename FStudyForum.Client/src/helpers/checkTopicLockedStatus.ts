import TopicService from "@/services/TopicService";

export const checkIfTopicIsLocked = async (
  username: string,
  topicName: string
) => {
  const isLocked = await TopicService.isLocked(username, topicName);
  if (isLocked.data) {
    const unlockTimeResponse = await TopicService.unlockTime(
      username,
      topicName
    );
    const unlockTimeDate = new Date(String(unlockTimeResponse.data));
    const now = new Date();
    if (now.getTime() >= unlockTimeDate.getTime()) {
      await TopicService.unban(username, topicName);
      return { locked: false, timeDiffString: "" };
    } else {
      const timeDiff = unlockTimeDate.getTime() - now.getTime();
      const secondsDiff = Math.floor(timeDiff / 1000);
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));
      const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      const monthsDiff = Math.floor(daysDiff / 30);
      const yearsDiff = Math.floor(monthsDiff / 12);

      let timeDiffString;
      if (secondsDiff < 60) {
        timeDiffString = `${secondsDiff} seconds`;
      } else if (minutesDiff < 60) {
        timeDiffString = `${minutesDiff} minutes`;
      } else if (hoursDiff < 24) {
        timeDiffString = `${hoursDiff} hours`;
      } else if (daysDiff < 30) {
        timeDiffString = `${daysDiff} days`;
      } else if (monthsDiff < 12) {
        timeDiffString = `${monthsDiff} months`;
      } else {
        timeDiffString = `${yearsDiff} years`;
      }
      return { locked: true, timeDiffString };
    }
  } else {
    return { locked: false, timeDiffString: "" };
  }
};
