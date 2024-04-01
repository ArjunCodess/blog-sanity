import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    apiVersion: "2024-04-01",
    dataset: "production",
    projectId: "e5py1nit",
    useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}