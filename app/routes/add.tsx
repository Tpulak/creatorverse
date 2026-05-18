import type { Route } from "./+types/add";
import { AddCreator } from "../pages/AddCreator";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Creator | Creatorverse" }];
}

export default function Add() {
  return <AddCreator />;
}
