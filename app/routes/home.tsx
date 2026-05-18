import type { Route } from "./+types/home";
import { ShowCreators } from "../pages/ShowCreators";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Creatorverse" },
    { name: "description", content: "Browse content creators" },
  ];
}

export default function Home() {
  return <ShowCreators />;
}
