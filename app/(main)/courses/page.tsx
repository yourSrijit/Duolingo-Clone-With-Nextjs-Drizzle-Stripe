import { getCourses } from "@/db/queries"
import { List } from "./List";


async function Coursepage() {
    const courses=await getCourses();
    
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">
            Language Course
        </h1>
        <List
        activeCourseId={1}
        courses={courses}
        />
    </div>
  )
}

export default Coursepage