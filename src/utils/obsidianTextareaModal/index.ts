import { Modal, Setting, TextAreaComponent } from 'obsidian'

export class ObsidianTextareaModal extends Modal {
  result: string
  onSubmit: (result: string) => void

  async prompt(): Promise<string> {
    this.open()
    return new Promise(
      (r) =>
        (this.onSubmit = (text) => {
          this.close()
          r(text)
        }),
    )
  }

  onOpen() {
    const { contentEl } = this

    contentEl.createEl('h1', {
      text: 'Content',
      attr: { style: 'margin-top: 0' },
    })

    this.createTextareaField(
      contentEl,
      'Paste your text here...\nPress Enter to submit.',
    )

    new Setting(contentEl)
      .addButton((btn) =>
        btn.setButtonText('Cancel').onClick(() => this.close()),
      )
      .addButton((btn) =>
        btn
          .setButtonText('Open')
          .setCta()
          .onClick(() => this.onSubmit(this.result)),
      )
  }

  onClose() {
    this.contentEl.empty()
  }

  protected createTextareaField(
    container: HTMLElement,
    placeholder?: string,
    value?: string,
  ) {
    const textComponent = new TextAreaComponent(container)

    textComponent.inputEl.style.width = '100%'
    textComponent.inputEl.rows = 8

    textComponent
      .setPlaceholder(placeholder ?? '')
      .setValue(value ?? '')
      .onChange((value) => (this.result = value))
      .inputEl.addEventListener('keydown', this.submitEnterCallback.bind(this))

    return textComponent
  }

  private submitEnterCallback(evt: KeyboardEvent) {
    if (!evt.isComposing && evt.key === 'Enter') {
      evt.preventDefault()
      this.onSubmit(this.result)
    }
  }
}
