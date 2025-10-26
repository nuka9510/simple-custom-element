import { Util } from "@nuka9510/js-util";
import { Component, Interceptor } from "@nuka9510/simple-custom-element";

export default class TestComponent extends Component {
  get action() {
    return {
      'set-state': [
        { event: 'click', callback: this.onSetStateClick }
      ]
    };
  }

  get css() {
    return `
      table { border-collapse: collapse; }
      :is(th, td) { border: 1px solid #000000; }
      td { text-align: center; }
    `;
  }

  constructor() {
    super();

    Interceptor.append({
      action: ['set-state'],
      preHandle: (ev, target, component) => { console.debug('preHandle: set-state'); },
      postHandle: (ev, target, component) => { console.debug('postHandle: set-state'); }
    });
  }

  async init() {
    this.attachShadow({ mode: 'open' });

    this.state = this.setState({ arg: 'arg1' });
  }

  onSetStateClick(ev, target, component) {
    console.debug('onSetStateClick');
    this.state.set('arg', target.dataset.sceValue);
  }

  render() {
    const state = this.state.get();

    return `
      <table>
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
            <th> num </th>
            <th> num * 2 </th>
            <th> num ** 2 </th>
            <th> (num / (num * 2)) * 100 </th>
            <th> (num / (num ** 2)) * 100 </th>
            <th> ((num * 2) / (num ** 2)) * 100 </th>
          </tr>
        </thead>
        <tbody>
          ${
            this[state.arg].list.reduce(
              (...arg) => `
                ${ arg[0] }
                <tr>
                  <td> ${ arg[1].num } </td>
                  <td> ${ arg[1].num * 2 } </td>
                  <td> ${ arg[1].num ** 2 } </td>
                  <td> ${ Util.numberFormat((arg[1].num / (arg[1].num * 2)) * 100, 3) } </td>
                  <td> ${ Util.numberFormat((arg[1].num / (arg[1].num ** 2)) * 100, 3) } </td>
                  <td> ${ Util.numberFormat(((arg[1].num * 2) / (arg[1].num ** 2)) * 100, 3) } </td>
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