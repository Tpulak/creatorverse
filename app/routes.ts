import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("add", "routes/add.tsx"),
  route("creator/:id", "routes/creator.$id.tsx"),
  route("creator/:id/edit", "routes/creator.$id.edit.tsx"),
] satisfies RouteConfig;
