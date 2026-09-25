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
    <div className="mx-6 mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <label
        htmlFor="briefing-question"
        className="mb-2 block text-sm font-semibold text-gray-900"
      >
        Briefing Question
      </label>

      <p className="mb-3 text-sm text-gray-500">
        Choose a predefined question to get insights about this client.
      </p>

      <select
        id="briefing-question"
        value={selectedQuestion}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
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