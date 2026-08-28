"use client";

import { useState } from "react";
import { askClientAi } from "@/services/ai";
import { getApiErrorMessage } from "@/services/apiErrors";

export default function AiSection({ workspaceId, client }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    if (!client) {
      setError("Please select a client first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await askClientAi(
        workspaceId,
        client.id,
        question.trim(),
      );

      if (response.ok) {
        setAnswer(response.data?.answer || "No answer received.");
        return;
      }

      setError(getApiErrorMessage(response, "Unable to get an AI answer."));
    } catch (error) {
      console.error("AI request failed:", error);
      setError("Unable to get an AI answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            AI Assistant
          </h2>

          <p className="mt-0.5 text-sm text-gray-500">
            Ask a question about this client's notes.
          </p>
        </div>
      </div>

      <div className="px-6 py-6">
        <div>
          <label
            htmlFor="ai-question"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Question
          </label>

          <textarea
            id="ai-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="e.g. What is the latest activity?"
            rows={3}
            disabled={loading}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-200 disabled:bg-gray-50"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAsk}
            disabled={loading}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Asking..." : "Ask AI"}
          </button>
        </div>

        {answer && (
          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Answer</h3>

            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {answer}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
