import type { PanelState } from '@/features/panel/types'

export interface EyelineIndicator {
  top: number
  color: string
}

export interface EyelinePanelData {
  background: null | 'follow-content' | string
}

export type EyelinePanelState = PanelState<EyelineIndicator, EyelinePanelData>
