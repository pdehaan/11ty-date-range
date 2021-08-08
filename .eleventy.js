module.exports = function (eleventyConfig) {
  const df = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  eleventyConfig.addFilter(
    "dateRange",
    function dateRange(startDate = Date.now(), endDate = Date.now()) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      // Make sure start date is older than the end date.
      if (startDate.getTime() > endDate.getTime()) {
        // Reverse start date and end date. Prevents "RangeError: Invalid time value" error.
        [startDate, endDate] = [endDate, startDate];
      }
      return df.formatRange(startDate, endDate);
    }
  );

  return {
    dir: {
      input: "src",
      output: "www",
    },
  };
};
