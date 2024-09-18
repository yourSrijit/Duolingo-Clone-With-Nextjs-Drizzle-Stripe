import { getCourses, getUserProgress } from "@/db/queries"
import { List } from "./List";


async function Coursepage() {
    const coursesData=getCourses();
    const userProgressData=getUserProgress();

    const [courses,userProgress]=await Promise.all([
      coursesData,
      userProgressData
    ])
    
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">
            Language Course
        </h1>
        <List
        activeCourseId={userProgress?.activeCourseId}  
        courses={courses}
        />
    </div>
  )
}

export default Coursepage