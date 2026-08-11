/**
 * 准备 GitHub Pages 部署产物。
 *
 * 流程：
 * 1. 复制 gh-pages-template.html → dist/index.html
 * 2. 确保 dist/prototypes/ecommerce-app.js 存在
 * 3. 输出 dist/ 目录即为可部署的静态站点
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

const distDir = path.resolve(workspaceRoot, 'dist');
const templatePath = path.resolve(workspaceRoot, 'scripts/gh-pages-template.html');
const indexPath = path.resolve(distDir, 'index.html');
const bundlePath = path.resolve(distDir, 'prototypes', 'ecommerce-app.js');

// 检查 IIFE bundle 是否存在
if (!fs.existsSync(bundlePath)) {
  console.error(`[gh-pages] 找不到构建产物: ${bundlePath}`);
  console.error('[gh-pages] 请先运行: npm run build');
  process.exit(1);
}

// 复制模板为 index.html
fs.copyFileSync(templatePath, indexPath);
console.log(`[gh-pages] 已生成 ${path.relative(workspaceRoot, indexPath)}`);

// 验证文件
const files = [];
function walk(dir, base = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name), rel);
    } else {
      files.push(rel);
    }
  }
}
walk(distDir);
console.log(`[gh-pages] dist/ 目录包含 ${files.length} 个文件:`);
files.forEach(f => console.log(`  ${f}`));
console.log('[gh-pages] 准备就绪，可部署到 GitHub Pages。');
