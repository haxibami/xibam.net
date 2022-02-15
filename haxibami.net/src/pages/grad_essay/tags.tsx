import { NextPage, InferGetStaticPropsType } from "next";
import { getPostTags } from "lib/api";
import Styles from "styles/Tags.module.scss";
import Link from "next/link";
import BlogHeader from "components/blogheader";
import MyHead, { MetaProps } from "components/myhead";
import { ogpHost } from "lib/ogpprops";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const taglists = getPostTags("grad_essay");

  const metaprops: MetaProps = {
    title: "タグ一覧",
    sitename: "卒業文集",
    description: "タグ別記事",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=タグ一覧`),
    pageRelPath: "grad_essay/tags",
    pagetype: "article",
    twcardtype: "summary",
  };

  return {
    props: { taglists, metaprops },
  };
};

const Tags: NextPage<Props> = ({ taglists, metaprops }) => {
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <BlogHeader />
        <main>
          <h2 className={Styles.BlogMenu}>
            <div>
              <Link href={"/grad_essay"}>
                <a>Articles</a>
              </Link>
            </div>{" "}
            <div className={Styles.CurrentFocus}>
              <Link href={"/grad_essay/tags"}>
                <a>Tags</a>
              </Link>
            </div>
          </h2>
          <ul className={Styles.TagList}>
            {taglists?.map((tag) => (
              <li className={Styles.TagTile} key={tag}>
                <Link href={`/grad_essay/tag/${tag}`}>
                  <a>#{tag}</a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Tags;