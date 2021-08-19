let _calcButtons = [
    {
        type: "amator",
        buttons: [
            {
                text: "AC", class: "clear", onclick: function () {
                    reset();
                }
            },
            {
                text: "DEL", class: "delete", onclick: function () {
                    if (isCalculated)
                        return;
                    if (_currentNumber.length > 0)
                        _currentNumber = _currentNumber.substring(0, _currentNumber.length - 1);
                    else if (_calcOperations.length > 0) {
                        if (_calcOperations[_calcOperations.length - 1].type == "operator") {
                            _currentNumber = _calcOperations[_calcOperations.length - 2].value;
                            _calcOperations = _calcOperations.slice(0, _calcOperations.length - 2);
                        }
                    }
                    writeOnScreen();
                }
            },
            {
                text: "/", class: "operator-button", behaviourType: "operator"
            },
            {
                text: "1", class: "button-style", behaviourType: "number"
            },
            {
                text: "2", class: "button-style", behaviourType: "number"
            },
            {
                text: "3", class: "button-style", behaviourType: "number"
            },
            {
                text: "*", class: "operator-button", behaviourType: "operator"
            },
            {
                text: "4", class: "button-style", behaviourType: "number"
            },
            {
                text: "5", class: "button-style", behaviourType: "number"
            },
            {
                text: "6", class: "button-style", behaviourType: "number"
            },
            {
                text: "+", class: "operator-button", behaviourType: "operator"
            },
            {
                text: "7", class: "button-style", behaviourType: "number"
            },
            {
                text: "8", class: "button-style", behaviourType: "number"
            },
            {
                text: "9", class: "button-style", behaviourType: "number"
            },
            {
                text: "-", class: "operator-button", behaviourType: "operator"
            },
            {
                text: ".", class: "diger-class", behaviourType: "unique-operator"
            },
            {
                text: "0", class: "button-style", behaviourType: "number"
            },
            {
                text: "-/+", class: "diger-class", behaviourType: "plus-minus"
            },
            {
                text: "=", class: "equal", behaviourType: "calculate"
            }
        ]
    },
    {
        type: "pro",
        buttons: [

        ]
    }
];