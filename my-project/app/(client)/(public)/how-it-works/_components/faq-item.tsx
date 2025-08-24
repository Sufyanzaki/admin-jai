"use client";

import { MessageCircle } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div>
      <>
        <div className="flex flex-col items-start justify-between gap-3 w-full">
          <div>
            <h4 className="text-xl lg:text-[22px] flex flex-row gap-5 items-center font-semibold">
              <div className="min-w-9 w-9 min-h-9 h-9 bg-app-sky-blue rounded-md flex items-center justify-center">
                <MessageCircle className="text-white" />{" "}
              </div>
              {question}
            </h4>
          </div>
          <div className="mt-2 pl-14">
            <p className=" text-sm lg:text-base leading-relaxed">{answer}</p>
          </div>
        </div>
      </>
    </div>
  );
}
