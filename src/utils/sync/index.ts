import { logError } from "../log"


let flag = (async () => {
})();
export const $sync = async (func: () => Promise<void>) => {
  const oldFunc = flag;
  flag = (async () => {
    try {
      await oldFunc;
      await func();
    } catch (e) {
      logError(e);
    }
  })();
};