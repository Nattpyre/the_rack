import fetch from 'node-fetch';
import runServer from './runServer';
import fs from './lib/fs';
import { host } from '../src/config';

const routes = [
  '/',
  '/404',
];

async function render() {
  let server;
  await new Promise(resolve => (server = runServer(resolve)));

  await routes.reduce((promise, route) => promise.then(async() => {
    const url = `http://${host}${route}`;
    const dir = `build/public${route.replace(/[^\/]*$/, '')}`;
    const name = route.endsWith('/') ? 'index.html' : `${route.match(/[^/]+$/)[0]}.html`;
    const dist = `${dir}${name}`;
    const res = await fetch(url);
    const text = await res.text();
    await fs.makeDir(dir);
    await fs.writeFile(dist, text);
    console.log(`${dist} => ${res.status} ${res.statusText}`);
  }), Promise.resolve());

  server.kill('SIGTERM');
}

export default render;
