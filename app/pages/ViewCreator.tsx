import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { supabase } from "../client.js";
import type { Creator } from "../types/creator";

export function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

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
    <main className="container mx-auto max-w-2xl p-4 pt-8">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="mb-6 h-64 w-full rounded-lg object-cover"
        />
      )}
      <h1 className="text-3xl font-bold">{creator.name}</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        {creator.description}
      </p>
      <a
        href={creator.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
      >
        {creator.url}
      </a>

      <div className="mt-8 flex gap-4">
        <Link
          to={`/creator/${creator.id}/edit`}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
        >
          Edit
        </Link>
        <Link to="/" className="px-4 py-2 text-sm font-medium hover:underline">
          Back to all creators
        </Link>
      </div>
    </main>
  );
}
