if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'game_of_life'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'game_of_life'.");
}
var game_of_life = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwUPAE = Kotlin.throwUPAE;
  var Unit = Kotlin.kotlin.Unit;
  var getCallableRef = Kotlin.getCallableRef;
  var numberToInt = Kotlin.numberToInt;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var print = Kotlin.kotlin.io.print_s8jyv4$;
  function clamp($receiver, min, max) {
    return $receiver < min ? $receiver : $receiver > max ? max : $receiver;
  }
  function main() {
    (new JSApplication()).run();
  }
  function initalizeCanvas() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    context.canvas.width = window.innerWidth - 10 | 0;
    context.canvas.height = window.innerHeight - 10 | 0;
    ensureNotNull(document.body).appendChild(canvas);
    return canvas;
  }
  function GridLayout(grid, x, y, width, height) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.slotWidth = 0;
    this.slotHeight = 0;
    this.slotWidth = this.width / this.grid.w;
    this.slotHeight = this.height / this.grid.h;
  }
  GridLayout.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GridLayout',
    interfaces: []
  };
  function V2(x, y) {
    this.x = x;
    this.y = y;
  }
  V2.prototype.set_lu1900$ = function (x, y) {
    this.x = x;
    this.y = y;
  };
  V2.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'V2',
    interfaces: []
  };
  function JSApplication() {
    this.golSpeed = 100;
    this.canvas_296s3p$_0 = this.canvas_296s3p$_0;
    this.context_6ij83y$_0 = this.context_6ij83y$_0;
    this.layout_c1wnkn$_0 = this.layout_c1wnkn$_0;
    this.grid_fyzz5f$_0 = this.grid_fyzz5f$_0;
    this.paused = false;
    this.mouse = new V2(0.0, 0.0);
    this.mouseDown = false;
    this.placementMode = -1;
  }
  Object.defineProperty(JSApplication.prototype, 'canvas', {
    get: function () {
      if (this.canvas_296s3p$_0 == null)
        return throwUPAE('canvas');
      return this.canvas_296s3p$_0;
    },
    set: function (canvas) {
      this.canvas_296s3p$_0 = canvas;
    }
  });
  Object.defineProperty(JSApplication.prototype, 'context', {
    get: function () {
      if (this.context_6ij83y$_0 == null)
        return throwUPAE('context');
      return this.context_6ij83y$_0;
    },
    set: function (context) {
      this.context_6ij83y$_0 = context;
    }
  });
  Object.defineProperty(JSApplication.prototype, 'layout', {
    get: function () {
      if (this.layout_c1wnkn$_0 == null)
        return throwUPAE('layout');
      return this.layout_c1wnkn$_0;
    },
    set: function (layout) {
      this.layout_c1wnkn$_0 = layout;
    }
  });
  Object.defineProperty(JSApplication.prototype, 'grid', {
    get: function () {
      if (this.grid_fyzz5f$_0 == null)
        return throwUPAE('grid');
      return this.grid_fyzz5f$_0;
    },
    set: function (grid) {
      this.grid_fyzz5f$_0 = grid;
    }
  });
  JSApplication.prototype.create = function () {
    var tmp$;
    this.canvas = initalizeCanvas();
    this.context = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
    var scale = 10;
    this.grid = new Grid(this.canvas.width / scale | 0, this.canvas.height / scale | 0);
    this.layout = new GridLayout(this.grid, this.canvas.offsetLeft, this.canvas.offsetTop, this.canvas.width, this.canvas.height);
    document.addEventListener('keydown', getCallableRef('onKeyDown', function ($receiver, raw) {
      return $receiver.onKeyDown_9ojx7i$(raw), Unit;
    }.bind(null, this)));
    document.addEventListener('mousedown', getCallableRef('onMouseDown', function ($receiver, raw) {
      return $receiver.onMouseDown_9ojx7i$(raw), Unit;
    }.bind(null, this)));
    document.addEventListener('mouseup', getCallableRef('onMouseUp', function ($receiver, raw) {
      return $receiver.onMouseUp_9ojx7i$(raw), Unit;
    }.bind(null, this)));
    document.addEventListener('mousemove', getCallableRef('onMouseMove', function ($receiver, raw) {
      return $receiver.onMouseMove_9ojx7i$(raw), Unit;
    }.bind(null, this)));
    this.canvas.addEventListener('click', getCallableRef('onMouseClicked', function ($receiver, raw) {
      return $receiver.onMouseClicked_9ojx7i$(raw), Unit;
    }.bind(null, this)));
    this.reset();
  };
  JSApplication.prototype.reset = function () {
    clear(this.grid);
    this.paused = true;
  };
  JSApplication.prototype.updateGoL = function () {
    if (!this.paused) {
      step(this.grid);
    }
  };
  function JSApplication$render$lambda(this$JSApplication) {
    return function (x, y) {
      var alive = this$JSApplication.grid.current[x][y] === 1;
      if (alive) {
        this$JSApplication.context.fillStyle = 'rgba(200, 30, 180, 1)';
        this$JSApplication.context.fillRect(x * this$JSApplication.layout.slotWidth, y * this$JSApplication.layout.slotHeight, this$JSApplication.layout.slotWidth, this$JSApplication.layout.slotHeight);
      }
      return Unit;
    };
  }
  var Math_0 = Math;
  JSApplication.prototype.render = function () {
    this.context.save();
    this.context.fillStyle = 'rgba(20, 30, 40, 1)';
    this.context.fillRect(0.0, 0.0, this.layout.width, this.layout.height);
    this.context.restore();
    this.context.save();
    scan(this.grid, JSApplication$render$lambda(this));
    this.context.restore();
    if (this.paused) {
      var baseY = this.layout.height * 50.0 / 100.0;
      var height = this.layout.height / 15.0;
      this.context.save();
      this.context.fillStyle = 'rgba(170, 80, 110, 0.25)';
      this.context.fillRect(0.0, 0.0, this.layout.width, this.layout.height);
      this.context.fillStyle = 'rgba(220, 80, 110, 0.9)';
      this.context.fillRect(0.0, baseY - height / 2.0, this.layout.width, height);
      this.context.restore();
      this.context.save();
      this.context.font = '16pt Arial';
      var msg = 'Controls: Mouse | [P]ause | [R]eset';
      var bounds = this.context.measureText(msg);
      var heightApproximation = this.context.measureText('A').width;
      this.context.fillStyle = 'rgba(255, 255, 255, 1)';
      this.context.fillText(msg, this.layout.width / 2.0 - bounds.width / 2.0, baseY + heightApproximation / 2.0);
      this.context.restore();
      var x = this.mouse.x / this.layout.slotWidth;
      var slotX = clamp(numberToInt(Math_0.floor(x)), 0, this.grid.w);
      var x_0 = this.mouse.y / this.layout.slotHeight;
      var slotY = clamp(numberToInt(Math_0.floor(x_0)), 0, this.grid.h);
      this.context.save();
      this.context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.context.fillRect(slotX * this.layout.slotWidth, slotY * this.layout.slotHeight, this.layout.slotWidth, this.layout.slotHeight);
      this.context.restore();
    }
  };
  JSApplication.prototype.onKeyDown_9ojx7i$ = function (raw) {
    var tmp$;
    var event = Kotlin.isType(tmp$ = raw, KeyboardEvent) ? tmp$ : throwCCE();
    switch (event.code) {
      case 'KeyP':
        this.paused = !this.paused;
        break;
      case 'KeyR':
        this.reset();
        break;
    }
  };
  JSApplication.prototype.onMouseDown_9ojx7i$ = function (raw) {
    var tmp$;
    var event = Kotlin.isType(tmp$ = raw, MouseEvent) ? tmp$ : throwCCE();
    var x = event.pageX - this.layout.x;
    var y = event.pageY - this.layout.y;
    this.mouse.set_lu1900$(x, y);
    this.mouseDown = true;
    if (this.paused) {
      if (this.mouseDown) {
        var x_0 = x / this.layout.slotWidth;
        var slotX = clamp(numberToInt(Math_0.floor(x_0)), 0, this.grid.w);
        var x_1 = y / this.layout.slotHeight;
        var slotY = clamp(numberToInt(Math_0.floor(x_1)), 0, this.grid.h);
        this.grid.current[slotX][slotY] = this.grid.current[slotX][slotY] === 0 ? 1 : 0;
        this.placementMode = this.grid.current[slotX][slotY];
      }
    }
  };
  JSApplication.prototype.onMouseUp_9ojx7i$ = function (raw) {
    var tmp$;
    var event = Kotlin.isType(tmp$ = raw, MouseEvent) ? tmp$ : throwCCE();
    var x = event.pageX - this.layout.x;
    var y = event.pageY - this.layout.y;
    this.mouse.set_lu1900$(x, y);
    this.mouseDown = false;
  };
  JSApplication.prototype.onMouseMove_9ojx7i$ = function (raw) {
    var tmp$;
    var event = Kotlin.isType(tmp$ = raw, MouseEvent) ? tmp$ : throwCCE();
    var x = event.pageX - this.layout.x;
    var y = event.pageY - this.layout.y;
    this.mouse.set_lu1900$(x, y);
    if (this.paused) {
      if (this.mouseDown) {
        var x_0 = x / this.layout.slotWidth;
        var slotX = clamp(numberToInt(Math_0.floor(x_0)), 0, this.grid.w);
        var x_1 = y / this.layout.slotHeight;
        var slotY = clamp(numberToInt(Math_0.floor(x_1)), 0, this.grid.h);
        this.grid.current[slotX][slotY] = this.placementMode;
      }
    }
  };
  JSApplication.prototype.onMouseClicked_9ojx7i$ = function (raw) {
    var tmp$;
    var event = Kotlin.isType(tmp$ = raw, MouseEvent) ? tmp$ : throwCCE();
    var x = event.pageX - this.layout.x;
    var y = event.pageY - this.layout.y;
  };
  function JSApplication$run$lambda(this$JSApplication) {
    return function () {
      this$JSApplication.render();
      return Unit;
    };
  }
  function JSApplication$run$lambda_0(this$JSApplication) {
    return function () {
      this$JSApplication.updateGoL();
      return Unit;
    };
  }
  JSApplication.prototype.run = function () {
    this.create();
    window.setInterval(JSApplication$run$lambda(this), 16);
    window.setInterval(JSApplication$run$lambda_0(this), this.golSpeed);
  };
  JSApplication.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'JSApplication',
    interfaces: []
  };
  var Array_0 = Array;
  function Grid(w, h) {
    this.w = w;
    this.h = h;
    var array = Array_0(this.w);
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      var array_0 = Array_0(this.h);
      var tmp$_0;
      tmp$_0 = array_0.length - 1 | 0;
      for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
        array_0[i_0] = 0;
      }
      array[i] = array_0;
    }
    this.current = array;
    var array_1 = Array_0(this.w);
    var tmp$_1;
    tmp$_1 = array_1.length - 1 | 0;
    for (var i_1 = 0; i_1 <= tmp$_1; i_1++) {
      var array_2 = Array_0(this.h);
      var tmp$_2;
      tmp$_2 = array_2.length - 1 | 0;
      for (var i_2 = 0; i_2 <= tmp$_2; i_2++) {
        array_2[i_2] = 0;
      }
      array_1[i_1] = array_2;
    }
    this.previous = array_1;
  }
  Grid.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Grid',
    interfaces: []
  };
  function scan($receiver, body) {
    var tmp$, tmp$_0;
    tmp$ = $receiver.w;
    for (var x = 0; x < tmp$; x++) {
      tmp$_0 = $receiver.h;
      for (var y = 0; y < tmp$_0; y++) {
        body(x, y);
      }
    }
  }
  var Random = Kotlin.kotlin.random.Random;
  var random = Kotlin.kotlin.ranges.random_xmiyix$;
  function randomize$lambda(closure$rng, this$randomize) {
    return function (x, y) {
      this$randomize.current[x][y] = random(closure$rng, Random.Default);
      return Unit;
    };
  }
  function randomize($receiver) {
    var rng = new IntRange(0, 1);
    scan($receiver, randomize$lambda(rng, $receiver));
  }
  function step$lambda(this$step) {
    return function (x, y) {
      this$step.previous[x][y] = this$step.current[x][y];
      return Unit;
    };
  }
  function step$lambda_0(this$step) {
    return function (x, y) {
      var neighbours = 0;
      var left = (x + this$step.w - 1 | 0) % this$step.w;
      var right = (x + 1 | 0) % this$step.w;
      var down = (y + this$step.h - 1 | 0) % this$step.h;
      var up = (y + 1 | 0) % this$step.h;
      neighbours = neighbours + (this$step.previous[left][y] > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (this$step.previous[right][y] > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (this$step.previous[x][down] > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (this$step.previous[x][up] > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (this$step.previous[left][down] > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (this$step.previous[right][down] > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (this$step.previous[left][up] > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (this$step.previous[right][up] > 0 ? 1 : 0) | 0;
      var alive = this$step.previous[x][y] === 1;
      if (alive && (2 <= neighbours && neighbours <= 3))
        this$step.current[x][y] = this$step.previous[x][y];
      else if (!alive && neighbours === 3)
        this$step.current[x][y] = 1;
      else
        this$step.current[x][y] = 0;
      return Unit;
    };
  }
  function step($receiver) {
    scan($receiver, step$lambda($receiver));
    scan($receiver, step$lambda_0($receiver));
  }
  function clear$lambda(this$clear) {
    return function (x, y) {
      this$clear.current[x][y] = 0;
      return Unit;
    };
  }
  function clear($receiver) {
    scan($receiver, clear$lambda($receiver));
  }
  function print_0($receiver) {
    var tmp$, tmp$_0;
    tmp$ = $receiver.w;
    for (var x = 0; x < tmp$; x++) {
      tmp$_0 = $receiver.h;
      for (var y = 0; y < tmp$_0; y++) {
        print($receiver.current[x][y]);
        print(' ');
      }
      print('\n');
    }
    print('\n');
  }
  _.clamp_e4yvb3$ = clamp;
  _.main = main;
  _.initalizeCanvas = initalizeCanvas;
  _.GridLayout = GridLayout;
  _.V2 = V2;
  _.JSApplication = JSApplication;
  var package$gol = _.gol || (_.gol = {});
  package$gol.Grid = Grid;
  package$gol.scan_w3mylu$ = scan;
  package$gol.randomize_nu4q73$ = randomize;
  package$gol.step_nu4q73$ = step;
  package$gol.clear_nu4q73$ = clear;
  package$gol.print_nu4q73$ = print_0;
  main();
  Kotlin.defineModule('game_of_life', _);
  return _;
}(typeof game_of_life === 'undefined' ? {} : game_of_life, kotlin);
