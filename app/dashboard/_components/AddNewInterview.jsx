"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAI';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import {v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';

const AddNewInterview=()=> {
    const {user}=useUser();
    const [openDailog,setOpenDailog]=useState(false);
    const [loading,setLoading]=useState(false);
    const [jobPos,setJobPos]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExp,setJobExp]=useState();
    const [jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter();

    const OnSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();
        const Prompt="Job Position: "+jobPos+", Job Description: "+jobDesc+", Years of Experience: "+jobExp+", Depends on job position & job Description & Years of Experience give us " +process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question along with answer in json format,Give us question and answer field on json";
        const result=await chatSession.sendMessage(Prompt);
        const InterviewJsonResp=(result.response.text()).replace('```json','').replace('```','');
        console.log(JSON.parse(InterviewJsonResp));
        setJsonResponse(InterviewJsonResp);
        if(InterviewJsonResp){
        const resp=await db.insert(Interview).values({
            MockId:uuidv4(),
            jsonResp:InterviewJsonResp,
            jobPosition:jobPos,
            jobDesc:jobDesc,
            jobExperience:jobExp,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-YYYY')
        }).returning({MockId:Interview.MockId});
        console.log("ID inserted:",resp);
        if(resp){
            setOpenDailog(false);
            router.push('/dashboard/interview/'+resp[0]?.MockId);
        }

    }
    else{
        console.log("Error ,Verify");
    }
    setLoading(false);
    }
  return (
    <div>
       <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
       onClick={()=>setOpenDailog(true)}
       >
        <h2 className='font-bold text-lg text-center'>+Add New</h2>
       </div>
       <Dialog open={openDailog}>
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>Tell us more about your job interviwing</DialogTitle>
                    <DialogDescription>
                    <form onSubmit={OnSubmit}>
                    <div>
                        <h2>Add Details about your job position/role,Job</h2>
                        <div className='mt-7 my-3'>
                            <label>Job Role/Job Position</label>
                            <Input 
                            placeholder="FullStack Developer For Example"
                            onChange={(e)=>setJobPos(e.target.value)} 
                            required/>
                        </div>
                        <div className='my-3'>
                            <label>Job Description/ Tech Stack</label>
                            <Textarea 
                            placeholder="React/Next For example" 
                            onChange={(e)=>setJobDesc(e.target.value)}
                            required/>
                        </div>
                        <div className='my-3'>
                            <label>Years of Experience</label>
                            <Input 
                            type="number" 
                            placeholder="10 For Example" 
                            max="60" 
                            onChange={(e)=>setJobExp(e.target.value)}
                            required/>
                        </div>
                    </div>
                    <div className='flex gap-5 justify-end'>
                        <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading?<><LoaderCircle className='animate-spin'/>'Generating from AI'</>:'Start Interview'}
                        </Button>
                    </div>
                    </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewInterview
