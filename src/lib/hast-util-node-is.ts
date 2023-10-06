import type {
  MdxJsxAttribute,
  MdxJsxFlowElementHast,
} from "mdast-util-mdx-jsx";

function isObject(node: unknown): node is { [key: string]: unknown } {
  return typeof node === "object" && node !== null;
}

export function isMdxJsxFlowElement(
  node: unknown,
): node is MdxJsxFlowElementHast {
  return isObject(node) && node.type === "mdxJsxFlowElement";
}

export function isMdxJsxAttribute(node: unknown): node is MdxJsxAttribute {
  return isObject(node) && node.type === "mdxJsxAttribute";
}