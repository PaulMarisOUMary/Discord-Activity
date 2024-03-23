# Client

## Development

**Command**: `npm run dev`

**Use case**: You're developing or debugging on <ins>localhost:8080</ins> or <ins>localhost:5173</ins>.

- Develop the application in your browser with mocked data inside the Discord SDK.

**Use case**: You are developing or debugging inside a Discord <ins>voice channel</ins>.

- Test and develop directly within a Discord voice channel.

## Components with SHADCN UI

Component library used: [ui.shadcn](https://ui.shadcn.com/docs).

To add a new ui.shadcn component in the project, execute the following command:
```bash
npx shadcn-ui@latest add ${component}
```
Replace `${component}` with the desired component you wish to add, such as "button", or any other component provided by ui.shadcn.