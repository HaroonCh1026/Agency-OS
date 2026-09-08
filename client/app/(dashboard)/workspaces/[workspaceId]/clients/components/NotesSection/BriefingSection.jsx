"use client";

import { useState } from "react";
import { briefingQuestions } from "@/utils/briefingQuestions";

export default function BriefingSection({ onSelectQuestion }) {
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const handleChange = (event) => {
    const question = event.target.value;

    setSelectedQuestion(question);
    onSelectQuestion(question);
  };

  return (
    <div className="mx-6 mt-4">
      <label
        htmlFor="briefing-question"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Briefing Question
      </label>

      <select
        id="briefing-question"
        value={selectedQuestion}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
      >
        <option value="">Select briefing</option>

        {briefingQuestions.map((question) => (
          <option key={question} value={question}>
            {question}
          </option>
        ))}
      </select>
    </div>
  );
}
