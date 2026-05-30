"use client";

import { useActionState, useState } from "react";
import { updateCapsule } from "@/app/(protected)/capsules/actions";
import { CapsuleWithContent } from "@/types";
import Link from "next/link";

interface Props {
  capsule: CapsuleWithContent;
}

export default function EditCapsuleForm({ capsule }: Props) {
  const [state, formAction, pending] = useActionState(updateCapsule, {});
  // console.log("CONTENT: ", capsule.content);

  const initialDate = capsule.unlockAt
    ? new Date(capsule.unlockAt).toISOString().slice(0, 10)
    : "";

  const [recipients, setRecipients] = useState<{ email: string }[]>(
    capsule.recipients || [],
  );

  const addRecipient = () => {
    setRecipients([...recipients, { email: "" }]);
  };

  const updateRecipient = (index: number, email: string) => {
    const copy = [...recipients];
    copy[index].email = email;
    setRecipients(copy);
  };

  const removeRecipient = (index: number) => {
    const copy = [...recipients];
    copy.splice(index, 1);
    setRecipients(copy);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <Link
          href={`/capsules/${capsule.id}`}
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium mb-4 transition-colors"
        >
          ← Back to Capsule
        </Link>
        <h1 className="text-3xl font-extrabold text-white">
          Edit Time Capsule
        </h1>
        <p className="text-slate-400 mt-2">
          Modify the details of your capsule before it unlocks.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="capsuleId" value={capsule.id} />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Capsule Title
            </label>
            <input
              name="title"
              defaultValue={capsule.title}
              placeholder="A message to my future self..."
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
              Content / Message
            </label>
            <textarea
              name="content"
              defaultValue={capsule.content || ""}
              placeholder="Write whatever you want to preserve..."
              className="input-field min-h-[200px] resize-y"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">
                Unlock Date & Time
              </label>
              <input
                name="unlockAt"
                type="date"
                defaultValue={initialDate}
                className="input-field [color-scheme:dark]"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="relative flex items-center gap-3 cursor-pointer group p-4 border border-slate-700/50 rounded-xl bg-slate-800/30 w-full hover:border-indigo-500/50 transition-colors">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isPublic"
                    defaultChecked={capsule.isPublic}
                    className="peer sr-only"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    Public Capsule
                  </span>
                  <span className="text-xs text-slate-500">
                    Anyone with the link can view when unlocked
                  </span>
                </div>
              </label>
            </div>
          </div>

          <input
            type="hidden"
            name="initialRecipients"
            value={JSON.stringify(capsule.recipients || [])}
          />
          <input
            type="hidden"
            name="recipients"
            value={JSON.stringify(recipients)}
          />

          <div className="pt-6 border-t border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">Recipients</h3>
                <p className="text-sm text-slate-400">
                  People who will be notified when this unlocks.
                </p>
              </div>
              <button
                type="button"
                onClick={addRecipient}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors border border-indigo-500/20"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Email
              </button>
            </div>

            {recipients.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-slate-700/50 rounded-xl text-slate-500 text-sm">
                No recipients added yet. It will only be visible to you unless
                it's public.
              </div>
            ) : (
              <div className="space-y-3">
                {recipients.map((recipient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        required
                        value={recipient.email}
                        onChange={(e) => updateRecipient(index, e.target.value)}
                        placeholder="friend@example.com"
                        className="input-field pl-10"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRecipient(index)}
                      className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors shrink-0"
                      title="Remove recipient"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state?.error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-start gap-3">
              <svg
                className="w-5 h-5 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {state.error}
            </div>
          )}

          <div className="pt-4">
            <button disabled={pending} className="btn-primary py-4 text-lg">
              {pending ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating capsule...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
