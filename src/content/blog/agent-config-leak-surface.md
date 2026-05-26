---
title: 'The More Interesting Leak Surface Is AI Agent Config'
description: 'Why helpfulGremlin is narrowing from generic secret scanning toward AI-agent-era local config leaks.'
pubDate: 'May 26 2026'
isProject: false
projectTitle: 'HelpfulGremlin'
projectDescription: 'A tiny CLI guardrail for catching secrets, agent configs, and local credential files before they leave your laptop.'
githubLink: 'https://github.com/uramawat/helpfulGremlin'
liveLink: 'https://pypi.org/project/helpfulgremlin/'
thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&h=675&auto=format&fit=crop'
showDescription: true
tags: ['experimenting','tools','ai','security']
---

When I first built [helpfulGremlin](https://pypi.org/project/helpfulgremlin/), the pitch was simple: run a tiny CLI before pushing code and catch the obvious secrets that should not be in public.

That was useful, but it was also immediately obvious that I was walking into a crowded room. GitHub has [push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection). Mature tools like Gitleaks, TruffleHog, GitGuardian, and detect-secrets already exist. There are also a growing number of small `uvx`-friendly scanners that do roughly the same thing.

So the question became less "can I build a secret scanner?" and more "what is the specific leak surface that feels newly weird because of how I actually build now?"

The answer, for me, is AI-agent config.

#### The local repo is getting stranger

AI-assisted development has changed what ends up near the codebase. It is not just app source files anymore. A working project can now include MCP configs, editor agent settings, generated scripts, copied setup snippets, auth headers from docs, notebook outputs, deployment glue, and half-finished local integrations.

Claude Code, for example, supports project-scoped MCP servers through `.mcp.json`, while Claude Desktop has its own `claude_desktop_config.json` path and behavior. The [Claude Code MCP docs](https://code.claude.com/docs/en/mcp) explicitly describe project-scoped server configuration, and the [Desktop docs](https://code.claude.com/docs/en/desktop) call out that Desktop and Claude Code MCP configs are separate.

That separation is powerful, but it also means there are more places for a tired developer to paste something sensitive.

#### The new helpfulGremlin direction

I do not want helpfulGremlin to become a sprawling security platform. That feels like the wrong game.

The better version is narrower:

> Catch the dumb, expensive mistakes before they leave my laptop.

So the next iteration is defaulting toward agent-aware local scanning. It still looks for the usual API keys, private keys, database URLs, and high-entropy strings, but it now also pays special attention to files like:

* `.mcp.json`
* `mcp.json`
* `.claude/settings.json`
* `.cursor/mcp.json`
* `claude_desktop_config.json`
* `.env`, `.env.local`, `.env.*`
* `.npmrc`, `.pypirc`, `.netrc`
* cloud credential JSON files

For JSON-based agent configs, helpfulGremlin tries to parse the file and inspect values under fields like `mcpServers`, `env`, `headers`, `args`, `command`, and `url`. If it sees a literal token where an environment variable reference should be, it reports that as an agent-config finding.

It also warns when sensitive local config files are present at all. That is intentional. A `.env.local` file full of placeholders is not the same as a leaked production token, but it is still worth pausing on before a push.

#### Why this feels more useful than "more regexes"

The generic secret-scanner market rewards breadth. More providers, more token formats, more validation, more integrations.

That is not where this project is likely to be interesting.

The interesting part is context: a tiny local tool that understands the shapes created by AI-assisted development and gives a developer one more moment to notice something before it becomes permanent.

In the original post, I wrote about building helpfulGremlin quickly with agentic tools. This follow-up is the more honest second step: after shipping the obvious MVP, the useful product shape became clearer.

Not a better Gitleaks.

A small guardrail for the messier local workflows that AI tools are creating.
