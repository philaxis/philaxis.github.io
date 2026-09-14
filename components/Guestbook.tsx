"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Entry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const loadEntries = useCallback(async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("id,name,message,created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) setStatus("Could not load the guestbook. Please try again later.");
    else setEntries(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !message) return setStatus("Please fill in both fields.");

    setSubmitting(true);
    setStatus("");
    const { error } = await supabase.from("guestbook").insert({ name, message });

    if (error) setStatus("Your note could not be saved. Please try again.");
    else {
      form.reset();
      setStatus("Thanks — your note is here.");
      await loadEntries();
    }
    setSubmitting(false);
  }

  return (
    <section className="guestbook" id="guestbook" aria-labelledby="guestbook-title">
      <div className="guestbook-heading">
        <div>
          <p className="eyebrow">Guestbook</p>
          <h2 id="guestbook-title">Leave a note.</h2>
        </div>
        <p>Found something useful, or just passing through? Say hi.</p>
      </div>

      <form onSubmit={submit}>
        <label>
          Name
          <input name="name" maxLength={40} autoComplete="name" required />
        </label>
        <label>
          Message
          <textarea name="message" maxLength={300} rows={3} required />
        </label>
        <div className="form-end">
          <p role="status" aria-live="polite">{status}</p>
          <button disabled={submitting}>{submitting ? "Sending…" : "Add note ↗"}</button>
        </div>
      </form>

      <div className="notes" aria-label="Guestbook entries">
        {loading ? (
          <p className="empty">Loading notes…</p>
        ) : entries.length === 0 ? (
          <p className="empty">Be the first to leave a note.</p>
        ) : entries.map((entry) => (
          <article key={entry.id}>
            <div>
              <strong>{entry.name}</strong>
              <time dateTime={entry.created_at}>
                {new Date(entry.created_at).toLocaleDateString("en", { month: "short", day: "numeric" })}
              </time>
            </div>
            <p>{entry.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
