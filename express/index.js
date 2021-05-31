const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");

const app = express();

const example = {
	template: `
    <div>
      Hello World
    </div>`,
};
function renderVueApp(req, res) {
	const vueApp = createSSRApp(example);

	(async () => {
		const html = await renderToString(vueApp);

		res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/vue@next"></script>
          <title>About blank</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
            const example = { template: '<div>Hello World</div>}; 
            Vue.createSSRApp(example).mount('#app', true);
          </script>
        </body>
      </html>
    `);
	})();
}
