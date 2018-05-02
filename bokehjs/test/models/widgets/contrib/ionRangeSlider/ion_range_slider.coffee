{expect} = require "chai"
utils = require "../../../../utils"
sinon = require "sinon"

{IonRangeSlider} = utils.require("models/widgets/contrib/ionRangeSlider/ion_range_slider")
{Document} = utils.require("document")

describe "ion_range_slider module", ->

  it "_calc_from should return integer if start/end/step all integers", ->
    s = new IonRangeSlider({start:0, end:10, step:1})
    doc = new Document()
    s.attach_document(doc)
    sv = new s.default_view({model: s, parent: null})
    #doc.add_root(s)
    expect(s.disabled).to.be.false
    #expect(s._width.value).to.be.equal 3.14
    s.get_aspect_ratio()

    r = sv._calc_from([5.0])

    expect(r).to.be.equal 5
    expect(Number.isInteger(r)).to.be.true
