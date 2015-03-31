/*
* MemeModel
* Manages rendering parameters and source image datas.
*/
MEME.MemeModel = Backbone.Model.extend({
  defaults: {
    backgroundPosition: { x: null, y: null },
    downloadName: 'question',
    fontColor: 'white',
    fontFamily: 'Helvetica Neue',
    fontFamilyOpts: ['Helvetica', 'Helvetica Neue', 'Comic Sans MS'],
    fontSize: 24,
    fontSizeOpts: [14, 24, 36],
    questionText: 'Write question here',
    height: 378,
    backgroundColor: '#000',
    backgroundColorOpts: ['#2980b9', '#7D8A2E', '#FF8598', '#B9121B', '#BD8D46'],
    paddingRatio: 0.05,
    textAlign: 'left',
    textAlignOpts: ['left', 'center', 'right'],
    textShadow: true,
    textShadowEdit: true,
    width: 755
  },

  // Initialize with custom image members used for background and watermark:
  // These images will (sort of) behave like managed model fields.
  initialize: function() {
    this.background = new Image();

    // Set image sources to trigger "change" whenever they reload:
    this.background.onload = _.bind(function() {
      this.trigger('change');
    }, this);
  }
});
