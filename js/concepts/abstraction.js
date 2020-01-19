class Abstraction {
  constructor() {
    this.implementor = null
  }

  setImplementor = rhsImpl => {
    this.implementor = rhsImpl
  }
}
