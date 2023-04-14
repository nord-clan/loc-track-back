loc-track-back

> <a href="">Тестовый стенд</a>

<br />

### Briefly

```ts
---------------------------------------
✨ default server listening on the port 8080

🌱 GraphQL playground
http://localhost:8080/graphql

🌱 Rest endpoints
http://localhost:8080/api
GET /health
GET /user
GET /user/:id
GET /node
GET /node/:layerId
GET /layer
GET /layer/:officeId
---------------------------------------
```

#### Startup

```ts
1. setup node (18.16.0)
- nvm use

2. start develop
-  pnpm dev

3. helpers
-  pnpm lint
-  pnpm format

4. build
-  pnpm buid
-  pnpm start
```

#### Utilities

<details>
  <summary><a href="https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode">Volar Takeover Mode</a></summary>

```ts
1. In your project workspace, bring up the command palette with `Ctrl + Shift + P (macOS: Cmd + Shift + P)`.
2. Type built and select `Extensions: Show Built-in Extensions`.
3. Type typescript in the extension search box (do not remove `@builtin` prefix).
4. Click the little gear icon of `TypeScript and JavaScript Language Features`, and select `Disable (Workspace)`.
5. Reload the workspace. Takeover mode will be enabled when you open a Vue or TS file.
```

</details>

<details>
  <summary><a href="https://www.npmjs.com/package/pnpm">PNPM</a></summary>

On macOS, Linux, or Windows Subsystem for Linux:

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

On Windows (using PowerShell):

```shell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

На Alpine Linux

```shell
wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm
```

Using npm:

```shell
npx pnpm add -g pnpm
```

(По желанию) pnpm использует форматы npm конфигурации. Следовательно, вы должны задавать конфигурации так же, как и для npm:

```shell
pnpm config set store-dir /path/to/.pnpm-store
```

</details>

<details>
  <summary><a href="https://github.com/nvm-sh/nvm">NVM</a></summary>

Установка Linux

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Установка Windows

```shell
https://github.com/coreybutler/nvm-windows/releases
```

После установки nvm

```shell
nvm use
```

</details>
