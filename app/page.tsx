import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
    {
      "tags": *[_type == 'tag'] {
        name
      },
      "posts": *[_type == 'blog'] | order(_createdAt desc) {
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
        tags[]->{
          name
        }
      }
    }
  `;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const { tags, posts } = await getData();

  console.log(posts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {posts.map((post: any, idx: any) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <div className="mt-3">
              {post.tags.map((tag: any, index: any) => (
                <span key={index} className="inline-block bg-gray-200 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 px-2 py-1 rounded line-clamp-3 mr-2">
                <Link href={`/tag/${tag.name}`}>
                #{tag.name}
                </Link>
            </span>
              ))}
            </div>
            <Button asChild className="w-full mt-3">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
