<p align="center">
  <img src="assets/readme-banner.svg" alt="Agent Windows Path Doctor banner" width="100%">
</p>

<h1 align="center">Agent Windows Path Doctor</h1>

<p align="center">检查 AI Agent 任务里的 Windows 路径、WSL 路径、引号和跨平台命令风险。</p>

<p align="center"><a href="README.md">English</a> · <a href="#quick-start">快速开始</a> · <a href="#checks">检查项</a> · <a href="#ci-usage">CI</a></p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/node-%3E%3D18-2563EB">
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-111827">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-16A34A">
</p>

<p align="center">
  <img src="assets/cli-preview.svg" alt="Agent Windows Path Doctor CLI preview" width="88%">
</p>

## 为什么做这个

AI Agent 工具越来越多，但很多仓库缺少能在本地和 CI 里重复执行的小检查。这个工具保持零依赖、可镜像、可复制，适合学生、独立开发者和开源维护者使用。

## Quick Start

```bash
npx github:aolingge/agent-windows-path-doctor --path task.md
```

```bash
npx github:aolingge/agent-windows-path-doctor --path task.md --markdown > report.md
npx github:aolingge/agent-windows-path-doctor --path task.md --sarif > results.sarif
npx github:aolingge/agent-windows-path-doctor --path task.md --annotations
```

## Checks

| Check | What it looks for |
| --- | --- |
| drive | Mentions Windows or WSL paths. |
| quotes | Uses quotes around paths with spaces. |
| shell | Names the intended shell. |
| portable | Documents portability expectations. |

## CI Usage

See [docs/github-actions.md](docs/github-actions.md) and [docs/quality-gates.md](docs/quality-gates.md).

## Mirrors

- GitHub: https://github.com/aolingge/agent-windows-path-doctor
- Gitee: https://gitee.com/aolingge/agent-windows-path-doctor

## Contributing

Good first PRs: add checks, add fixtures, improve docs, or add GitHub Actions examples.

## License

MIT
