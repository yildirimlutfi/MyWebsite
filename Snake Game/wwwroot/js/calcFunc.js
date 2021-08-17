let _calcOperations = new Array();
let _currentNumber = "";
let isCalculated = false;

function RenderCalc(_renderType) {
    let _calcContainer = document.getElementById("calc");
    for (var i = 0; i < _calcButtons.length; i++) {
        if (_calcButtons[i].type == _renderType) {
            for (var j = 0; j < _calcButtons[i].buttons.length; j++) {
                let _button = _calcButtons[i].buttons[j];
                let _btn = document.createElement("input");
                let _clickevent = _button.onclick;
                if (_clickevent)
                    _btn.onclick = _clickevent;
                else if (_button.behaviourType) {
                    switch (_button.behaviourType) {
                        case "operator":
                            _btn.onclick = function () { addOperation(_button.behaviourType, _button.text) };
                            break;
                        case "unique-operator":
                            _btn.onclick = function () {
                                if (isOperatorUseful(_button.text)) { addOperation(_button.behaviourType, _button.text) }
                            };
                            break;
                        case "number":
                            _btn.onclick = function () { addOperation(_button.behaviourType, _button.text) };
                            break;
                        case "calculate":
                            _btn.onclick = function () { calculate() };
                            break;
                        case "plus-minus":
                            _btn.onclick = function () { plusMinus(); writeOnScreen() };
                    }
                }
                else
                    continue;
                _btn.className = _button.class;
                _btn.type = "button";
                _btn.value = _button.text;
                _calcContainer.appendChild(_btn);
            }
        }
    }
}
function isOperatorUseful(_operator) {
    for (var i = 0; i < _calcOperations.length; i++) {
        if (_calcOperations[i].type == "operator" && _calcOperations[i].text == _operator)
            return false;
    }
    return _currentNumber.indexOf('.') == -1;
}
function writeOnScreen() {
    //document.getElementById("screen").value += _val;
    let _allOperations = "";
    for (var i = 0; i < _calcOperations.length; i++) {
        _allOperations += _calcOperations[i].value;
    }
    _allOperations += _currentNumber;
    if (_calcOperations.length > 0 && _calcOperations[_calcOperations.length - 1].type == "operator")
        isCalculated = false;
    document.getElementById("screen").value = _allOperations;
}
function addOperation(_type, _val) {
    if (_type == "operator") {
        //önce dizi DOLU MU ve son elemanı İŞLEM Mİ diye kontrol edelim
        if ((_calcOperations.length > 0 && _calcOperations[_calcOperations.length - 1].type != "operator") || _currentNumber.length > 0) {
            _calcOperations.push({ value: _currentNumber, type: "number" });
            _currentNumber = "";
            _calcOperations.push({ value: _val, type: "operator" });
        }
        else
            return;
    }
    else {
        if (isCalculated)
            return;
        _currentNumber += _val;
    }
    writeOnScreen();
}
function calculate() {
    if (_calcOperations.length == 0)
        return;
    let _screen = document.getElementById("screen");
    let _firstItem = eval(_screen.value).toFixed(2); 
    document.getElementById("mini-screen").value = _screen.value;
    if (_firstItem && !isNaN(_firstItem) && isFinite(_firstItem)) {
        //_calcOperations = [_firstItem];
        _currentNumber = _firstItem.toString();
        _calcOperations = new Array();
        _screen.value = _firstItem;
        isCalculated = true;
    }
    else
        reset();
}
function reset() {
    isCalculated = false;
    _currentNumber = "";
    document.getElementById("screen").value = "";
    document.getElementById("mini-screen").value = "";
    _calcOperations = new Array();
    
}
function plusMinus() {
    if (!_currentNumber || _currentNumber == "." || _currentNumber == "-") {
        return;
    }
    _currentNumber = _currentNumber.replace("(", "").replace(")", "");
    _currentNumber = (-1 * parseFloat(_currentNumber)).toString();
    if (parseFloat(_currentNumber) < 0)
        _currentNumber = "(" + _currentNumber + ")";
}