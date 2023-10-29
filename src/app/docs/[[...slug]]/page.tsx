import { Button } from "@mui/joy";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ContentRender from "@/components/ContentRender";
import Icon from "@/components/Icon";
import { GITHUB_REPO_LINK } from "@/consts/common";
import { getContentFilePaths, getFilePathFromSlugs, readFileContenxt } from "@/lib/content";
import { markdoc } from "@/markdoc/markdoc";
import { getMetadata } from "@/utils/metadata";
import Navigation, { DocsNavigationDrawer } from "./navigation";

interface Props {
  params: { slug: string[] };
}

const Page = ({ params }: Props) => {
  const filePath = getFilePathFromSlugs("docs", params.slug);
  const content = readFileContenxt(filePath);
  const { frontmatter, transformedContent } = markdoc(content);
  const remoteFilePath = `${GITHUB_REPO_LINK}/blob/main/${filePath}`;

  return (
    <div className="w-full max-w-6xl flex flex-row justify-start items-start sm:px-10 sm:gap-6">
      <div className="hidden sm:block w-56 pt-8 pb-4 shrink-0">
        <Navigation />
      </div>
      <div className="w-full sm:max-w-[calc(100%-16rem)]">
        <div className="block sm:hidden w-full">
          <DocsNavigationDrawer />
        </div>
        <h2 className="w-full text-3xl sm:text-5xl font-medium sm:font-bold mt-4 mb-4">{frontmatter.title}</h2>
        <ContentRender className="lg:!prose-lg" markdocNode={transformedContent} />
        <div className="mt-12">
          <Button size="sm" variant="outlined" color="neutral" startDecorator={<Icon.Edit className="w-4 h-auto" />}>
            <Link href={remoteFilePath} target="_blank">
              Edit this page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const filePath = getFilePathFromSlugs("docs", params.slug);
  const content = readFileContenxt(filePath);
  const { frontmatter } = markdoc(content);
  return getMetadata({
    title: frontmatter.title + " - memos",
    pathname: params.slug?.length > 0 ? `/docs/${params.slug.join("/")}` : "/docs",
  });
};

export const generateStaticParams = () => {
  const filePaths = getContentFilePaths("docs");
  return [
    { slug: [] },
    ...[...filePaths.map((filePath) => filePath.split("/"))].map((contentSlug) => {
      return { slug: contentSlug };
    }),
  ];
};

export default Page;
