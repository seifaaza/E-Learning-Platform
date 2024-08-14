import React, { Suspense } from "react";

interface SavedCoursesProps {
  params: {
    username: string;
  };
}

const SavedCourses: React.FC<SavedCoursesProps> = ({
  params: { username },
}) => {
  return <p className="text-black">{username}</p>;
};

export default SavedCourses;
