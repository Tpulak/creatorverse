import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { supabase } from "../client.js";
import type { Creator } from "../types/creator";

export function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);
      }

      setLoading(false);
    };

    if (id) {
      getCreator();
    }
  }, [id]);

  const updateCreator = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;

    setSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const imageURL = (formData.get("imageURL") as string).trim();

    const updatedCreator = {
      name,
      url,
      description,
      imageURL: imageURL || null,
    };

    const { error } = await supabase
      .from("creators")
      .update(updatedCreator)
      .eq("id", id);

    if (error) {
      console.error("Error updating creator:", error);
      setErrorMessage("Could not save changes. Please try again.");
      setSubmitting(false);
      return;
    }

    navigate("/");
  };

  const deleteCreator = async () => {
    if (!id || !creator) return;

    if (!window.confirm(`Delete ${creator.name}? This cannot be undone.`)) {
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error);
      setErrorMessage("Could not delete creator. Please try again.");
      setSubmitting(false);
      return;
    }

    navigate("/");
  };

  if (loading) {
    return (
      <main className="container mx-auto p-4 pt-8">
        <p className="text-gray-600 dark:text-gray-400">Loading creator...</p>
      </main>
    );
  }

  if (!creator) {
    return (
      <main className="container mx-auto p-4 pt-8">
        <p className="text-gray-600 dark:text-gray-400">Creator not found.</p>
        <Link to="/" className="mt-4 inline-block hover:underline">
          Back to all creators
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-lg p-4 pt-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Creator</h1>

      <form className="space-y-4" onSubmit={updateCreator}>
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            name="name"
            defaultValue={creator.name}
            required
            disabled={submitting}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">URL</span>
          <input
            type="url"
            name="url"
            defaultValue={creator.url}
            required
            disabled={submitting}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Description</span>
          <textarea
            name="description"
            defaultValue={creator.description}
            required
            rows={4}
            disabled={submitting}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Image URL (optional)</span>
          <input
            type="url"
            name="imageURL"
            defaultValue={creator.imageURL ?? ""}
            disabled={submitting}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </label>

        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        )}

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={deleteCreator}
            disabled={submitting}
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            {submitting ? "Deleting..." : "Delete"}
          </button>
          <Link to="/" className="px-4 py-2 text-sm font-medium hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
