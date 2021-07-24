
import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "denon run --allow-net servestDeno.tsx",
      desc: "run my serverDeno.ts file",
    },
  },
};

export default config;