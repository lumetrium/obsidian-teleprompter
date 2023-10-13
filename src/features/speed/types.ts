import type { ControlState } from '@/features/control/types'

export interface SpeedControlState extends ControlState<number> {
	min: number
	max: number
}
