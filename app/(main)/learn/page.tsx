import { FeedWrapper } from "@/components/FeedWrapper"
import { StickyWrapper } from "@/components/StickyWrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/UserProgress"
import { getUnits, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"
import Unit from "./Unit"



async function LearnPage() {
  const unitsData=getUnits();
  const userProgressData=getUserProgress();

  const [userProgress,units]=await Promise.all([userProgressData,unitsData]);


  if(!userProgress || ! userProgress.activeCourse){
    redirect("/courses")
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
       <UserProgress
       activeCourse={userProgress.activeCourse}
       hearts={userProgress.hearts}
       points={userProgress.points}
       hasActiveSubscription={false}
       />
      </StickyWrapper>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
        {
          units.map((unit)=> (
            <div key={unit.id} className="mb-10">
             
             <Unit
             id={unit.id}
             order={unit.order}
             description={unit.description}
             title={unit.title}
             lessons={unit.lessons}
             activeCourse={null}
             activeLessonPercentage={0}
             lessons={unit.lessons}
             />
            </div>
          ))
        }
      </FeedWrapper>
    </div>
  )
}

export default LearnPage