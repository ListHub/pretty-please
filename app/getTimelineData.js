(function() {
  "use strict";

  var TIME_FRAME = 3;

  function rng(min, max) {
    return Math.random() * (max - min) + min;
  }

  var GetData = function() {

    var lanes = [
      { id: 0, label:'source-runner' },
      { id: 1, label:'channel-runner' }
    ];

    var millisPerHr = 1000 * 60 * 60;
    var millisPerDay = millisPerHr * 24;

    var end = Date.now();
    var start = end - (TIME_FRAME * millisPerDay);

    var items = [];

    function appendItems(lane, startOffsetMillis) {
      for (var i = 0; i < TIME_FRAME; i++) {
        var runtime = rng(1, 8);
        var jobStart = start + (i * millisPerDay) + startOffsetMillis;
        var jobEnd = jobStart + (runtime * millisPerHr);
        var success = runtime > 1;

        var o = {};
        o.class = 'past';
        o.desc = 'runtime = ' + runtime + 'hrs';
        o.id = lane.id + '-' + i;
        o.lane = lane.id;
        o.start = new Date(jobStart);
        o.end = new Date(jobEnd);

        items.push(o);
      }
    }

    appendItems(lanes[0], 0);
    appendItems(lanes[0], millisPerHr * 12);
    appendItems(lanes[1], millisPerHr * 5);
    appendItems(lanes[1], millisPerHr * 16);

    return {
      lanes: lanes,
      items: items
    };
  };

  var root = typeof exports !== "undefined" && exports !== null ? exports : window;
  root.getTimelineData = GetData;


}).call(this)
