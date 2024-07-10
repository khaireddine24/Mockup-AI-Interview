"use client";
import React, { useEffect, useState } from 'react';
import { Interview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const [interview, setInterviewData] = useState('');
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestion,setActiveQuestion]=useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const res = await db.select().from(Interview)
                .where(eq(Interview.MockId, params.interviewId));

            const jsonResp = JSON.parse(res[0].jsonResp);
            setMockInterviewQuestion(jsonResp);
            setInterviewData(res[0]);
        } catch (error) {
            console.error("Error fetching interview details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionsSection 
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestion={activeQuestion}
                />

                <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestion={activeQuestion}
                interview={interview}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestion>0 &&
                    <Button onClick={()=>{setActiveQuestion(activeQuestion-1)}}>Previous Question</Button>
                }
                {activeQuestion!=mockInterviewQuestion?.length-1 && 
                    <Button onClick={()=>{setActiveQuestion(activeQuestion+1)}}>Next Question</Button>
                }
                {activeQuestion==mockInterviewQuestion?.length-1 && 
                <Link href={'/dashboard/interview/'+interview?.MockId+"/feedback"}>
                    <Button>End Interview</Button>
                </Link>
                }
            </div>
        </div>
    );
}

export default StartInterview;
