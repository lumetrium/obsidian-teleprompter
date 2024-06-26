export function getAllWindows() {
  return (window as any)
    .require('electron')
    .remote.BrowserWindow.getAllWindows()
}

export function executeJsInAllWindows(
  js: string,
  options?: {
    userGesture?: boolean
    mapFn?: (win: any, jsResult: any) => any
  },
) {
  const windows = getAllWindows()
  return Promise.all(
    windows.map((win: any) =>
      win.webContents
        .executeJavaScript(js, options?.userGesture)
        .then(
          options?.mapFn ? (r: any) => options.mapFn(win, r) : (r: any) => r,
        ),
    ),
  )
}

/**
 * Bring all windows containing a specific selector in the DOM to the front.
 * @param selector
 * @see https://github.com/electron/electron/issues/2867#issuecomment-1636469293
 */
export async function showWindowsWithSelector(selector: string) {
  await executeJsInAllWindows(
    `!!window.document.querySelector('${selector}')`,
    {
      mapFn(win, isTarget) {
        if (!isTarget) return
        win.show()
        win.setAlwaysOnTop(true)
        win.setAlwaysOnTop(false)
      },
    },
  )
}

/**
 * Dispatch a keyboard event in all windows.
 * @see https://github.com/electron/electron/issues/15856
 */
export async function dispatchKeyboardEventInAllWindows(
  data: {
    key?: string
    code?: string
  } = {},
) {
  return executeJsInAllWindows(
    `    
    window.document.dispatchEvent(new KeyboardEvent('keydown', {
      isTrusted: true,
      bubbles: true,
      cancelable: true,
      code: '${data.code}',
      key: '${data.key}',
    }))
    `,
    {
      userGesture: true,
    },
  )
}
