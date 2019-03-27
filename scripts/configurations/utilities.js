"use strict"

var path = require("path");
var fs = require("fs");

var utils = require("../utilities");

var constants = {
  platforms: "platforms",
  android: {
    platform: "android",
    wwwFolder: "assets/www",
    firebaseFileExtension: ".json",
    soundFileName: "push_sound.wav",
    getSoundDestinationFolder: function() {
      return "platforms/android/res/raw";
    }
  },
  ios: {
    platform: "ios",
    wwwFolder: "www",
    firebaseFileExtension: ".plist",
    soundFileName: "push_sound.caf",
    getSoundDestinationFolder: function(context) {
      return "platforms/ios/" + utils.getAppName(context) + "/Resources";
    }
  },
  zipExtension: ".zip"
};

function handleError(errorMessage, defer) {
  console.log(errorMessage);
  defer.reject();
}

function getFilesFromPath(path) {
  return fs.readdirSync(path);
}

function createOrCheckIfFolderExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function getResourcesFolderPath(context, platform, platformConfig) {
  var platformPath = path.join(context.opts.projectRoot, constants.platforms, platform);
  return path.join(platformPath, platformConfig.wwwFolder);
}

function getPlatformConfigs(platform) {
  if (platform === constants.android.platform) {
    return constants.android;
  } else if (platform === constants.ios.platform) {
    return constants.ios;
  }
}

function getZipFile(folder, zipFileName) {
  try {
    var files = getFilesFromPath(folder);
    for (var i = 0; i < files.length; i++) {
      if (files[i].endsWith(constants.zipExtension)) {
        var fileName = path.basename(files[i], constants.zipExtension);
        if (fileName === zipFileName) {
          return path.join(folder, files[i]);
        }
      }
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

function getAppId(context) {
  var config_xml = path.join(context.opts.projectRoot, 'config.xml');
  var et = context.requireCordovaModule('elementtree');
  var data = fs.readFileSync(config_xml).toString();
  var etree = et.parse(data);
  return etree.getroot().attrib.id;
}

function copyFromSourceToDestPath(defer, sourcePath, destPath) {
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(destPath))
  .on("close", function (err) {
    defer.resolve();
  })
  .on("error", function (err) {
    console.log(err);
    defer.reject();
  });
}

module.exports = {
  handleError,
  getZipFile,
  getResourcesFolderPath,
  getPlatformConfigs,
  getAppId,
  copyFromSourceToDestPath,
  getFilesFromPath,
  createOrCheckIfFolderExists
};
