import type { Pluggable, PluggableOptions } from '@/hooks/usePluggable/types'
import type { Command as ObsidianCommand } from 'obsidian'

export type Command = ObsidianCommand

export interface CommandsState {
  list: Command[]
  isDisabled?: boolean
}

export interface CommandsOptions extends PluggableOptions<CommandsState> {}

export type PluggableCommands<ItemState = unknown> = Pluggable<
  CommandsState,
  CommandsOptions
>
