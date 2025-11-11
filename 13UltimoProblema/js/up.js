function memoize(fn) {
    const cache = new Map();
  
    return function (...args) {
      let current = cache;
  
      for (const arg of args) {
        if (!current.has(arg)) {
          current.set(arg, new Map());
        }
        current = current.get(arg);
      }
  
      if (current.has("value")) {
        return current.get("value");
      }
  
      const result = fn(...args);
      current.set("value", result);
      return result;
    };
  }
  