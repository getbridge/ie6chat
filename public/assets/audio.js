(function() {

  Kandan.Helpers.Audio = (function() {

    function Audio() {}

    Audio.audioHolder = function() {
      return $('.audio_channels')[0];
    };

    Audio.audioChannels = function() {
      return $('audio');
    };

    Audio.createAudioChannel = function(id) {
      var channel;
      channel = $("<audio class='audio_" + id + "'></audio>");
      return channel.appendTo(this.audioHolder());
    };

    Audio.destroyAudioChannel = function(id) {
      var channel;
      channel = $(".audio_" + id);
      return channel.remove();
    };

    Audio.audioChannel = function(id) {
      return $(".audio_" + id)[0];
    };

    Audio.currentAudioChannel = function() {
      return this.audioChannel(Kandan.Helpers.Channels.getActiveChannelId());
    };

    return Audio;

  })();

}).call(this);
