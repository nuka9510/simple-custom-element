import { JUtil } from "@nuka9510/js-util";
import { SCEComponent } from "@nuka9510/simple-custom-element";

export default class TestComponent extends SCEComponent {
  get action() {
    return {
      'set-state': [
        { event: 'click', callback: this.onSetStateClick }
      ]
    };
  }

  async init() {
    this.attachShadow({ mode: 'open' });

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
              (...arg) => `
                ${ arg[0] }
                <tr>
                  <td style="text-align: center; border: 1px solid #000000;"> ${ arg[1].num } </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${ arg[1].num * 2 } </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${ arg[1].num ** 2 } </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${ JUtil.numberFormat((arg[1].num / (arg[1].num * 2)) * 100, 3) } </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${ JUtil.numberFormat((arg[1].num / (arg[1].num ** 2)) * 100, 3) } </td>
                  <td style="text-align: center; border: 1px solid #000000;"> ${ JUtil.numberFormat(((arg[1].num * 2) / (arg[1].num ** 2)) * 100, 3) } </td>
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