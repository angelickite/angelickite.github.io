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
  var Pair = Kotlin.kotlin.Pair;
  var numberToInt = Kotlin.numberToInt;
  var coerceIn = Kotlin.kotlin.ranges.coerceIn_e4yvb3$;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var print = Kotlin.kotlin.io.print_s8jyv4$;
  var max = Kotlin.kotlin.collections.max_tmsbgo$;
  var get_indices = Kotlin.kotlin.collections.get_indices_tmsbgo$;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  function main() {
    (new JSApplication()).run();
  }
  function initalizeCanvas() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    ensureNotNull(document.body).appendChild(canvas);
    return canvas;
  }
  function GridLayout(grid, x, y, width, height) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.slotWidth = this.width / this.grid.w | 0;
    this.slotHeight = this.height / this.grid.h | 0;
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
    this.slotSize = 20;
    this.canvas_296s3p$_0 = this.canvas_296s3p$_0;
    this.context_6ij83y$_0 = this.context_6ij83y$_0;
    this.layout_c1wnkn$_0 = this.layout_c1wnkn$_0;
    this.grid_fyzz5f$_0 = this.grid_fyzz5f$_0;
    this.paused = false;
    this.mouse = new V2(0.0, 0.0);
    this.mouseDown = false;
    this.placementMode = -1;
    this.placementTeam = 1;
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
    var tmp$_0 = this.getGridSize();
    var w = tmp$_0.component1()
    , h = tmp$_0.component2();
    this.grid = new Grid(w, h);
    this.layout = new GridLayout(this.grid, this.canvas.offsetLeft, this.canvas.offsetTop, this.canvas.width, this.canvas.height);
    this.reset();
  };
  JSApplication.prototype.reset = function () {
    clear(this.grid);
    this.paused = true;
  };
  JSApplication.prototype.getGridSize = function () {
    var scale = this.slotSize;
    return new Pair(this.canvas.width / scale | 0, this.canvas.height / scale | 0);
  };
  JSApplication.prototype.updateGoL = function () {
    if (!this.paused) {
      step(this.grid);
    }
  };
  function JSApplication$render$lambda(this$JSApplication) {
    return function (x, y) {
      var alive = this$JSApplication.grid.current[x][y] > 0;
      if (!alive)
        return;
      var color = this$JSApplication.getTeamColor_za3lpa$(this$JSApplication.grid.current[x][y]);
      this$JSApplication.context.fillStyle = color;
      this$JSApplication.context.fillRect(x * this$JSApplication.layout.slotWidth, y * this$JSApplication.layout.slotHeight, this$JSApplication.layout.slotWidth, this$JSApplication.layout.slotHeight);
      return Unit;
    };
  }
  var Math_0 = Math;
  JSApplication.prototype.render = function () {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    if (newWidth !== this.layout.width || newHeight !== this.layout.height) {
      this.context.canvas.width = newWidth;
      this.context.canvas.height = newHeight;
      var tmp$ = this.getGridSize();
      var w = tmp$.component1()
      , h = tmp$.component2();
      resize(this.grid, w, h);
      this.layout = new GridLayout(this.grid, this.canvas.offsetLeft, this.canvas.offsetTop, this.canvas.width, this.canvas.height);
    }
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
      this.context.fillStyle = 'rgba(220, 80, 110, 0.25)';
      this.context.fillRect(0.0, baseY - height / 2.0, this.layout.width, height);
      this.context.restore();
      this.context.save();
      this.context.font = '16pt Arial';
      var msg = 'Controls: Mouse | [1,2,3,4] Select Team | [S]tart and [S]top | [R]eset';
      var bounds = this.context.measureText(msg);
      var heightApproximation = this.context.measureText('A').width;
      this.context.fillStyle = 'rgba(255, 255, 255, 1)';
      this.context.fillText(msg, this.layout.width / 2.0 - bounds.width / 2.0, baseY + heightApproximation / 2.0);
      this.context.restore();
      var x = this.mouse.x / this.layout.slotWidth;
      var slotX = coerceIn(numberToInt(Math_0.floor(x)), 0, this.grid.w);
      var x_0 = this.mouse.y / this.layout.slotHeight;
      var slotY = coerceIn(numberToInt(Math_0.floor(x_0)), 0, this.grid.h);
      if (isWithinBounds(this.grid, slotX, slotY)) {
        this.context.save();
        this.context.fillStyle = this.getTeamColor_za3lpa$(this.placementTeam);
        this.context.fillRect(slotX * this.layout.slotWidth, slotY * this.layout.slotHeight, this.layout.slotWidth, this.layout.slotHeight);
        this.context.restore();
      }
    }
  };
  var IllegalStateException_init = Kotlin.kotlin.IllegalStateException_init_pdl1vj$;
  JSApplication.prototype.getTeamColor_za3lpa$ = function (team) {
    switch (team) {
      case 1:
        return 'rgba(220, 40, 40, 1)';
      case 2:
        return 'rgba(40, 220, 40, 1)';
      case 3:
        return 'rgba(40, 40, 220, 1)';
      case 4:
        return 'rgba(220, 220, 40, 1)';
      default:throw IllegalStateException_init(team.toString());
    }
  };
  JSApplication.prototype.onKeyDown_9ojx7i$ = function (raw) {
    var tmp$;
    var event = Kotlin.isType(tmp$ = raw, KeyboardEvent) ? tmp$ : throwCCE();
    switch (event.code) {
      case 'KeyS':
        this.paused = !this.paused;
        break;
      case 'KeyR':
        this.reset();
        break;
      case 'Digit1':
      case 'Numpad1':
        this.placementTeam = 1;
        break;
      case 'Digit2':
      case 'Numpad2':
        this.placementTeam = 2;
        break;
      case 'Digit3':
      case 'Numpad3':
        this.placementTeam = 3;
        break;
      case 'Digit4':
      case 'Numpad4':
        this.placementTeam = 4;
        break;
    }
  };
  JSApplication.prototype.onMouseDown_9ojx7i$ = function (raw) {
    var tmp$, tmp$_0;
    var event = Kotlin.isType(tmp$ = raw, MouseEvent) ? tmp$ : throwCCE();
    var x = event.pageX - this.layout.x;
    var y = event.pageY - this.layout.y;
    this.mouse.set_lu1900$(x, y);
    this.mouseDown = true;
    if (this.paused) {
      if (this.mouseDown) {
        var x_0 = x / this.layout.slotWidth;
        var slotX = coerceIn(numberToInt(Math_0.floor(x_0)), 0, this.grid.w);
        var x_1 = y / this.layout.slotHeight;
        var slotY = coerceIn(numberToInt(Math_0.floor(x_1)), 0, this.grid.h);
        if (this.grid.current[slotX][slotY] === 0)
          tmp$_0 = this.placementTeam;
        else if (this.grid.current[slotX][slotY] !== this.placementTeam)
          tmp$_0 = this.placementTeam;
        else
          tmp$_0 = 0;
        this.grid.current[slotX][slotY] = tmp$_0;
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
        var slotX = coerceIn(numberToInt(Math_0.floor(x_0)), 0, this.grid.w);
        var x_1 = y / this.layout.slotHeight;
        var slotY = coerceIn(numberToInt(Math_0.floor(x_1)), 0, this.grid.h);
        this.grid.current[slotX][slotY] = this.placementMode;
      }
    }
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
  function ratio(a, b) {
    return a / b;
  }
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
  function step$lambda$teamCount(closure$left, closure$right, closure$down, closure$up, closure$leftDown, closure$leftUp, closure$rightDown, closure$rightUp) {
    return function (team) {
      var count = 0;
      if (closure$left === team)
        count = count + 1 | 0;
      if (closure$right === team)
        count = count + 1 | 0;
      if (closure$down === team)
        count = count + 1 | 0;
      if (closure$up === team)
        count = count + 1 | 0;
      if (closure$leftDown === team)
        count = count + 1 | 0;
      if (closure$leftUp === team)
        count = count + 1 | 0;
      if (closure$rightDown === team)
        count = count + 1 | 0;
      if (closure$rightUp === team)
        count = count + 1 | 0;
      return count;
    };
  }
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var random_0 = Kotlin.kotlin.collections.random_iscd7z$;
  function step$lambda(this$step) {
    return function (x, y) {
      var xLeft = (x + this$step.w - 1 | 0) % this$step.w;
      var xRight = (x + 1 | 0) % this$step.w;
      var yDown = (y + this$step.h - 1 | 0) % this$step.h;
      var yUp = (y + 1 | 0) % this$step.h;
      var left = this$step.previous[xLeft][y];
      var right = this$step.previous[xRight][y];
      var down = this$step.previous[x][yDown];
      var up = this$step.previous[x][yUp];
      var leftDown = this$step.previous[xLeft][yDown];
      var leftUp = this$step.previous[xLeft][yUp];
      var rightDown = this$step.previous[xRight][yDown];
      var rightUp = this$step.previous[xRight][yUp];
      var neighbours = 0;
      neighbours = neighbours + (left > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (right > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (down > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (up > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (leftDown > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (leftUp > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (rightDown > 0 ? 1 : 0) | 0;
      neighbours = neighbours + (rightUp > 0 ? 1 : 0) | 0;
      var teamCount = step$lambda$teamCount(left, right, down, up, leftDown, leftUp, rightDown, rightUp);
      var team1 = teamCount(1);
      var team2 = teamCount(2);
      var team3 = teamCount(3);
      var team4 = teamCount(4);
      var strongestIndices = maxIndices(new Int32Array([team1, team2, team3, team4]));
      var destination = ArrayList_init(collectionSizeOrDefault(strongestIndices, 10));
      var tmp$;
      tmp$ = strongestIndices.iterator();
      while (tmp$.hasNext()) {
        var item = tmp$.next();
        destination.add_11rb$(1 + item | 0);
      }
      var strongestTeams = destination;
      var previous = this$step.previous[x][y];
      var alive = previous > 0;
      if (alive && (2 <= neighbours && neighbours <= 3)) {
        this$step.current[x][y] = strongestTeams.contains_11rb$(previous) ? previous : random_0(strongestTeams, Random.Default);
      }
       else if (!alive && neighbours === 3) {
        this$step.current[x][y] = random_0(strongestTeams, Random.Default);
      }
       else
        this$step.current[x][y] = 0;
      return Unit;
    };
  }
  function step($receiver) {
    var tmp = $receiver.previous;
    $receiver.previous = $receiver.current;
    $receiver.current = tmp;
    scan($receiver, step$lambda($receiver));
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
  function resize$lambda(closure$newWidth, closure$newHeight, this$resize, closure$newCurrent) {
    return function (x, y) {
      if (0 <= x && x < closure$newWidth && (0 <= y && y < closure$newHeight)) {
        closure$newCurrent.v[x][y] = this$resize.current[x][y];
      }
      return Unit;
    };
  }
  function resize($receiver, newWidth, newHeight) {
    var array = Array_0(newWidth);
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      var array_0 = Array_0(newHeight);
      var tmp$_0;
      tmp$_0 = array_0.length - 1 | 0;
      for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
        array_0[i_0] = 0;
      }
      array[i] = array_0;
    }
    var newCurrent = {v: array};
    var array_1 = Array_0(newWidth);
    var tmp$_1;
    tmp$_1 = array_1.length - 1 | 0;
    for (var i_1 = 0; i_1 <= tmp$_1; i_1++) {
      var array_2 = Array_0(newHeight);
      var tmp$_2;
      tmp$_2 = array_2.length - 1 | 0;
      for (var i_2 = 0; i_2 <= tmp$_2; i_2++) {
        array_2[i_2] = 0;
      }
      array_1[i_1] = array_2;
    }
    var newPrevious = array_1;
    scan($receiver, resize$lambda(newWidth, newHeight, $receiver, newCurrent));
    $receiver.w = newWidth;
    $receiver.h = newHeight;
    $receiver.current = newCurrent.v;
    $receiver.previous = newPrevious;
  }
  function isWithinBounds($receiver, x, y) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = $receiver.w;
    if (0 <= x && x < tmp$) {
      tmp$_0 = $receiver.h;
      tmp$_1 = (0 <= y && y < tmp$_0);
    }
     else
      tmp$_1 = false;
    return tmp$_1;
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
  function max_0(values) {
    return max(values);
  }
  function maxIndex(values) {
    var tmp$;
    var $receiver = get_indices(values);
    var maxBy$result;
    maxBy$break: do {
      var iterator = $receiver.iterator();
      if (!iterator.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator.next();
      var maxValue = values[maxElem];
      while (iterator.hasNext()) {
        var e = iterator.next();
        var v = values[e];
        if (Kotlin.compareTo(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    return (tmp$ = maxBy$result) != null ? tmp$ : null;
  }
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  function maxIndices(values) {
    var indices = ArrayList_init_0();
    var max = -2147483648;
    for (var index = 0; index !== values.length; ++index) {
      var value = values[index];
      if (value === max)
        indices.add_11rb$(index);
      else if (value > max) {
        max = value;
        indices.clear();
        indices.add_11rb$(index);
      }
    }
    return toList(indices);
  }
  _.main = main;
  _.initalizeCanvas = initalizeCanvas;
  _.GridLayout = GridLayout;
  _.V2 = V2;
  _.JSApplication = JSApplication;
  _.ratio_vux9f0$ = ratio;
  var package$gol = _.gol || (_.gol = {});
  package$gol.Grid = Grid;
  package$gol.scan_w3mylu$ = scan;
  package$gol.randomize_nu4q73$ = randomize;
  package$gol.step_nu4q73$ = step;
  package$gol.clear_nu4q73$ = clear;
  package$gol.resize_3vi24z$ = resize;
  package$gol.isWithinBounds_3vi24z$ = isWithinBounds;
  package$gol.print_nu4q73$ = print_0;
  _.max_pmhfmb$ = max_0;
  _.maxIndex_pmhfmb$ = maxIndex;
  _.maxIndices_pmhfmb$ = maxIndices;
  main();
  Kotlin.defineModule('game_of_life', _);
  return _;
}(typeof game_of_life === 'undefined' ? {} : game_of_life, kotlin);
