const path = require("path"),
    HtmlWebPackPlugin = require("html-webpack-plugin"),
    webpack = require("webpack"),
    plugins = [
        // To strip all locales except “en”
        new HtmlWebPackPlugin({
            template: "index.template.html",
            filename: "index.html"
        })
    ],
    isProd = process.env.NODE_ENV === "production";
if (!isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "inline-source-map",
    entry: isProd ? ["./main.tsx"] : ["./main.tsx", "webpack-hot-middleware/client?reload=true"],
    context: path.join(__dirname, "src/frontend"),
    output: {
        path: path.join(__dirname, "dist-react/"),
        publicPath: "/ui/",
        filename: "bundle-[chunkhash].js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.svg$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: plugins
};