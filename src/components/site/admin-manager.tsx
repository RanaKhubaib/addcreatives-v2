"use client";

import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { firebaseDb } from "@/lib/firebase";

type ContentKind = "post" | "caseStudy";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  client: string;
  content: string;
  date: string;
  industry: string;
  services: string;
  result: string;
  published: boolean;
}

const emptyItem: ContentItem = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  client: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  industry: "",
  services: "",
  result: "",
  published: true,
};

const collections: Record<ContentKind, string> = {
  post: "posts",
  caseStudy: "caseStudies",
};

async function fetchItems(kind: ContentKind) {
  if (!firebaseDb) return [];
  const snapshot = await getDocs(collection(firebaseDb, collections[kind]));
  return snapshot.docs.map((entry) => {
    const data = entry.data();
    const sections = Array.isArray(data.sections) ? data.sections : [];
    return {
      id: entry.id,
      title: typeof data.title === "string" ? data.title : "",
      slug: typeof data.slug === "string" ? data.slug : entry.id,
      excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
      category: typeof data.category === "string" ? data.category : "",
      client: typeof data.client === "string" ? data.client : "",
      content:
        sections
          .map((section) =>
            section && typeof section.body === "string" ? section.body : "",
          )
          .filter(Boolean)
          .join("\n\n") || "",
      date: typeof data.date === "string" ? data.date : "",
      industry: typeof data.industry === "string" ? data.industry : "",
      services: Array.isArray(data.services) ? data.services.join(", ") : "",
      result: typeof data.result === "string" ? data.result : "",
      published: data.published === true,
    };
  });
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function AdminManager() {
  const [kind, setKind] = useState<ContentKind>("post");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [form, setForm] = useState<ContentItem>(emptyItem);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(Boolean(firebaseDb));
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!firebaseDb) return;
    let active = true;
    fetchItems(kind)
      .then((content) => {
        if (active) setItems(content);
      })
      .catch((error: unknown) => {
        console.error("Could not load admin content:", error);
        if (active) {
          setNotice("We couldn't load content. Check your Firestore rules and connection.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [kind]);

  async function loadItems() {
    if (!firebaseDb) return;
    setLoading(true);
    try {
      setItems(await fetchItems(kind));
    } catch (error) {
      console.error("Could not refresh admin content:", error);
      setNotice("We couldn't refresh content. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  function startNew() {
    setForm({ ...emptyItem, date: new Date().toISOString().slice(0, 10) });
    setIsEditing(false);
    setNotice("");
  }

  function editItem(item: ContentItem) {
    setForm(item);
    setIsEditing(true);
    setNotice("");
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firebaseDb) return;

    const slug = toSlug(form.slug || form.title);
    if (!slug) {
      setNotice("Add a title to create a content URL.");
      return;
    }

    setSaving(true);
    setNotice("");
    const collectionName = collections[kind];
    const entry = {
      slug,
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      category: form.category.trim(),
      date: form.date || new Date().toISOString().slice(0, 10),
      readTime: "5 min read",
      coverStyle: "from-[#102b56] via-[#2761a8] to-[#a4c7f5]",
      sections: [{ heading: "Overview", body: form.content.trim() }],
      published: true,
      ...(kind === "caseStudy"
        ? {
            client: form.client.trim(),
            industry: form.industry.trim(),
            services: form.services
              .split(",")
              .map((service) => service.trim())
              .filter(Boolean),
            result: form.result.trim(),
            isSample: false,
          }
        : {}),
    };

    try {
      await setDoc(doc(firebaseDb, collectionName, slug), {
        ...entry,
        published: form.published,
      }, { merge: true });
      if (form.id && form.id !== slug) {
        await deleteDoc(doc(firebaseDb, collectionName, form.id));
      }
      setNotice(
        form.published
          ? "Content saved. It will appear on the public site shortly."
          : "Draft saved. It will stay hidden from the public site.",
      );
      setForm(emptyItem);
      setIsEditing(false);
      await loadItems();
    } catch (error) {
      console.error("Could not save admin content:", error);
      setNotice("We couldn't save this content. Check your admin access and Firestore rules.");
    } finally {
      setSaving(false);
    }
  }

  async function removeItem(item: ContentItem) {
    if (!firebaseDb || !window.confirm(`Delete "${item.title}"? This cannot be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(firebaseDb, collections[kind], item.id));
      setNotice("Content deleted.");
      if (form.id === item.id) startNew();
      await loadItems();
    } catch (error) {
      console.error("Could not delete admin content:", error);
      setNotice("We couldn't delete this item. Check your admin access and Firestore rules.");
    }
  }

  if (!firebaseDb) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        Firebase is not configured. Add the Firebase web app values to{" "}
        <code>.env.local</code>, then enable Firestore and set up the security
        rules in <code>firestore.rules</code>.
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-full bg-soft p-1">
            {(["post", "caseStudy"] as const).map((nextKind) => (
              <button
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  kind === nextKind
                    ? "bg-navy text-white"
                    : "text-slate-600 hover:text-navy"
                }`}
                key={nextKind}
                onClick={() => {
                  if (nextKind !== kind) {
                    setLoading(Boolean(firebaseDb));
                    setKind(nextKind);
                    startNew();
                  }
                }}
                type="button"
              >
                {nextKind === "post" ? "Blog posts" : "Case studies"}
              </button>
            ))}
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-xs font-bold text-white"
            onClick={startNew}
            type="button"
          >
            <Plus aria-hidden="true" size={15} /> New
          </button>
        </div>
        <div className="mt-5 space-y-2">
          {loading ? (
            <p className="rounded-xl bg-soft p-4 text-sm text-slate-500">
              Loading content…
            </p>
          ) : items.length ? (
            items.map((item) => (
              <div
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
                key={item.id}
              >
                <button
                  className="min-w-0 flex-1 text-left"
                  onClick={() => editItem(item)}
                  type="button"
                >
                  <span className="block truncate text-sm font-bold text-ink">
                    {item.title || "Untitled"}
                  </span>
                  <span className="mt-1 block truncate text-xs text-slate-500">
                    /{item.slug}
                  </span>
                </button>
                <button
                  aria-label={`Delete ${item.title}`}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  onClick={() => void removeItem(item)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 p-5 text-sm leading-6 text-slate-500">
              No published content in this collection yet. Add a first item
              using the editor.
            </p>
          )}
        </div>
      </section>

      <form
        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        onSubmit={handleSave}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
              {isEditing ? "Edit content" : "Create content"}
            </p>
            <h2 className="mt-2 font-display text-xl font-extrabold text-ink">
              {kind === "post" ? "Blog article" : "Case study"}
            </h2>
          </div>
          {isEditing ? (
            <button
              aria-label="Clear editor"
              className="rounded-full p-2 text-slate-400 hover:bg-soft"
              onClick={startNew}
              type="button"
            >
              <X aria-hidden="true" size={17} />
            </button>
          ) : null}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <EditorField
            label="Title"
            onChange={(title) =>
              setForm((current) => ({ ...current, title, slug: toSlug(title) }))
            }
            required
            value={form.title}
          />
          <EditorField
            label="Slug"
            onChange={(slug) => setForm((current) => ({ ...current, slug }))}
            required
            value={form.slug}
          />
          <EditorField
            label="Category"
            onChange={(category) => setForm((current) => ({ ...current, category }))}
            required
            value={form.category}
          />
          <EditorField
            label="Date"
            onChange={(date) => setForm((current) => ({ ...current, date }))}
            type="date"
            value={form.date}
          />
          {kind === "caseStudy" ? (
            <>
              <EditorField
                label="Client name"
                onChange={(client) => setForm((current) => ({ ...current, client }))}
                required
                value={form.client}
              />
              <EditorField
                label="Industry"
                onChange={(industry) => setForm((current) => ({ ...current, industry }))}
                required
                value={form.industry}
              />
              <EditorField
                label="Services (comma separated)"
                onChange={(services) => setForm((current) => ({ ...current, services }))}
                value={form.services}
              />
              <div className="sm:col-span-2">
                <EditorField
                  label="Outcome summary"
                  onChange={(result) => setForm((current) => ({ ...current, result }))}
                  value={form.result}
                />
              </div>
            </>
          ) : null}
          <div className="sm:col-span-2">
            <EditorField
              label="Short introduction"
              onChange={(excerpt) => setForm((current) => ({ ...current, excerpt }))}
              required
              value={form.excerpt}
            />
          </div>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs font-bold text-ink">
              Main content
            </span>
            <textarea
              className="min-h-44 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
              onChange={(event) =>
                setForm((current) => ({ ...current, content: event.target.value }))
              }
              required
              value={form.content}
            />
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 sm:col-span-2">
            <input
              checked={form.published}
              className="h-4 w-4 accent-brand-blue"
              onChange={(event) =>
                setForm((current) => ({ ...current, published: event.target.checked }))
              }
              type="checkbox"
            />
            Publish this content on the public website
          </label>
        </div>
        {notice ? (
          <p aria-live="polite" className="mt-4 rounded-xl bg-soft p-3 text-sm text-slate-700" role="status">
            {notice}
          </p>
        ) : null}
        <button
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy disabled:opacity-60"
          disabled={saving}
          type="submit"
        >
          <Save aria-hidden="true" size={16} />
          {saving
            ? "Saving…"
            : form.published
              ? "Save and publish"
              : "Save draft"}
        </button>
      </form>
    </div>
  );
}

function EditorField({
  label,
  onChange,
  required = false,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-ink">{label}</span>
      <input
        className="min-h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}
