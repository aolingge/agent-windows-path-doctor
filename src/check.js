import fs from 'node:fs';
import path from 'node:path';

export const CHECKS = [
  [
    "drive",
    "[A-Z]:\\\\|/mnt/[a-z]/",
    "Mentions Windows or WSL paths."
  ],
  [
    "quotes",
    "\"[^\"]+\"|'[^']+'",
    "Uses quotes around paths with spaces."
  ],
  [
    "shell",
    "powershell|pwsh|cmd|bash|wsl",
    "Names the intended shell."
  ],
  [
    "portable",
    "cross-platform|windows|linux|macos|portable|跨平台",
    "Documents portability expectations."
  ]
];

export function readTarget(target) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    return fs.readdirSync(target, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(entry.path, entry.name))
      .filter((file) => /\.(md|txt|json|ya?ml|log|env|js|ts)$/i.test(file))
      .slice(0, 120)
      .map((file) => `\n--- ${path.relative(target, file)} ---\n${fs.readFileSync(file, 'utf8')}`)
      .join('\n');
  }
  return fs.readFileSync(target, 'utf8');
}

export function redact(text) {
  return text
    .replace(/(ghp_|github_pat_|gitee_[A-Za-z0-9_]*|sk-[A-Za-z0-9_-]{16,})[A-Za-z0-9_\-]*/g, '[REDACTED_TOKEN]')
    .replace(/(token|password|secret|cookie)\s*[:=]\s*[^\s]+/gi, '$1=[REDACTED]');
}

export function checkText(text, target = 'input') {
  const source = redact(text);
  const results = CHECKS.map(([id, pattern, message]) => {
    const passed = new RegExp(pattern, 'i').test(source);
    return { id, passed, message };
  });
  const passed = results.filter((item) => item.passed).length;
  const score = Math.round((passed / results.length) * 100);
  return { tool: 'agent-windows-path-doctor', target, score, passed, total: results.length, results, redacted: source };
}

export function checkFile(target) {
  return checkText(readTarget(target), target);
}

export function formatText(report) {
  const lines = [`Agent Windows Path Doctor score: ${report.score}/100`];
  for (const item of report.results) lines.push(`${item.passed ? 'PASS' : 'WARN'}  ${item.id} - ${item.message}`);
  return lines.join('\n');
}

export function formatMarkdown(report) {
  const rows = report.results.map((item) => `| ${item.id} | ${item.passed ? 'PASS' : 'WARN'} | ${item.message} |`).join('\n');
  return `# Agent Windows Path Doctor Report\n\nScore: **${report.score}/100**\n\n| Check | Status | Message |\n| --- | --- | --- |\n${rows}\n`;
}

export function formatAnnotations(report) {
  return report.results.filter((item) => !item.passed).map((item) => `::warning title=Agent Windows Path Doctor ${item.id}::${item.message}`).join('\n');
}

export function formatSarif(report) {
  return {
    version: '2.1.0',
    runs: [{
      tool: { driver: { name: 'agent-windows-path-doctor', informationUri: 'https://github.com/aolingge/agent-windows-path-doctor', rules: report.results.map((item) => ({ id: item.id, shortDescription: { text: item.message } })) } },
      results: report.results.filter((item) => !item.passed).map((item) => ({ ruleId: item.id, level: 'warning', message: { text: item.message }, locations: [{ physicalLocation: { artifactLocation: { uri: report.target } } }] }))
    }]
  };
}
