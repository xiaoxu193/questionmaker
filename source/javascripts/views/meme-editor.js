/*
* MemeEditorView
* Manages form capture, model updates, and selection state of the editor form.
*/
MEME.MemeEditorView = Backbone.View.extend({

  initialize: function() {
    this.buildForms();
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  // Builds all form options based on model option arrays:
  buildForms: function() {
    var d = this.model.toJSON();

    function buildOptions(opts) {
      return _.reduce(opts, function(memo, opt) {
        return memo += ['<option value="', opt.hasOwnProperty('value') ? opt.value : opt, '">', opt.hasOwnProperty('text') ? opt.text : opt, '</option>'].join('');
      }, '');
    }

    if (d.textShadowEdit) {
      $('#text-shadow').parent().show();
    }

    // Build font size options:
    if (d.fontSizeOpts && d.fontSizeOpts.length) {
      $('#font-size').append(buildOptions(d.fontSizeOpts)).show();
    }

    // Build font family options:
    if (d.fontFamilyOpts && d.fontFamilyOpts.length) {
      $('#font-family').append(buildOptions(d.fontFamilyOpts)).show();
    }

    // Build background color options:
    if (d.backgroundColorOpts && d.backgroundColorOpts.length) {
      var backgroundOpts = _.reduce(d.backgroundColorOpts, function(memo, opt) {
        var color = opt.hasOwnProperty('value') ? opt.value : opt;
        return memo += '<li><label><input class="m-editor__swatch" style="background-color:'+color+'" type="radio" name="background" value="'+color+'"></label></li>';
      }, '');

      $('#background').show().find('ul').append(backgroundOpts);
    }
  },

  render: function() {
    var d = this.model.toJSON();
    this.$('#question').val(d.questionText);
    this.$('#font-size').val(d.fontSize);
    this.$('#font-family').val(d.fontFamily);
    this.$('#text-shadow').prop('checked', d.textShadow);
    this.$('#background').find('[value="'+d.backgroundColor+'"]').prop('checked', true);
  },

  events: {
    'input #question': 'onQuestion',
    'change #font-size': 'onFontSize',
    'change #font-family': 'onFontFamily',
    'change #text-shadow': 'onTextShadow',
    'change [name="background"]': 'onBackgroundColor'
  },

  onQuestion: function() {
    this.model.set('questionText', this.$('#question').val());
  },

  onTextShadow: function() {
    this.model.set('textShadow', this.$('#text-shadow').prop('checked'));
  },

  onFontSize: function() {
    this.model.set('fontSize', this.$('#font-size').val());
  },

  onFontFamily: function() {
    this.model.set('fontFamily', this.$('#font-family').val());
  },

  onBackgroundColor: function(evt) {
    this.model.set('backgroundColor', this.$(evt.target).val());
  },
  
  getDataTransfer: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return evt.originalEvent.dataTransfer || null;
  }
});