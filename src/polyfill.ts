declare global {
  interface Array<T> {
    at(index: number): T | undefined;
  }
}

if (!Array.prototype.at) {
  Array.prototype.at = function (index: number) {
    const length = this.length;

    if (index < 0) {
      index = length + index;
    }

    if (index < 0 || index >= length) {
      return undefined;
    }

    return Array.prototype.slice.call(this, index, index + 1)[0];
  };
}

export {};
