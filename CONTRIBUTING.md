# Contributing to Obsidian Teleprompter
Thank you for considering contributing to Obsidian Teleprompter!

## How Can I Contribute?

There are several ways to contribute to this project:

1. **Report Bugs**: If you encounter a bug or issue, please 
[create a new issue](https://github.com/lumetrium/obsidian-teleprompter/issues/new). 
Be sure to provide as much detail as possible, 
including your environment and any steps to reproduce the issue.

2. **Suggest Enhancements**: If you have an idea for an improvement or feature, 
feel free to [start a discussion](https://github.com/lumetrium/obsidian-teleprompter/discussions/new/choose). 
Please check for existing discussions to avoid duplication.

3. **Submit Pull Requests**: If you would like to contribute code, 
please fork this repository, create a new branch, make your changes, 
and submit a pull request. Be sure to include a clear and concise description 
of your changes.

## Getting Started

To get started with contributing, follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your changes: `git checkout -b feature/your-feature-name`.
4. Make your changes and commit them with a descriptive commit message.
5. Push your changes to your fork on GitHub: `git push origin feature/your-feature-name`.
6. Open a pull request to the main repository. Please include a clear title and description of your changes.

## Development

1. Install the dependencies with `yarn install`
2. Start the development server with `yarn dev`
3. In your file manager, navigate to `<vault>/.obsidian/plugins/`
4. Create a symlink to the `obsidian-teleprompter/dist` folder
5. Open Obsidian and enable the plugin in the settings

## Building

```bash
yarn build
```

## Testing

```bash
yarn test:vitest
```

## Releasing
https://docs.obsidian.md/Plugins/Releasing/Release+your+plugin+with+GitHub+Actions
```
git tag -a 1.0.1 -m "1.0.1"
git push origin 1.0.1
```
