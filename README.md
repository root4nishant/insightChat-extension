# 🧩 InsightChat Chrome Extension

A Chrome Extension that enables real-time message extraction from WhatsApp Web and sends chat content securely to an LLM backend for processing.

---

## 🔗 Project Overview

This extension is part of the **InsightChat** SaaS ecosystem. It works by injecting a content script into WhatsApp Web to scrape visible chat messages, store user session info, and transmit data to the backend for AI processing.

---

## Features

- Injects script into WhatsApp Web
- Scrapes visible messages from the DOM
- Stores and passes **Clerk sessionID**
- Sends payload securely to `/process_chat` endpoint
- Supports both manual trigger and automatic capture

## Contribution to InsightChat

- This extension is a key part of the InsightChat platform by:
- Extracting raw chat content directly from WhatsApp Web DOM
- Acting as a bridge between the user’s browser and the AI backend
- Serving as the real-time entry point for intelligent message analysis


```bash
    "permissions": ["storage", "scripting", "activeTab", "tabs"]
