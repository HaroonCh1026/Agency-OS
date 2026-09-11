"use client";

import { useEffect, useState, useTransition } from "react";
import { askClientAi } from "@/services/ai";
import { getBriefingDocuments } from "@/services/briefingDocuments";
import { getApiErrorMessage } from "@/services/apiErrors";
import BriefingSection from "./BriefingSection";
import BriefingHistory from "./BriefingHistory";
import ErrorBoundary from "./ErrorBoundary";

function AiSectionContent({ workspaceId, client }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [briefings, setBriefings] = useState([]);
  const [status, setStatus] = useState("idle");
  const [historyStatus, setHistoryStatus] = useState("idle");
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const loadBriefings = async () => {
    if (!client?.id) {
      setBriefings([]);
      setHistoryStatus("idle");
      return;
    }

    setHistoryStatus("loading");

    try {
      const response = await getBriefingDocuments(workspaceId, client.id);

      if (response.ok) {
        setBriefings(response.data || []);
        setHistoryStatus("success");
        return;
      }

      setHistoryStatus("error");
    } catch (error) {
      console.error("Failed to load briefing history:", error);
      setHistoryStatus("error");
    }
  };

  useEffect(() => {
    loadBriefings();
  }, [workspaceId, client?.id]);

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      setStatus("error");
      return;
    }

    if (!client) {
      setError("Please select a client first.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");
    setAnswer("");

    try {
      const response = await askClientAi(
        workspaceId,
        client.id,
        question.trim(),
      );

      if (response.ok) {
        startTransition(() => {
          setAnswer(response.data?.answer || "No answer received.");
        });

        setStatus("success");

        await loadBriefings();

        return;
      }

      setStatus("error");
      setError(getApiErrorMessage(response, "Unable to get an AI answer."));
    } catch (error) {
      console.error("AI request failed:", error);
      setStatus("error");
      setError("Unable to get an AI answer. Please try again.");
    }
  };

  const loading = status === "loading";

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-5">
        <h2 className="text-base font-semibold text-gray-900">AI Assistant</h2>

        <p className="mt-1 text-sm text-gray-500">
          Ask a question about this client's notes.
        </p>
      </div>

      <BriefingSection onSelectQuestion={setQuestion} />

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
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
          />
        </div>

        {status === "idle" && (
          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Ask a question about this client's notes to get an AI response.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">{error}</p>

            <p className="mt-1 text-sm text-red-600">
              Please check your question and try again.
            </p>
          </div>
        )}

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAsk}
            disabled={loading}
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Asking..." : "Ask AI"}
          </button>
        </div>

        {status === "loading" && (
          <div
            className="mt-6 animate-pulse rounded-xl border border-gray-100 bg-gray-50 p-5"
            aria-label="Loading AI response"
          >
            <div className="mb-4 h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-4/6 rounded bg-gray-200" />
          </div>
        )}

        {status === "success" && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Answer</h3>

            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {answer}
            </p>
          </div>
        )}

        {historyStatus === "loading" && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500">Loading briefing history...</p>
          </div>
        )}

        {historyStatus === "error" && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm text-red-600">
              Unable to load briefing history.
            </p>
          </div>
        )}

        {historyStatus === "success" && (
          <BriefingHistory briefings={briefings} />
        )}
      </div>
    </section>
  );
}

export default function AiSection(props) {
  return (
    <ErrorBoundary>
      <AiSectionContent {...props} />
    </ErrorBoundary>
  );
}
