"use client"
import { userAnswer } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'
import { db } from '@/utils/db'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {
  const [feedbacklist,setFeedbackList]=useState([]);
  const router=useRouter();

  useEffect(()=>{
    GetFeedback();
  },[]);

  const GetFeedback=async()=>{
    const result=await db.select().from(userAnswer).where(eq(userAnswer.MockIdRef,params.interviewId))
    .orderBy(userAnswer.id);
    console.log(result)
    setFeedbackList(result);
  }
  return (
    <div className='p-10'>
     
      {feedbacklist?.length==0?
        <h2 className='font-bold text-xl text-gray-500'> No Interview Feedback Founded Here</h2>:
        
      
      <>
       <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
       <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary my-3 text-lg'>your overall interview rating :<strong>7/10</strong></h2>
      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer , Your answer and feedback for improvement</h2>
      {feedbacklist&&feedbacklist.map((item,index)=>(
        <div>
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between gap-7 w-full my-2 text-left'>
              {item.question} <ChevronsUpDown className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'>
                  <strong>Rating:</strong>{item.rating}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                  <strong>Your Answer:</strong>{item.userAnswer}
                </h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                  <strong>Correct Answer:</strong>{item.correctAnswer}
                </h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                  <strong>Feedback:</strong>{item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>

        </div>
      ))}
      </>}
      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
