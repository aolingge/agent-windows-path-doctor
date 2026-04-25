<p align="center">
  <img src="assets/readme-banner.svg" alt="Agent Windows Path Doctor banner" width="100%">
</p>

<h1 align="center">Agent Windows Path Doctor</h1>

<p align="center">Check AI-agent task files for Windows path, WSL path, quoting, and cross-platform command risks.</p>

<p align="center"><a href="README.zh-CN.md">中文</a> · <a href="#quick-start">Quick Start</a> · <a href="#checks">Checks</a> · <a href="#ci-usage">CI</a></p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/node-%3E%3D18-2563EB">
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-111827">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-16A34A">
</p>

<p align="center">
  <img src="assets/cli-preview.svg" alt="Agent Windows Path Doctor CLI preview" width="88%">
</p>

## Why This Exists

AI-agent workflows keep growing, but many repositories still miss tiny local checks that are easy to repeat in CI. This tool stays zero-dependency, mirror-friendly, and easy to fork.

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
