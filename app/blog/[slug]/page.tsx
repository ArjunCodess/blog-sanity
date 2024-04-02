import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
    const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
          publishDate,
          tags[]->{
            name
          }
      }[0]`;

    const data = await client.fetch(query);
    return data;
}

export default async function BlogArticle({
    params,
}: {
    params: { slug: string };
}) {
    const data: fullBlog = await getData(params.slug);

    const PortableTextComponent = {
        types: {
            image: ({ value }: { value: any }) => (
                <Image
                    src={urlFor(value).url()}
                    alt="Image"
                    className="rounded-lg"
                    width={800}
                    height={800}
                />
            ),
        },
    };

    return (
        <div className="mt-8 mb-24">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                    {data?.publishDate}
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
                    {data?.title}
                </span>
                <div className="mt-3 text-center">
                    {data?.tags.map((tag: any, index: any) => (
                        <span key={index} className="inline-block bg-gray-200 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 px-2 py-1 rounded line-clamp-3 mr-2">
                            <Link href={`/tag/${tag.name}`}>
                            #{tag.name}
                            </Link>
                        </span>
                    ))}
                </div>
            </h1>

            <Image
                src={urlFor(data?.titleImage).url()}
                width={800}
                height={800}
                alt="Title Image"
                priority
                className="rounded-lg mt-8 border"
            />

            <hr className="mt-8" />

            <div className="mt-8 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                <PortableText
                    value={data.content}
                    components={PortableTextComponent}
                />
            </div>

            <hr className="mt-8" />
        </div>
    );
}