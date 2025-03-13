import { SceComponent } from "../module/simple-custom-element/src/index.js";

export default class TestElement extends SceComponent {
  get action() { return {
    'set-state': [
      {
        event: 'click',
        callback: this.onSetStateClick
      }
    ]
  }; }

  async init() {
    this.state = this.setState({ arg: 'arg1' });
  }

  onSetStateClick(ev) {
    const node = ev.currentTarget;

    this.state.set('arg', node.dataset.sceValue);
  }

  render() {
    const state = this.state.get();

    return `
      <table style="border-collapse: collapse;">
        <colgroup>
          <col style="width: 80px;">
          <col style="width: 80px;">
          <col style="width: 80px;">
          <col style="width: 250px;">
          <col style="width: 250px;">
          <col style="width: 250px;">
        </colgroup>
        <thead>
          <tr>
            <th style="border: 1px solid #000000"> num </th>
            <th style="border: 1px solid #000000"> num * 2 </th>
            <th style="border: 1px solid #000000"> num ** 2 </th>
            <th style="border: 1px solid #000000"> (num / (num * 2)) * 100 </th>
            <th style="border: 1px solid #000000"> (num / (num ** 2)) * 100 </th>
            <th style="border: 1px solid #000000"> ((num * 2) / (num ** 2)) * 100 </th>
          </tr>
        </thead>
        <tbody>
          ${
            this[state.arg].list.reduce(
              (acc, cur, i, arr) => `
                ${acc}
                <tr>
                  <td style="text-align: center; border: 1px solid #000000;"> ${cur.num} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${cur.num * 2} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${cur.num ** 2} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${this.util.numberFormat((cur.num / (cur.num * 2)) * 100, 3)} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${this.util.numberFormat((cur.num / (cur.num ** 2)) * 100, 3)} </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${this.util.numberFormat(((cur.num * 2) / (cur.num ** 2)) * 100, 3)} </td>
                </tr>
              `, ''
            )
          }
        </tbody>
      </table>
      <button type="button" data-sce-action="set-state" data-sce-value="arg1"> setState(arg1) </button>
      <button type="button" data-sce-action="set-state" data-sce-value="arg2"> setState(arg2) </button>
      <button type="button" data-sce-action="set-state" data-sce-value="arg3"> setState(arg3) </button>
    `;
  }

}