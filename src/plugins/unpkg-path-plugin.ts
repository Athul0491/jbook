import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      }); //path to index.js ==> case 1

      // Handle relative paths on a 'module'
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      }); // relative path ==> case 2

      //  Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console.log("onResolve", args);
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        }; // main file of a module
      }); //onresolve is called whenever esbuild is trying to figure out a path to a particular module
    },
  };
};
