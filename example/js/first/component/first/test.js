import SceElement from "../../../../../src/element.js";

export default class Test extends SceElement {
  get action() { return {
    'set-state': [
      {
        event: 'click',
        callback: this.onSetStateClick
      }
    ]
  }; }

  async init() {
    this.state = this.setState({
      arg: 'arg'
    });
  }

  onSetStateClick(ev) {
    const node = ev.currentTarget;

    this.state.set('arg', node.dataset.sceValue);
  }

  render() {
    const state = this.state.get();

    return `
      <p> ${this[state.arg]?.text ?? 'empty'} </p>
      <button type="button" data-sce-action="set-state" data-sce-value="arg"> setState(arg) </button>
      <button type="button" data-sce-action="set-state" data-sce-value="config"> setState(config) </button>
      <button type="button" data-sce-action="set-state" data-sce-value="error"> setState(error) </button>
    `;
  }

}