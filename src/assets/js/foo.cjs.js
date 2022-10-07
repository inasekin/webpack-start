class Foo {
  constructor() {
    this.value = 'foobar';
  }

  static instance() {
    return new Foo();
  }

  getValue() {
    return this.value;
  }
}

// eslint-disable-next-line no-undef
module.exports = {
  Foo,
};
