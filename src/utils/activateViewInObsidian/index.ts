import type { Workspace } from 'obsidian'

export async function activateViewInObsidian(
  viewType: string,
  workspace: Workspace,
  placement?: 'sidebar' | 'tab' | 'window',
) {
  const leaves = workspace.getLeavesOfType(viewType)

  if (placement && leaves.length > 0) {
    workspace.detachLeavesOfType(viewType)
  }

  if (placement || leaves.length === 0) {
    const leaf =
      !placement || placement === 'sidebar'
        ? workspace.getRightLeaf(false)
        : workspace.getLeaf(placement)

    await leaf.setViewState({
      type: viewType,
      active: true,
    })
  }

  workspace.revealLeaf(
    workspace.getLeavesOfType(viewType)[0],
  )
}
