import type { Route } from "./+types/creator.$id";
import { ViewCreator } from "../pages/ViewCreator";

export function meta({}: Route.MetaArgs) {
  return [{ title: "View Creator | Creatorverse" }];
}

export default function CreatorView() {
  return <ViewCreator />;
}
