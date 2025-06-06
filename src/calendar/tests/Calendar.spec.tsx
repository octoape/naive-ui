import { mount } from '@vue/test-utils'
import { addMonths, format, getYear, isYesterday } from 'date-fns'
/* eslint-disable unused-imports/no-unused-vars */
import { h } from 'vue'
import { NButton } from '../../button'
import { NCalendar } from '../index'

describe('n-calendar', () => {
  const now = Date.now()

  it('should work with import on demand', () => {
    mount(NCalendar)
  })

  it('props.onUpdate has correct type', () => {
    ;(() => (
      <NCalendar
        onUpdateValue={(
          value: number,
          time: {
            date: number
            month: number
            year: number
          }
        ) => {}}
      />
    ))()
  })

  it('should follow `default-value` to display month', () => {
    // May 19 2022
    const wrapper = mount(NCalendar, { props: { defaultValue: 1652956953562 } })
    expect(wrapper.find('.n-calendar-header__title').text()).toContain('May')
    wrapper.unmount()
  })

  it('should work with `default-value` prop', async () => {
    const wrapper = mount(NCalendar, { props: { defaultValue: now } })
    expect(wrapper.find('.n-calendar-cell--selected').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NCalendar, { props: { value: now } })
    expect(wrapper.find('.n-calendar-cell--selected').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `is-date-disabled` prop', async () => {
    function disableFunction(timestamp: number): boolean {
      return isYesterday(timestamp)
    }
    const wrapper = mount(NCalendar, {
      props: { 'is-date-disabled': disableFunction }
    })
    expect(wrapper.find('.n-calendar-cell--disabled').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `on-update:value` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mount(NCalendar, { props: { 'on-update:value': onUpdate } })

    await wrapper.findAll('.n-calendar-date')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with clicked `prev` and `next`', async () => {
    const wrapper = mount(NCalendar, { props: { defaultValue: now } })

    const nowDate = wrapper.find('.n-calendar-header__title').text()
    const buttons = wrapper.findAllComponents(NButton)

    await buttons[0].trigger('click')
    const prevDate = addMonths(now, -1)
    expect(wrapper.find('.n-calendar-header__title').text()).toBe(
      `${format(prevDate, 'MMMM')} ${getYear(prevDate)}`
    )

    await buttons[1].trigger('click')
    expect(wrapper.find('.n-calendar-header__title').text()).toBe(nowDate)
    expect(
      wrapper
        .find('.n-calendar-cell--current')
        .find('.n-calendar-date__date')
        .attributes('title')
    ).toBe(format(now, 'yyyy-MM-dd'))

    await buttons[2].trigger('click')
    const nextDate = addMonths(now, 1)
    expect(wrapper.find('.n-calendar-header__title').text()).toBe(
      `${format(nextDate, 'MMMM')} ${getYear(nextDate)}`
    )
    wrapper.unmount()
  })
})
