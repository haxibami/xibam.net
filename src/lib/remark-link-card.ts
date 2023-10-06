import { visit } from "unist-util-visit";

import { isParent, isBareLink } from "./mdast-util-node-is";

import type { LinkData } from "mdast";
import type { Transformer } from "unified";
import type { Parent } from "unist";

interface LinkcardData extends LinkData {
  hProperties: {
    dataLinkcard: string | boolean;
  };
}

export const remarkLinkcard = function linkcardTrans(): Transformer {
  return (tree) => {
    visit(tree, isBareLink, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) {
        return;
      }

      if (parent.type === "listItem") {
        return;
      }

      const child = node.children[0];

      if (!child.url.startsWith("http")) {
        return;
      }

      const data: LinkcardData = {
        hProperties: {
          dataLinkcard: "true",
        },
      };

      child.data = {
        ...child.data,
        ...data,
      };
    });
  };
};

export default remarkLinkcard;