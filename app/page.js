"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StatCard } from "@/components/ui/StatCard";
import { UserIcon } from "lucide-react";
import Link from 'next/link';

const reviews = [
  {
    id: 1,
    name: "John Doe",
    comment: "Great mock interview experience!",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Very helpful for my job preparation.",
    rating: 4,
  },
  {
    id: 3,
    name: "Sam Wilson",
    comment: "The AI feedback was spot on.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl font-bold mb-4 sm:mb-0">AI Mock Interview Job Preparation</h1>
        <div className="space-y-2 sm:space-y-0 sm:space-x-4">
          <Link href={'/dashboard'}>
            <Button className="w-full sm:w-auto mb-3">Sign In</Button>
          </Link>
          <Link href={'/dashboard'}>
            <Button className="w-full sm:w-auto">Sign Up</Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="max-w-md mb-4 lg:mb-0">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
              <p>
                Our platform provides realistic mock interview experiences powered by advanced AI technology. These interviews simulate real-world scenarios, helping you practice and prepare effectively.
              </p>
              <Link href={'/dashboard'}>
                <Button className="mt-4 w-full sm:w-auto">Try Now</Button>
              </Link>
            </div>
            <Image
              src={'/meeting.png'}
              alt="Why Choose Us"
              width={400}
              height={200}
              className="rounded-lg w-full max-w-md lg:max-w-lg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <StatCard value="95%" label="Success Rate" />
            <StatCard value="500+" label="Mock interviews conducted" />
            <StatCard value="24/7" label="Support availability" />
            <StatCard value="100%" label="job placement" />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                <UserIcon />
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p>{review.comment}</p>
                  <p className="text-yellow-500">
                    {Array(review.rating).fill('⭐️').join('')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 text-center">
        <p>&copy; 2024 AI Mock Interview Job Preparation By Khaireddine</p>
      </div>
    </div>
  );
}