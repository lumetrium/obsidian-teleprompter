import { FuzzySuggestModal } from 'obsidian'

interface FileSelectModalData {
  label: string
  path: string
}

export class ObsidianFileSelectModal extends FuzzySuggestModal<FileSelectModalData> {
  async prompt(): Promise<string> {
    this.open()
    return new Promise((r) => (this.onChooseItem = ({ path }) => r(path)))
  }

  getItems(): FileSelectModalData[] {
    const staticItems: FileSelectModalData[] = []

    staticItems.push({
      label: "<Don't specify a file>",
      path: undefined,
    })

    const file = this.app.workspace.getActiveFile()
    if (file) {
      staticItems.push({ label: '<Current file>', path: file.path })
    }

    return [
      ...staticItems,
      ...this.app.vault.getMarkdownFiles().map((e) => {
        return { label: e.path, path: e.path }
      }),
    ]
  }

  getItemText(item: FileSelectModalData): string {
    return item.label
  }

  onChooseItem(
    item: FileSelectModalData,
    evt: MouseEvent | KeyboardEvent,
  ): void {}
}
