import { Id } from "../../../../convex/_generated/dataModel";
import Client from "./client";
export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <Client slug={slug as Id<"email">} />;
}
