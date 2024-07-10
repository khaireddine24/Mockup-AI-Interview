import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router=useRouter();
    const OnStart=()=>{
        router.push('/dashboard/interview/'+interview?.MockId)
    }
    const OnFeedBack=()=>{
        router.push('/dashboard/interview/'+interview.MockId+'/feedback')
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-primary'>{interview.jobPosition}</h2>
      <h2 className='text-sm text-gray-600'>{interview.jobExperience}Years of Experience</h2>
      <h2 className='text-xs text-gray-400'>Created At {interview.createdAt}</h2>
      <div className='flex justify-between mt-2 gap-5'>
            <Button size='sm' variant='outline' className='w-full' onClick={OnFeedBack}>Feedback</Button>
            <Button size='sm' className='w-full' onClick={OnStart}>Start</Button>
      </div>
    </div> 
  )
}

export default InterviewItemCard
