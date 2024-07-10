"use client"
import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAI'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { userAnswer } from '@/utils/schema'
import moment from 'moment'

function RecordAnswerSection({ mockInterviewQuestion,activeQuestion,interview }) {
  const [userRecAnswer, setUserRecAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((res) => {
      setUserRecAnswer(prev => prev + res?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userRecAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userRecAnswer]);

  
 

  const updateUserAnswer = async () => {
    console.log(userRecAnswer);
    setLoading(true);
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestion]?.question}, User Answer: ${userRecAnswer}, Depends on question and user answer for given interview question, please give us a rating for the answer and feedback as an area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.`;
      
      const res = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (res.response.text()).replace('```json', '').replace('```', '');
      const jsonFeedbackRes = JSON.parse(mockJsonResp);

      const rep = await db.insert(userAnswer).values({
        MockIdRef: interview?.MockId,
        question: mockInterviewQuestion[activeQuestion]?.question,
        correctAnswer: mockInterviewQuestion[activeQuestion]?.answer,
        userAnswer: userRecAnswer,
        feedback: jsonFeedbackRes?.feedback,
        rating: jsonFeedbackRes?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      });
      if (rep) {
        toast('User Answer Recorded Successfully');
        setUserRecAnswer('');
        setResults([]);
      }
      setResults([]);
      setLoading(false);
  };

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col justify-center items-center bg-black  p-5 mt-20'>
      <Image src={'/webCam.png'} width={200} height={200} className='absolute'/>
      <Webcam
      mirrored={true}
      style={{
        height:300,
        width:"100%",
        zIndex:10
      }}
      />
    </div>
    <Button 
      variant='outline' 
      className='my-10' 
      onClick={StartStopRecording}
      disabled={loading}
    >
      {isRecording?
      <h2 className='flex gap-2 text-red-600'>
        <StopCircle/>Stop Recording...
      </h2>:
      'Record Answer'
      }
    </Button>
    
    </div>
  )
}

export default RecordAnswerSection
