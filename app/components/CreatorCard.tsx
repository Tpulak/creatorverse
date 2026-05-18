import { Link } from "react-router";

type CreatorCardProps = {
  id?: number | string;
  name: string;
  url: string;
  description: string;
  imageURL?: string;
};

export function CreatorCard({
  id,
  name,
  url,
  description,
  imageURL,
}: CreatorCardProps) {
  const hasId = id !== undefined && id !== null && id !== "";

  return (
    <article className="flex h-full flex-col rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-800">
      {imageURL ? (
        <img
          src={imageURL}
          alt={name}
          className="mb-3 h-40 w-full rounded-md object-cover"
        />
      ) : (
        <div className="mb-3 flex h-40 w-full items-center justify-center rounded-md bg-gray-100 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          No image
        </div>
      )}

      <h2 className="text-xl font-semibold">
        {hasId ? (
          <Link to={`/creator/${id}`} className="hover:underline">
            {name}
          </Link>
        ) : (
          name
        )}
      </h2>

      <p className="mt-2 flex-1 text-gray-600 dark:text-gray-400">{description}</p>

      <p className="mt-3 text-sm">
        <span className="font-medium">URL: </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="break-all text-blue-600 hover:underline dark:text-blue-400"
        >
          {url}
        </a>
      </p>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
        {hasId ? (
          <>
            <Link
              to={`/creator/${id}`}
              className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              View
            </Link>
            <Link
              to={`/creator/${id}/edit`}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              Edit
            </Link>
          </>
        ) : (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            Missing id — ensure your Supabase table has an id column.
          </p>
        )}
      </div>
    </article>
  );
}
