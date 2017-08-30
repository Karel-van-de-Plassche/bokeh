import {format} from "numbro"

import {AbstractSlider, AbstractSliderView} from "./abstract_slider"

export class DiscreteSliderView extends AbstractSliderView

  _calc_to: () ->
    return {
      start: @model.range['min']
      end: @model.range['max']
      value: @model.value
      step: -1
    }

  _calc_from: (value) -> value

export class DiscreteSlider extends AbstractSlider
  type: "DiscreteSlider"
  default_view: DiscreteSliderView

  behaviour: 'slide'
  connected: false

  _formatter: format

  @override {
    format: "0[.]00"
  }
