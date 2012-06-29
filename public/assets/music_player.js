(function() {

  Kandan.Plugins.MusicPlayer = (function() {

    function MusicPlayer() {}

    MusicPlayer.pluginNamespace = "Kandan.Plugins.MusicPlayer";

    MusicPlayer.pluginId = "";

    MusicPlayer.widgetTitle = "Player";

    MusicPlayer.playRegex = /^&#x2F;play .+/;

    MusicPlayer.stopRegex = /^&#x2F;stop/;

    MusicPlayer.resumeRegex = /^&#x2F;resume/;

    MusicPlayer.localSongData = false;

    MusicPlayer.playTemplate = _.template('<strong><a class="audio-play">playing</a> <a target="_blank" href="<%- url %>"><%- url %></a></strong>');

    MusicPlayer.stopTemplate = _.template('<strong><a class="audio-play">stopping</a> the music.');

    MusicPlayer.resumeTemplate = _.template('<strong><a class="audio-play">resuming</a> the music.');

    MusicPlayer.songTemplate = _.template('<li><%= song.split("/").pop() %></li>');

    MusicPlayer.setError = function(errorMessage) {
      return console.log("music player error", errorMessage);
    };

    MusicPlayer.createSongList = function(songs) {
      var $songs, song, _i, _len;
      $songs = $('<ul class="songs"></ul>');
      if (songs.length === 0) {
        $songs = "No songs! Maybe add some?";
      } else {
        for (_i = 0, _len = songs.length; _i < _len; _i++) {
          song = songs[_i];
          $songs.append(this.songTemplate({
            song: song
          }));
        }
      }
      return $songs;
    };

    MusicPlayer.render = function($widgetEl) {
      var $songs, $widgetElementClass,
        _this = this;
      $widgetElementClass = $widgetEl.attr('class');
      if (this.localSongData) {
        $songs = this.createSongList(this.localSongData);
      } else {
        this.getSongs({
          success: function(songs) {
            return $songs = _this.createSongList(songs);
          },
          failure: function() {
            return this.setError("Could not load songs");
          }
        });
      }
      return $widgetEl.html($songs);
    };

    MusicPlayer.init = function(pluginId) {
      this.pluginId = pluginId;
      Kandan.Data.Channels.registerCallback("change", $.proxy(this.onChannelChange, this));
      this.registerPlayModifier();
      this.registerStopModifier();
      return this.registerResumeModifier();
    };

    MusicPlayer.registerWidget = function() {
      return Kandan.Widgets.register(this.pluginNamespace);
    };

    MusicPlayer.registerPlayModifier = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.playRegex, function(message, state) {
        var rawInput, soundUrl, url;
        url = $.trim(message.content.substr(message.content.indexOf(" ") + 1));
        if (true && (Kandan.Data.Channels.activeChannelId() != null)) {
          rawInput = Kandan.Helpers.Utils.unescape(url);
          soundUrl = null;
          soundUrl = _this.localSounds(rawInput);
          if (soundUrl == null) soundUrl = rawInput;
          _this.playUrl(message.channel_id, soundUrl);
        } else {
          console.log("Not playing stale song");
        }
        message.content = _this.playTemplate({
          url: url
        });
        return Kandan.Helpers.Activities.buildFromBaseTemplate(message);
      });
    };

    MusicPlayer.registerStopModifier = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.stopRegex, function(message, state) {
        var url;
        url = $.trim(message.content.substr(message.content.indexOf(" ") + 1));
        if (true && (Kandan.Data.Channels.activeChannelId() != null)) {
          _this.stopSound(message.channel_id);
        }
        message.content = _this.stopTemplate();
        return Kandan.Helpers.Activities.buildFromBaseTemplate(message);
      });
    };

    MusicPlayer.registerResumeModifier = function() {
      var _this = this;
      return Kandan.Modifiers.register(this.resumeRegex, function(message, state) {
        if (true && (Kandan.Data.Channels.activeChannelId() != null)) {
          _this.play(message.channel_id);
        }
        message.content = _this.resumeTemplate();
        return Kandan.Helpers.Activities.buildFromBaseTemplate(message);
      });
    };

    MusicPlayer.storeSong = function(url) {
      var _this = this;
      return this.getSongs({
        success: function(data) {
          data.push(url);
          return Kandan.Store.set(_this.pluginId, {
            success: function(data) {
              this.localSongData = data;
              return Kandan.Widgets.renderWidget(this.pluginNamespace);
            }
          });
        }
      });
    };

    MusicPlayer.getSongs = function(callbacks) {
      return Kandan.Store.get(this.pluginId, callbacks);
    };

    MusicPlayer.localFileUrl = function(fileName) {
      return "http://" + window.location.hostname + ":" + window.location.port + "/sounds/" + fileName;
    };

    MusicPlayer.localSounds = function(name) {
      var sounds;
      sounds = {
        'claps': this.localFileUrl('golfclap.mp3'),
        'cheers': this.localFileUrl('cheers.mp3'),
        'ding': this.localFileUrl('ding.wav'),
        'gong': this.localFileUrl('gong.mp3')
      };
      return sounds[name];
    };

    MusicPlayer.audioChannels = function() {
      return Kandan.Helpers.Audio.audioChannels();
    };

    MusicPlayer.audioChannel = function(id) {
      return Kandan.Helpers.Audio.audioChannel(id);
    };

    MusicPlayer.mute = function(channelId) {
      return this.setVolume(channelId, 0);
    };

    MusicPlayer.unmute = function(channelId) {
      return this.setVolume(channelId, 1);
    };

    MusicPlayer.toggle = function(channelId) {
      if (this.audioChannel(channelId).volume === 0) {
        return this.unmute(channelId);
      } else {
        return this.mute(channelId);
      }
    };

    MusicPlayer.setVolume = function(channelId, volume) {
      return this.audioChannel(channelId).volume = volume;
    };

    MusicPlayer.setAudioUrl = function(channelId, url) {
      return this.audioChannel(channelId).setAttribute('src', url);
    };

    MusicPlayer.playUrl = function(channelId, url) {
      this.setAudioUrl(channelId, url);
      return this.play(channelId);
    };

    MusicPlayer.play = function(channelId) {
      return this.audioChannel(channelId).play();
    };

    MusicPlayer.stopSound = function(channelId) {
      return this.audioChannel(channelId).pause();
    };

    MusicPlayer.currentChannel = function() {
      return Kandan.Data.Channels.activeChannelId();
    };

    MusicPlayer.onChannelChange = function() {
      var channel, channelId, id, raw, _i, _len, _ref;
      channelId = this.currentChannel();
      _ref = this.audioChannels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        channel = _ref[_i];
        raw = $(channel).attr('class').split("_")[1];
        id = parseInt(raw);
        if (isNaN(id)) continue;
        this.mute(id);
      }
      if (this.audioChannel(channelId) != null) return this.unmute(channelId);
    };

    MusicPlayer.playAudioNotice = function() {
      var player, url;
      url = this.localFileUrl('ding.wav');
      player = $('.audio_private')[0];
      player.setAttribute('src', url);
      return player.play();
    };

    return MusicPlayer;

  })();

}).call(this);
