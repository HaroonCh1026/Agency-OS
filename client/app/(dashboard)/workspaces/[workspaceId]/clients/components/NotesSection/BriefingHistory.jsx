"use client";

export default function BriefingHistory({ briefings }) {
  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Briefing History
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Previous AI briefings for this client.
          </p>
        </div>

        {briefings.length > 0 && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {briefings.length}
          </span>
        )}
      </div>

      {briefings.length === 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center">
          <p className="text-sm font-medium text-gray-600">
            No briefing history yet.
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Your generated briefings will appear here.
          </p>
        </div>
      )}

      {briefings.length > 0 && (
        <div className="mt-4 space-y-4">
          {briefings.map((briefing) => (
            <div
              key={briefing.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-gray-300"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium leading-6 text-gray-900">
                  {briefing.question}
                </p>

                <span className="shrink-0 text-xs text-gray-400">
                  {new Date(briefing.created_at).toLocaleString()}
                </span>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                  {briefing.content?.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
