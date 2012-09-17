// ==========================================================================
// Project:   Nvzn Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Nvzn module test ok equals same stop start */

module("Nvzn");


module('Nvzn.formatTime', {

  setup:function () {
    console.log('*');
  }

});

test("should format time correctly", function () {
  var ft = Nvzn.formatTime,
      expected1 = "09:50:00",
      input;
  input = "09:50";
  equals(ft(input), expected1, "should add seconds to time: '%@'".fmt(input));
  input = " 09:50 ";
  equals(ft(input), expected1, "should handle extra spaces: '%@'".fmt(input));
  input = "09:50:00";
  equals(ft(input), expected1, "should only add seconds if needed: '%@'".fmt(input));
  input = "9:5";
  equals(ft(input), expected1, "hours and minutes should always be 2 digets: '%@'".fmt(input));
  input = "9";
  equals(ft(input), "09:00:00", "should be able to take only hour: '%@'".fmt(input));
});