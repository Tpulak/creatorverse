import type { Route } from "./+types/creator.$id.edit";
import { EditCreator } from "../pages/EditCreator";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit Creator | Creatorverse" }];
}

export default function CreatorEdit() {
  return <EditCreator />;
}
