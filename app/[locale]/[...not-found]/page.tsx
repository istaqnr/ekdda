import { notFound } from "next/navigation";

export default async function CatchAllNotFound() {
   // This will trigger the not-found.tsx file
   notFound();
}
