import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { supabase } from "../client.js";

export function AddCreator() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addCreator = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const imageURL = (formData.get("imageURL") as string).trim();

    const newCreator = {
      name,
      url,
      description,
      ...(imageURL ? { imageURL } : {}),
    };

    const { error } = await supabase.from("creators").insert([newCreator]);

    if (error) {
      console.error("Error adding creator:", error);
      setErrorMessage("Could not add creator. Please try again.");
      setSubmitting(false);
      return;
    }

    navigate("/");
  };

  return (
    <main className="container mx-auto max-w-lg p-4 pt-8">
      <h1 className="mb-6 text-3xl font-bold">Add Creator</h1>

      <form className="space-y-4" onSubmit={addCreator}>
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            name="name"
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
            required
            disabled={submitting}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Description</span>
          <textarea
            name="description"
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
            disabled={submitting}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </label>

        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        )}

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            {submitting ? "Adding..." : "Add Creator"}
          </button>
          <Link to="/" className="px-4 py-2 text-sm font-medium hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
