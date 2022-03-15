import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import {
  getPostBySlug,
  getPostsByTag,
  getPostTags,
  replaceMdwithTxt,
  readYaml,
} from "lib/api";
import { PageMetaProps, SiteInfo } from "lib/interface";
import { ogpHost } from "lib/constant";
import MyHead from "components/MyHead";
import BlogHeader from "components/BlogHeader";
import Tiling from "components/Tiling";
import ArticleMenu from "components/ArticleMenu";
import Styles from "styles/[tag].module.scss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const tags: string[] = getPostTags("grad_essay");

  return {
    paths: tags.map((post) => {
      return {
        params: {
          tag: post,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag: string }>
) => {
  const { params } = context;
  const tag = params?.tag ?? "";
  const taggedposts: string[] = getPostsByTag(tag, "grad_essay");
  const sitename: SiteInfo = readYaml("meta.yaml");

  const allPostsPre = taggedposts.map((slug) => {
    return getPostBySlug(
      slug,
      ["slug", "title", "date", "tags", "content"],
      "grad_essay"
    );
  });

  const allPosts = await Promise.all(
    allPostsPre.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const metaprops: PageMetaProps = {
    title: `タグ: #${tag}の卒業文集`,
    sitename: sitename.siteinfo.grad_essay.title,
    description: `タグ: #${tag}を付与されたセクションの一覧`,
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=タグ: %23${tag}の卒業文集`),
    pageRelPath: `grad_essay/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: { allPosts, params, metaprops, sitename },
  };
};

const TaggedPosts: NextPage<Props> = ({
  allPosts,
  params,
  metaprops,
  sitename,
}) => {
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <BlogHeader {...sitename} />
      <main>
        <ArticleMenu
          contentType={"grad_essay"}
          tabs={[
            {
              name: `#${params?.tag}`,
              link: `tag/${params?.tag}`,
            },
          ]}
          focus={0}
        />
        <Tiling allPosts={allPosts} contentTop="grad_essay" />
      </main>
      <footer></footer>
    </div>
  );
};

export default TaggedPosts;
