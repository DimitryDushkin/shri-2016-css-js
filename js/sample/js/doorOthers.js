// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var _this = this;

    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var buttons = [
        this.popup.querySelector('.pinch__button_0'),
        this.popup.querySelector('.pinch__button_1')
    ];

    buttons[0].state = {
        isForTop: true,
        startY: 0,
        currentY: 0,
        isMoving: false,
        targetElementY:
            this.popup.querySelector('.pinch__button-target_0').offsetTop +
            this.popup.querySelector('.pinch__button-target_0').offsetHeight
    };
    buttons[1].state = {
        isForTop: false,
        startY: 0,
        currentY: 0,
        isMoving: false,
        targetElementY: this.popup.querySelector('.pinch__button-target_1').offsetTop -
            this.popup.querySelector('.pinch__button-target_1').offsetHeight
    };

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointermove', _onButtonPointerMove.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        var button = e.target;
        button.classList.add('pinch__button_pressed');
        button.state.startY = button.state.currentY = e.pageY;
        button.state.isMoving = true;

        update();
    }

    function _onButtonPointerMove(e) {
        var button = e.target;
        if (!button.state.isMoving) {
            return;
        }

        button.state.currentY = e.pageY;
        update();
    }

    function _onButtonPointerUp(e) {
        var button = e.target;

        if (!button.state.isMoving) {
            return;
        }

        button.classList.remove('pinch__button_pressed');
        button.state.currentY = e.pageY;
        button.state.isMoving = false;
    }

    function update() {
        checkCondition();

        buttons.forEach(function(b) {
            requestAnimationFrame(function() {
                b.style.transform = 'translateY(' + (b.state.currentY - b.state.startY) + 'px)';
            });
        });
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = false;

        if (buttons[0].state.currentY <= buttons[0].state.targetElementY &&
            buttons[1].state.currentY >= buttons[1].state.targetElementY) {
            isOpened = true;
        }

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
           _this.unlock();
        }
    }
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
