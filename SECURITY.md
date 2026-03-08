# Security

## Reporting vulnerabilities

If you find a security issue, please report it responsibly (e.g. private channel or GitHub Security Advisories). Do not open public issues for security vulnerabilities.

## This project

- **Static website** – No backend or database. No server-side secrets required for the app itself.
- **Environment** – Do not commit `.env` or `.env.local`. Use `.env.example` for documented keys only.
- **Dependencies** – Run `npm audit` and fix critical/high issues. Use `npm run audit:fix` where possible.

## Dependency audit

```bash
npm install
npm audit
npm run audit:fix   # if available
```

Address critical and high severities first.
