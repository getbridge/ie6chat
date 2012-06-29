(function() {

  Kandan.Plugins.Attachments = (function() {

    function Attachments() {}

    Attachments.widget_title = "Media";

    Attachments.widget_icon_url = "/assets/media_icon.png";

    Attachments.pluginNamespace = "Kandan.Plugins.Attachments";

    Attachments.dropzoneInit = false;

    Attachments.options = {
      maxFileNameLength: 20,
      defaultDropzoneText: "Drop file here to upload"
    };

    Attachments.templates = {
      noFiles: _.template('<div style="text-align:center; text-transform: uppercase; font-size: 11px; color: #999; padding: 10px;">\n  No media yet. Try uploading.\n</div>'),
      dropzone: _.template('<form accept-charset="UTF-8" action="/channels/<%= channelId %>/attachments.json" data-remote="true" html="{:multipart=&gt;true}" id="file_upload" method="post">\n    <div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="✓">\n      <input name="<%=csrfParam %>" type="hidden" value="<%= csrfToken %>"/>\n    </div>\n    <input id="channel_id_<%= channelId %>" name="channel_id[<%= channelId %>]" type="hidden"/>\n    <input id="file" name="file" type="file"/>\n    <div class="dropzone"><%= dropzoneText %></div>\n</form>'),
      fileItemTemplate: _.template('<div class="file_item">\n  <a target="_blank" href="<%= url %>">\n    <img src="<%= iconUrl %>"/>\n    <span><%= fileName %></span>\n  </a>\n</div>')
    };

    Attachments.csrfParam = function() {
      return $('meta[name=csrf-param]').attr('content');
    };

    Attachments.csrfToken = function() {
      return $('meta[name=csrf-token]').attr('content');
    };

    Attachments.truncateName = function(fileName) {
      if (fileName.length > this.options.maxFileNameLength) {
        return "" + (fileName.substring(0, this.options.maxFileNameLength)) + "...";
      }
      return fileName;
    };

    Attachments.fileIcon = function(fileName) {
      var fileExtension;
      fileExtension = fileName.split(".").pop();
      if (fileExtension.match(/(png|jpeg|jpg|gif)/i)) {
        return "/assets/img_icon.png";
      }
      if (fileExtension.match(/(mp3|wav|m4a)/i)) return "/assets/audio_icon.png";
      if (fileExtension.match(/(mov|mpg|mpeg|mp4)/i)) {
        return "/assets/video_icon.png";
      }
      return "/assets/file_icon.png";
    };

    Attachments.render = function($widgetEl) {
      var $uploadForm, populate,
        _this = this;
      $uploadForm = this.templates.dropzone({
        channelId: Kandan.Data.Channels.activeChannelId(),
        csrfParam: this.csrfParam(),
        csrfToken: this.csrfToken(),
        dropzoneText: this.options.defaultDropzoneText
      });
      $widgetEl.next().html($uploadForm);
      $widgetEl.next(".action_block").html($uploadForm);
      populate = function(collection) {
        var $fileList, model, _i, _len, _ref;
        if (collection.models.length > 0) {
          $fileList = $("<div class='file_list'></div>");
          _ref = collection.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            model = _ref[_i];
            $fileList.append(_this.templates.fileItemTemplate({
              fileName: _this.truncateName(model.get('file_file_name')),
              url: model.get('url'),
              iconUrl: _this.fileIcon(model.get('file_file_name'))
            }));
          }
        } else {
          $fileList = _this.templates.noFiles();
        }
        return $widgetEl.html($fileList);
      };
      return Kandan.Data.Attachments.all(populate);
    };

    Attachments.initDropzone = function() {
      return $(".dropzone").filedrop({
        fallback_id: "file",
        paramname: "file",
        maxfilesize: 1000,
        queuefiles: 1,
        url: function() {
          return "/channels/" + (Kandan.Data.Channels.activeChannelId()) + "/attachments.json";
        },
        uploadStarted: function() {
          return $(".dropzone").text("Uploading...");
        },
        uploadFinished: function(i, file, response, time) {
          return console.log("Upload finished!");
        },
        error: function(err, file) {
          if (err === "BrowserNotSupported") {
            return $(".dropzone").text("Browser not supported");
          } else if (err === "FileTooLarge") {
            return $(".dropzone").text("File too large");
          } else {
            return $(".dropzone").text("Sorry bud! couldn't upload");
          }
        },
        progressUpdated: function(i, file, progress) {
          $(".dropzone").text("" + progress + "% Uploaded");
          if (progress === 100) {
            $(".dropzone").text("" + progress + "% Uploaded");
            return Kandan.Widgets.render("Kandan.Plugins.Attachments");
          }
        },
        dragOver: function() {
          console.log("reached dropzone!");
          return $(".dropzone").text("UPLOAD!");
        },
        dragLeave: function() {
          console.log("left dropzone!");
          return $(".dropzone").text("Drop file here to upload");
        }
      });
    };

    Attachments.init = function() {
      var _this = this;
      this.initDropzone();
      Kandan.Widgets.register(this.pluginNamespace);
      Kandan.Data.Attachments.registerCallback("change", function() {
        return Kandan.Widgets.render(_this.pluginNamespace);
      });
      return Kandan.Data.Channels.registerCallback("change", function() {
        return Kandan.Widgets.render(_this.pluginNamespace);
      });
    };

    return Attachments;

  })();

}).call(this);
