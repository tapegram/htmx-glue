// @ts-ignore
import { enter, leave } from "el-transition";

function create(node: Element) {
  return {
    enter: () => enter(node),
    leave: () => leave(node),
  };
}

export default {
  create,
}
