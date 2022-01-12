export function ensure<T>(
  argument: T | undefined | null,
  message: string = "This value was promised to be there."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

// Usage
// const getData = (query: "one" | "two") => ensure(namedItems.find(item => query === item.name)).data
