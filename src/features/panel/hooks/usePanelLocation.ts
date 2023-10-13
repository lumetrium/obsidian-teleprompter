import { PanelAlignment, PanelLocation } from '@/features/panel/constants'
import {
  mdiDockBottom,
  mdiDockLeft,
  mdiDockRight,
  mdiDockTop,
  mdiFormatAlignCenter,
  mdiFormatAlignLeft,
  mdiFormatAlignRight,
} from '@mdi/js'
import { computed, type MaybeRef, unref } from 'vue'
import type { PanelLocationType } from '@/features/panel/types'

export function usePanelLocation(locationRef?: MaybeRef<PanelLocationType>) {
  const location = computed(() => unref(locationRef))

  const isHorizontal = computed(
    () =>
      location.value === PanelLocation.TOP ||
      location.value === PanelLocation.BOTTOM,
  )

  const isVertical = computed(
    () =>
      location.value === PanelLocation.LEFT ||
      location.value === PanelLocation.RIGHT,
  )

  const menuLocation = computed<'top' | 'bottom' | 'start' | 'end' | 'center'>(
    () => {
      if (isHorizontal.value) {
        return location.value === PanelLocation.TOP ? 'bottom' : 'top'
      } else {
        return location.value === PanelLocation.LEFT ? 'end' : 'start'
      }
    },
  )

  const menuTransition = computed(() =>
    isHorizontal.value
      ? location.value === PanelLocation.TOP
        ? 'slide-y-transition'
        : 'slide-y-reverse-transition'
      : location.value === PanelLocation.LEFT
      ? 'slide-x-transition'
      : 'slide-x-reverse-transition',
  )

  const tooltipLocation = computed<'top start' | 'bottom start' | 'left' | 'right'>(() => {
    if (isHorizontal.value) {
      return location.value === PanelLocation.TOP ? 'bottom start' : 'top start'
    } else {
      return location.value === PanelLocation.LEFT ? 'right' : 'left'
    }
  })

  const locationItems = computed(() => [
    {
      title: 'Top',
      value: PanelLocation.TOP,
      icon: mdiDockTop,
    },
    {
      title: 'Bottom',
      value: PanelLocation.BOTTOM,
      icon: mdiDockBottom,
    },
    {
      title: 'Left',
      value: PanelLocation.LEFT,
      icon: mdiDockLeft,
    },
    {
      title: 'Right',
      value: PanelLocation.RIGHT,
      icon: mdiDockRight,
    },
  ])

  const alignmentItems = computed(() => [
    {
      title: 'Default',
      value: null,
    },
    {
      title: 'Center',
      value: PanelAlignment.CENTER,
      icon: mdiFormatAlignCenter,
    },
    {
      title: 'Left',
      value: PanelAlignment.LEFT,
      icon: mdiFormatAlignLeft,
    },
    {
      title: 'Right',
      value: PanelAlignment.RIGHT,
      icon: mdiFormatAlignRight,
    },
  ])

  return {
    location,
    isHorizontal,
    isVertical,
    locationItems,
    alignmentItems,
    menuLocation,
    menuTransition,
    tooltipLocation,
  }
}
