# Client

## Development

### Development Mode

During development, **by default**, executing `npm run dev` excludes all functionalities related to the Discord SDK to ensure the seamless rendering of the application.

This exclusion is useful when you're developing locally and need to tweak things and aspects of the application that aren't connected to the Discord SDK.

To develop the application while using the Discord SDK, you need to execute `npm run dev:sdk`.

> [!WARNING]
> Running this command set the `NODE_ENV` to `production`.
> See [Vite documentation](https://vitejs.dev/guide/env-and-mode).

### Components with SHADCN UI

I am using [ui.shadcn](https://ui.shadcn.com/docs).

To add a new ui.shadcn component in the project, execute the following command:
```bash
npx shadcn-ui@latest add ${component}
```
Replace `${component}` with the desired component you wish to add, such as "button", or any other component provided by ui.shadcn.