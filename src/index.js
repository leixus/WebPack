import _ from 'lodash';
import printMe from './print.js';
import './styles.css';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = '点击按钮触发时间console!';
    btn.onclick = printMe; // onclick 事件绑定原始的 printMe 函数上

    element.appendChild(btn);

    return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素

document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('接受更新的printMe模块！!');
        printMe();
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}