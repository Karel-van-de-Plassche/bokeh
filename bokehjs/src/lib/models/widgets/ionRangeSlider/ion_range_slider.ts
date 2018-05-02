//jQuery(input).ionRangeSlider(opts)
import * as ionRangeSlider from 'ion-rangeslider'
import {throttle} from "core/util/callback"
// The "core/properties" module has all the property types
import * as p from "core/properties"
import {div} from "core/dom"
import {SliderCallbackPolicy} from "core/enums"

// We will subclass in JavaScript from the same class that was subclassed
// from in Python
import {Widget, WidgetView} from "models/widgets/widget"
import {SliderSpec} from "models/widgets/abstract_slider"

// This model will actually need to render things, so we must provide
// view. The LayoutDOM model has a view already, so we will start with that
export class IonRangeSliderView extends WidgetView {
  model: IonRangeSlider

  protected sliderEl: HTMLElement
  protected titleEl: HTMLElement
  protected valueEl: HTMLElement
  protected callback_wrapper?: () => void

  protected _calc_to(): SliderSpec {
    return {
      start: this.model.start,
      end: this.model.end,
      value: this.model.value,
      step: this.model.step,
    }
  }

  protected _calc_from(values: number[]): number[] {
    return values
  }

  initialize(options: any): void {
    super.initialize(options)
    this.render()
  }

  connect_signals(): void {
    super.connect_signals()
    this.connect(this.model.change, () => this.render())
  }

  render(): void {
    if (this.sliderEl == null) {
      // XXX: temporary workaround for _render_css()
      super.render()
    }

    if (this.model.callback != null) {
      const callback = () => this.model.callback.execute(this.model)

      switch (this.model.callback_policy) {
        case 'continuous': {
          this.callback_wrapper = callback
          break
        }
        case 'throttle': {
          this.callback_wrapper = throttle(callback, this.model.callback_throttle)
          break
        }
      }
    }
    //
    // Set up parameters
    //const prefix = 'bk-ionRange-'

    //const {start, end, value, step} = this._calc_to()

    //let tooltips: boolean | any[] // XXX
    //if (this.model.tooltips) {
    //  const formatter = {
    //    to: (value: number): string => this.model.pretty(value),
    //  }

    //  tooltips = repeat(formatter, value.length)
    //} else
    //  tooltips = false

    this.el.classList.add("bk-slider")

    if (this.sliderEl == null) {
      this.sliderEl = div() as any
      this.el.appendChild(this.sliderEl)

      ionRangeSlider.jQuery("hi").ionRangeSlider(
      )
    }
  }
}

      //    slider_type = this.model.slider_type
      //    grid = this.model.grid
      //    disable = this.model.disabled
      //    prettify_enabled = this.model.prettify_enabled
      //    force_edges = this.model.force_edges
      //    prefix = this.model.prefix
      //    opts = {
      //      type: slider_type,
      //      grid: grid,
      //      disable: disable,
      //      onChange: this.slide,
      //      onFinish: this.slidestop,
      //      prettify_enabled: prettify_enabled,
      //      prefix: prefix,
      //      disable: disable,
      //      force_edges: force_edges
      //    }
      //
      //    if this.model.prettify
      //      opts['prettify'] = this.prettify
      //    if this.model.values
      //      opts['values'] = this.model.values
      //      min = this.model.start or 0
      //      max = this.model.end or this.model.values.length
      //    else
      //      max = this.model.end
      //      min = this.model.start
      //      step = this.model.step or ((max - min)/50)
      //      opts['step'] = step
      //    opts['max'] = max
      //    opts['min'] = min
      //    range = this.model.range or [min, max]
      //    opts['range'] = range
      //    [from, to] = range
      //    opts['from'] = from
      //    opts['to'] = to
      //
      //    input = this.$el.find('.slider')[0]
      //
      //    slider = jQuery(input).ionRangeSlider(opts)
      //    range = [from, to]
      //    this.model.range = range
      //    this.$el.find( "////{ this.model.id }" ).val( range.join(' - '))
      //    this.$el.find('.bk-slider-parent').height(this.model.height)
      //    if this.model.color != ""
      //      this.$el.find('.irs-bar').css('background', this.model.color)
      //      this.$el.find('.irs-bar-edge').css('background', this.model.color)
      //      this.$el.find('.irs-single').css('background', this.model.color)
      //    return this.
      //
      //
      //  slidestop: (data) =>
      //    if this.model.callback_policy == 'mouseup' or this.model.callback_policy == 'throttle'
      //      this.model.callback?.execute(this.model)
      //
      //  slide: (data) =>
      //    range = [data.from, data.to]
      //    value = range.join(' - ')
      //    this.$el.find( "////{ this.model.id }" ).val( value )
      //    this.model.range = range
      //    if this.callbackWrapper then this.callbackWrapper()
      //
      //  prettify: (data) =>
      //    this.model.prettify?.execute(data)

export namespace IonRangeSlider {
  export interface Attrs extends Widget.Attrs {
      slider_type:       string
      range:             any
      start:             number
      end:               number
      step:              number
      grid:              boolean
      callback:          any // XXX
      format: string
      callback_throttle: number
      callback_policy: SliderCallbackPolicy
      value:             any
      prettify_enabled:  boolean
      prettify:          any
      force_edges:       boolean
      prefix:            string
      disable:           boolean
      color:             string
  }

  export interface Props extends Widget.Props {}
}

export interface IonRangeSlider extends IonRangeSlider.Attrs {}

export class IonRangeSlider extends Widget {

  properties: IonRangeSlider.Props

  constructor(attrs?: Partial<IonRangeSlider.Attrs>) {
    super(attrs)
  }

  static initClass(): void {
    this.prototype.type = "IonRangeSlider"

    this.define({
      slider_type:       [ p.String,      "single"     ],
      range:             [ p.Any,                      ],
      start:             [ p.Number,      0            ],
      end:               [ p.Number,      1            ],
      step:              [ p.Number,      0.1          ],
      grid:              [ p.Bool,        true         ],
      callback:          [ p.Instance                  ],
      callback_throttle: [ p.Number,      200          ],
      callback_policy:   [ p.String,      "throttle"   ], // TODO (bev) enum
      value:             [ p.Any,                      ],
      prettify_enabled:  [ p.Bool,        true         ],
      prettify:          [ p.Any,         null         ],
      format:            [ p.String                    ],
      force_edges:       [ p.Bool,        false        ],
      prefix:            [ p.String,      ""           ],
      disable:           [ p.Bool,        false        ],
      color:             [ p.String,      ""           ],

    })
  }

  behaviour: "drag" | "tap"
  connected: false | boolean[] = false

  protected _formatter(value: number, _format: string): string {
    return `${value}`
  }

  pretty(value: number): string {
    return this._formatter(value, this.format)
  }
}

IonRangeSlider.initClass()
