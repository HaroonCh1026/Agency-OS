"use client";

export default function BriefingHistory({ briefings }) {
  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <h3 className="text-sm font-semibold text-gray-900">Briefing History</h3>

      {briefings.length === 0 && (
        <p className="mt-3 text-sm text-gray-500">No briefing history yet.</p>
      )}

      {briefings.length > 0 && (
        <div className="mt-4 space-y-4">
          {briefings.map((briefing) => (
            <div
              key={briefing.id}
              className="rounded-xl border border-gray-100 bg-gray-50 p-4"
            >
              <p className="text-sm font-medium text-gray-900">
                {briefing.question}
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {briefing.content?.answer}
              </p>

              <p className="mt-3 text-xs text-gray-400">
                {new Date(briefing.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
