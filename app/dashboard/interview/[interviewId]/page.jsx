"use client";
import { db } from '@/utils/db';
import React, { useEffect, useState } from 'react';
import { Interview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function MockInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(params.interviewId + " ok");
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const res = await db.select().from(Interview)
        .where(eq(Interview.MockId, params.interviewId));
      setInterviewData(res[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div className='flex flex-col my-5 gap-10 content-center	justify-center'>
        {loading ? (
          <p>Loading interview details...</p>
        ) : interviewData ? (
           <div> 
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
            <h2 className='text-lg'><strong>Job Description:</strong> {interviewData.jobDesc}</h2>
            <h2 className='text-lg'><strong>Job Experience:</strong> {interviewData.jobExperience}</h2>
          </div>

          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100 my-5'>
          <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information:</strong></h2>
          <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
          
          </div>
        ) : (
          <p>Interview details not found.</p>
        )}
      </div>    
      <div className="flex flex-col	justify-center	content-center	">
        {webCamEnabled ? (
          <Webcam
            className="w-full h-96"
            onUserMedia={() => { setWebCamEnabled(true); }}
            onUserMediaError={() => { setWebCamEnabled(false); }}
            mirrored={true}
          />
          
        ) : (
          <>
            <WebcamIcon className='my-7 h-72 w-full bg-secondary p-20 rounded-lg border' />
            <Button onClick={() => setWebCamEnabled(true)} className='w-full' variant="ghost">Enable Web Cam and Microphone</Button>
          </>
        )}
      </div>
      

      </div>
      <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button>Start Interview</Button>
        </Link>
        
      </div>
      
    </div>
    
  );
}

export default MockInterview;
