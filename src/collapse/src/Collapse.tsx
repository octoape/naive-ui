import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type {
  CollapseArrowSlotProps,
  CollapseItemHeaderExtraSlotProps,
  CollapseItemHeaderSlotProps,
  HeaderClickInfo,
  OnItemHeaderClick,
  OnItemHeaderClickImpl,
  OnUpdateExpandedNames,
  OnUpdateExpandedNamesImpl
} from './interface'
import { useMergedState } from 'vooks'
import {
  computed,
  type CSSProperties,
  defineComponent,
  type ExtractPropTypes,
  h,
  type PropType,
  provide,
  type Ref,
  ref,
  type SlotsType,
  type VNode
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import { call, createInjectionKey, warn } from '../../_utils'
import { collapseLight, type CollapseTheme } from '../styles'
import style from './styles/index.cssr'

export const collapseProps = {
  ...(useTheme.props as ThemeProps<CollapseTheme>),
  defaultExpandedNames: {
    type: [Array, String] as PropType<
      string | number | Array<string | number> | null
    >,
    default: null
  },
  expandedNames: [Array, String] as PropType<
    string | number | Array<string | number> | null
  >,
  arrowPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  accordion: {
    type: Boolean,
    default: false
  },
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  triggerAreas: {
    type: Array as PropType<Array<'main' | 'extra' | 'arrow'>>,
    default: () => ['main', 'extra', 'arrow']
  },
  onItemHeaderClick: [Function, Array] as PropType<
    MaybeArray<OnItemHeaderClick>
  >,
  'onUpdate:expandedNames': [Function, Array] as PropType<
    MaybeArray<OnUpdateExpandedNames>
  >,
  onUpdateExpandedNames: [Function, Array] as PropType<
    MaybeArray<OnUpdateExpandedNames>
  >,
  // deprecated
  onExpandedNamesChange: {
    type: [Function, Array] as PropType<
      MaybeArray<OnUpdateExpandedNames> | undefined
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'collapse',
          '`on-expanded-names-change` is deprecated, please use `on-update:expanded-names` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type CollapseProps = ExtractPublicPropTypes<typeof collapseProps>

export interface CollapseSlots {
  default?: () => VNode[]
  arrow?: (props: CollapseArrowSlotProps) => VNode[]
  header?: (props: CollapseItemHeaderSlotProps) => VNode[]
  'header-extra'?: (props: CollapseItemHeaderExtraSlotProps) => VNode[]
}

export interface NCollapseInjection {
  props: ExtractPropTypes<typeof collapseProps>
  expandedNamesRef: Ref<string | number | Array<string | number> | null>
  mergedClsPrefixRef: Ref<string>
  slots: CollapseSlots
  toggleItem: (
    collapse: boolean,
    name: string | number,
    event: MouseEvent
  ) => void
}

export const collapseInjectionKey
  = createInjectionKey<NCollapseInjection>('n-collapse')

export default defineComponent({
  name: 'Collapse',
  props: collapseProps,
  slots: Object as SlotsType<CollapseSlots>,
  setup(props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef }
      = useConfig(props)
    const uncontrolledExpandedNamesRef = ref<
      string | number | Array<string | number> | null
    >(props.defaultExpandedNames)
    const controlledExpandedNamesRef = computed(() => props.expandedNames)
    const mergedExpandedNamesRef = useMergedState(
      controlledExpandedNamesRef,
      uncontrolledExpandedNamesRef
    )
    const themeRef = useTheme(
      'Collapse',
      '-collapse',
      style,
      collapseLight,
      props,
      mergedClsPrefixRef
    )
    function doUpdateExpandedNames(
      names: Array<string | number> | string | number
    ): void {
      const {
        'onUpdate:expandedNames': _onUpdateExpandedNames,
        onUpdateExpandedNames,
        onExpandedNamesChange
      } = props
      if (onUpdateExpandedNames) {
        call(onUpdateExpandedNames as OnUpdateExpandedNamesImpl, names)
      }
      if (_onUpdateExpandedNames) {
        call(_onUpdateExpandedNames as OnUpdateExpandedNamesImpl, names)
      }
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange as OnUpdateExpandedNamesImpl, names)
      }
      uncontrolledExpandedNamesRef.value = names
    }
    function doItemHeaderClick<T extends string | number>(
      info: HeaderClickInfo<T>
    ): void {
      const { onItemHeaderClick } = props
      if (onItemHeaderClick) {
        call(onItemHeaderClick as OnItemHeaderClickImpl, info)
      }
    }
    function toggleItem(
      collapse: boolean,
      name: string | number,
      event: MouseEvent
    ): void {
      const { accordion } = props
      const { value: expandedNames } = mergedExpandedNamesRef
      if (accordion) {
        if (collapse) {
          doUpdateExpandedNames([name])
          doItemHeaderClick({ name, expanded: true, event })
        }
        else {
          doUpdateExpandedNames([])
          doItemHeaderClick({ name, expanded: false, event })
        }
      }
      else {
        if (!Array.isArray(expandedNames)) {
          doUpdateExpandedNames([name])
          doItemHeaderClick({ name, expanded: true, event })
        }
        else {
          const activeNames = expandedNames.slice()
          const index = activeNames.findIndex(
            activeName => name === activeName
          )
          if (~index) {
            activeNames.splice(index, 1)
            doUpdateExpandedNames(activeNames)
            doItemHeaderClick({ name, expanded: false, event })
          }
          else {
            activeNames.push(name)
            doUpdateExpandedNames(activeNames)
            doItemHeaderClick({ name, expanded: true, event })
          }
        }
      }
    }
    provide(collapseInjectionKey, {
      props,
      mergedClsPrefixRef,
      expandedNamesRef: mergedExpandedNamesRef,
      slots,
      toggleItem
    })
    const rtlEnabledRef = useRtl('Collapse', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          titleFontWeight,
          dividerColor,
          titlePadding,
          titleTextColor,
          titleTextColorDisabled,
          textColor,
          arrowColor,
          fontSize,
          titleFontSize,
          arrowColorDisabled,
          itemMargin
        }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-divider-color': dividerColor,
        '--n-title-padding': titlePadding,
        '--n-title-font-size': titleFontSize,
        '--n-title-text-color': titleTextColor,
        '--n-title-text-color-disabled': titleTextColorDisabled,
        '--n-title-font-weight': titleFontWeight,
        '--n-arrow-color': arrowColor,
        '--n-arrow-color-disabled': arrowColorDisabled,
        '--n-item-margin': itemMargin
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('collapse', undefined, cssVarsRef, props)
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    this.onRender?.()
    return (
      <div
        class={[
          `${this.mergedClsPrefix}-collapse`,
          this.rtlEnabled && `${this.mergedClsPrefix}-collapse--rtl`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
