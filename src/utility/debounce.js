// Debounce function:
// Input as function which needs to be debounced and
// delay is the debounced time in milliseconds
var timerId;
var debounceFunction = function (func, delay) {
  // Cancels the setTimeout method execution
  clearTimeout(timerId);

  // Executes the func after delay time.
  timerId = setTimeout(func, delay);
};

export default debounceFunction;
