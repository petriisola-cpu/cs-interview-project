"use client";

import { jsonToHTML } from '@contentstack/utils'
import DOMPurify from "dompurify";
import Image from "next/image";
import { getPage, initLivePreview } from "@/lib/contentstack";
import { useEffect, useState } from "react";
import { Page } from "@/lib/types";
import ContentstackLivePreview, {
  VB_EmptyBlockParentClass,
} from "@contentstack/live-preview-utils";

/**
 * The `Home` component is the main page component for the application.
 * It fetches and displays content from Contentstack, including the page title,
 * description, image, rich text, and blocks.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * This component uses the `useState` and `useEffect` hooks to manage state and side effects.
 * It initializes live preview functionality and listens for entry changes to update the content.
 */
export default function Home() {
  const [page, setPage] = useState<Page>();

  const getContent = async () => {
    const page = await getPage("/");
    setPage(page);
  };

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, []);

  return (
    <main className="max-w-(--breakpoint-md) mx-auto px-4">
      <section>
        {page?.title ? (
          <h1
            className="text-4xl font-bold mb-4 text-center"
            {...(page?.$ && page?.$.title)}
          >
            {page?.title}
          </h1>
        ) : null}
        
        {page?.author ? (
          <h2
            className="text-2xl font-bold mb-4 text-center"
            {...(page?.$ && page?.$.author)}
          >
            {page?.author}
          </h2>
         ) : null}
         
        {page?.description ? (
          <p className="mb-4 text-center" {...(page?.$ && page?.$.description)}>
            {page?.description}
          </p>
        ) : null}

        {page?.image ? (
          <Image
            className="mb-4"
            width={768}
            height={414}
            src={page?.image.url}
            alt={page?.image.title}
            {...(page?.image?.$ && page?.image?.$.url)}
          />
        ) : null}

        {page?.rich_text ? (
          <div
            {...(page?.$ && page?.$.rich_text)}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(page?.rich_text),
            }}
          />
        ) : null} 

        <div
          className={`space-y-8 max-w-full mt-4 ${
            !page?.blocks || page.blocks.length === 0
              ? VB_EmptyBlockParentClass
              : ""
          }`}
          {...(page?.$ && page?.$.blocks)}
        >
          {page?.blocks?.map((item, index) => {
            const { block } = item;
            const isImageLeft = block.layout === "image_left";

            return (
              <div
                key={block._metadata.uid}
                {...(page?.$ && page?.$[`blocks__${index}`])}
                className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  {block.image ? (
                    <Image
                      key={`image-${block._metadata.uid}`}
                      src={block.image.url}
                      alt={block.image.title}
                      width={200}
                      height={112}
                      className="w-full"
                      {...(block?.$ && block?.$.image)}
                    />
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 p-4">
                  {block.title ? (
                    <h2
                      className="text-2xl font-bold"
                      {...(block?.$ && block?.$.title)}
                    >
                      {block.title}
                    </h2>
                  ) : null}
                  {block.copy ? (
                    <div
                      {...(block?.$ && block?.$.copy)}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(block.copy),
                      }}
                      className="prose"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        {/* {page?.json_rte && console.log("JSON RTE data:", page.json_rte)} */}
        {/* JSON Rich Text Editor content */}
        {/* {page?.json_rte && page.json_rte.children ? (
          <div
            className="mt-8 prose prose-lg max-w-none"
            {...(page?.$ && page?.$.json_rte)}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(jsonToHTML(page.json_rte)),
            }}
          />
        ) : null} */}
      </section>
    </main>
  );
}