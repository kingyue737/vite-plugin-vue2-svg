import { readFileSync } from "fs";
import { optimize, type Config } from "svgo";
import { compileTemplate } from "@vue/compiler-sfc";
import type { Plugin } from "vite";

export function createSvgPlugin(
  options: {
    svgoConfig?: Config;
    svgo?: boolean;
    defaultImport?: "url" | "raw";
  } = {},
): Plugin {
  const { svgoConfig, svgo, defaultImport } = options;
  const svgRegex = /\.svg(\?(raw|component|skipsvgo))?$/;

  return {
    name: "vite-plugin-vue2-svg",
    enforce: "pre",
    async load(id: string) {
      if (!id.match(svgRegex)) {
        return;
      }

      const [path, query] = id.split("?", 2);
      const importType = query || defaultImport;
      if (/\?raw/.test(id)) {
        return null;
      }
      if (importType === "url") {
        return; // Use default svg loader
      }

      let svg: string;

      try {
        svg = readFileSync(path, { encoding: "utf-8" });
      } catch (e) {
        console.warn(
          "\n",
          `${id} couldn't be loaded by vite-plugin-vue2-svg, fallback to default loader`,
        );
        return;
      }

      if (importType === "raw") {
        return `export default ${JSON.stringify(svg)}`;
      }

      if (svgo !== false && query !== "skipsvgo") {
        svg = optimize(svg, {
          ...svgoConfig,
          path,
        }).data;
      }

      svg = svg.replace("<svg", '<svg v-on="$listeners"');

      const { code } = compileTemplate({
        source: svg,
        filename: path,
        transformAssetUrls: false,
      });

      return `${code}\nexport default { render: render }`;
    },
  };
}
