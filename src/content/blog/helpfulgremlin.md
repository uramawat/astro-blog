---
title: 'Ideation to Launch at Warpspeed'
description: 'Trying to vibe safely before you git push'
pubDate: 'Jan 29 2026'
showDescription: true
tags: ['experimenting','tools','ai']
---

This title doesn't really stand out if you're in tech. In this _all gas, no brakes_ phase, it's very easy to not being cognizant of if things are falling through the cracks.

With the [recent](https://github.com/moltbot/moltbot) [storeis](https://www.theregister.com/2026/01/27/clawdbot_moltbot_security_concerns/) about ~~ClawdBot~~ MoltBot, a very clear pattern has emerged - moving so fast comes with some apparent risks where tokens and credentials are left out in the wild. And that got the wheels churing in my head..

#### Problem Definition

* A clear and intuitive way to get confidence that the code being pushed to a repository won't leak anything that shouldn't be out in the world. Think API keys, tokens, etc.

#### Key Requirements

* Should work with [uv](https://docs.astral.sh/uv/)
* Ease of use in terms of instantiating the tool
* Provide helpful descriptions for identitified issues
* Distribute this package via pypi so it can be used by anybody. [`helpfulGremlin`](https://pypi.org/project/helpfulgremlin/) available now!

#### Solution

Using Antigravity + Gemini 3 has truly been really impactful for my personal workflows. After a few targeted prompts, I had a MVP up and running in no time.

> I would be remiss if I dind't shout out to Claude, which I use very religiously at work. It's fun to evaluate different agentic solutions to see how they're both unique.


* `main.py`
 -- (The Conductor): The CLI entry point built with Typer and Rich. It orchestrates the entire process—spinning up a process pool to scan files in parallel, displaying a real-time progress bar, and rendering the final report table with remediation advice.

* `scanner.py`
 -- (The Navigator): Responsible for efficiently traversing the file system. It handles the gritty work of parsing 

* `detector.py`
 --(The Brain): The core detection engine. It loads regex signatures (specified in the `patterns.yaml` file) and implements a Shannon entropy algorithm to flag high-randomness strings (like generic passwords) that don't match known patterns.

Details of the package on [Github](https://github.com/uramawat/helpfulGremlin) README
