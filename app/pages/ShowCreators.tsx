import { useEffect, useState } from "react";
import { Link } from "react-router";

import { CreatorCard } from "../components/CreatorCard";
import { supabase } from "../client.js";
import type { Creator } from "../types/creator";

export function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCreators = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("id, name, url, description, imageURL");

      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data ?? []);
      }

      setLoading(false);
    };

    getCreators();
  }, []);

  return (
    <main className="container mx-auto p-4 pt-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Creatorverse</h1>
        <Link
          to="/add"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Add Creator
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading creators...</p>
      ) : creators.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No content creators yet. Add your first creator to get started.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id ?? creator.name}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))}
        </div>
      )}
    </main>
  );
}
