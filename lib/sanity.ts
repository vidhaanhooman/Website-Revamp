import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/* Pulled from .env.local. Defaults to the known HoomanLabs project so dev
   still works if envs aren't set yet. Project ID + dataset are PUBLIC,
   they appear in any Studio URL - safe to commit. */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zqtjnm8g";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01";

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // edge-cached reads; flip to false for write/preview clients
  perspective: "published",
  // SANITY_API_READ_TOKEN is server-only; reads still work without it on a
  // public dataset. Provide it if the dataset is private or you want drafts.
  token: process.env.SANITY_API_READ_TOKEN
});

const builder = imageUrlBuilder(sanity);
export const urlFor = (src: SanityImageSource) => builder.image(src);
