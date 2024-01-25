var Xr = Object.defineProperty;
var Zr = (e, n, r) => n in e ? Xr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r;
var H = (e, n, r) => (Zr(e, typeof n != "symbol" ? n + "" : n, r), r), Ge = (e, n, r) => {
  if (!n.has(e))
    throw TypeError("Cannot " + r);
};
var p = (e, n, r) => (Ge(e, n, "read from private field"), r ? r.call(e) : n.get(e)), v = (e, n, r) => {
  if (n.has(e))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(e) : n.set(e, r);
}, D = (e, n, r, i) => (Ge(e, n, "write to private field"), i ? i.call(e, r) : n.set(e, r), r);
var E = (e, n, r) => (Ge(e, n, "access private method"), r);
const Rn = (e) => !!e, Dn = (e) => typeof e == "number", Mn = (e) => typeof e == "string", Bn = (e) => typeof e == "boolean", jn = (e) => Array.isArray(e), Jr = (e) => Rn(e) && !(Dn(e) || Mn(e) || Bn(e) || jn(e));
function I(e, n) {
  e.classList.add(n);
}
function Ie(e, n) {
  n.forEach((r) => {
    e.classList.add(r);
  });
}
function d(e, n) {
  if (!e)
    throw new Error(n || "Assertion failed");
}
const Hn = (e, n = document) => n.getElementById(e), Pn = (e, n = document) => n.getElementsByClassName(e);
function ei(e, n, r) {
  let i = e;
  if (e && n != null && r) {
    let t = parseInt(n, 10);
    t < 0 && (t = e.length + t), t >= 0 && e.length > t && (i = `${e.slice(0, t)}${r}${e.slice(
      t + r.length
    )}`);
  }
  return i;
}
function Oe(e, n) {
  e.classList.remove(n);
}
function ue(e, n, r) {
  let i = e ?? "";
  return i = i.padEnd(n + 1, " "), ei(i, n, r);
}
let Xe = !1, J;
const he = { levels: ["log", "warn", "error"] };
typeof window > "u" && (he.handles = {
  log: process.stdout,
  warn: process.stdout,
  error: process.stderr
});
const ni = (e, n = { threshold: "log", timestamp: !1 }) => {
  Xe = !!e, Xe && (J = {
    threshold: he.levels.indexOf(n.threshold),
    timestamp: n.timestamp
  });
}, x = (e, n = "log") => {
  if (d(
    he.levels.includes(n),
    `Unsupported action'${n}'.`
  ), Xe && typeof (J == null ? void 0 : J.threshold) == "number" && he.levels.indexOf(n) >= J.threshold)
    if (typeof window < "u")
      console[n](e);
    else {
      const r = J.timestamp ? `${(/* @__PURE__ */ new Date()).toISOString()} ` : "";
      he.handles[n].write(
        r.concat(`${n.toUpperCase()}: ${e}
`)
      );
    }
}, ri = () => {
  const e = {}, n = e.hasOwnProperty;
  return {
    publish: (r, i) => {
      n.call(e, r) && e[r].forEach((t) => {
        t(i !== void 0 ? i : {});
      });
    },
    subscribe: (r, i) => {
      n.call(e, r) || (e[r] = []);
      const t = e[r].push(i) - 1;
      return {
        remove: () => {
          delete e[r][t];
        }
      };
    }
  };
};
var V;
class mn {
  constructor() {
    /** @type {Record<string, any>} */
    v(this, V, {});
    /**
     * Gets the DOM element for a modelCell.
     * @param {*} modelCell
     * @returns {HTMLDivElement}
     */
    H(this, "cellElement", (n) => (d(typeof n == "object", "Cell is not an object"), n.cellElement));
    //  Gets the modelCell for a DOM element.
    H(this, "modelCell", (n) => {
      switch (typeof n) {
        case "string":
          return p(this, V)[n];
        case "object":
          return p(this, V)[n.dataset.xy];
        default:
          d(!0, 'Unexpected type for "cellElement"');
          break;
      }
    });
  }
  /**
   * Adds a Cell <-> Cell Element mapping.
   * @param {*} modelCell
   * @param {HTMLDivElement} cellElement
   */
  add(n, r) {
    d(n, "modelCell is null or undefined"), d(r, "cellElement is null or undefined"), p(this, V)[r.dataset.xy] = n;
  }
  get modelCells() {
    return Object.values(p(this, V));
  }
}
V = new WeakMap();
function ii(e, n) {
  x("newCrosswordCluesView"), d(e, "[document] is null or undefined"), d(n, "[controller] is null or undefined"), d(n.model, "[controller.model] is null or undefined");
  function r(o, u) {
    let s = e.createElement("div");
    I(s, "crossword-clue-block"), s.id = o;
    let c = e.createElement("p");
    return c.innerHTML = u, I(c, "crossword-clue-block-title"), s.appendChild(c), s;
  }
  function i(o, u, s) {
    s.forEach((c) => {
      let f = e.createElement("div");
      I(f, "crossword-clue"), f.modelClue = c;
      let a = e.createElement("span");
      I(a, "crossword-clue-label"), a.innerHTML = `${c.labelText}`, f.appendChild(a);
      let m = e.createElement("span");
      I(m, "crossword-clue-text"), m.innerHTML = `${c.clueText} ${c.lengthText}`, f.appendChild(m), f.addEventListener("click", (g) => {
        x(`clue(${c.labelText}):click`), o.lastMoveEvent = "click", o.currentClue = c;
      }), u.appendChild(f);
    });
  }
  function t(o) {
    const u = n.currentClue;
    if (o === u)
      return !0;
    {
      const s = u.headSegment;
      return s === o || s.tailSegments.indexOf(o) !== -1;
    }
  }
  let l = {
    wrapper: e.createElement("div"),
    acrossClues: r("crossword-across-clues", "Across"),
    downClues: r("crossword-down-clues", "Down")
  };
  return Ie(l.wrapper, ["crosswords-js", "crossword-clues"]), i(n, l.acrossClues, n.model.acrossClues), l.wrapper.appendChild(l.acrossClues), i(n, l.downClues, n.model.downClues), l.wrapper.appendChild(l.downClues), n.addEventsListener(["clueSelected"], (o) => {
    for (const u of l.acrossClues.children)
      t(u.modelClue) ? I(u, "current-clue-segment") : Oe(u, "current-clue-segment");
    for (const u of l.downClues.children)
      t(u.modelClue) ? I(u, "current-clue-segment") : Oe(u, "current-clue-segment");
  }), l.wrapper;
}
function ti(e, n, r) {
  x("newCrosswordGridView"), d(
    e,
    "DOM root element [document] argument is null or undefined."
  ), d(n, "CrosswordModel [model] argument is null or undefined."), d(
    r,
    "CrosswordController [cellMap] argument is null or undefined."
  );
  let i = e.createElement("div");
  Ie(i, ["crosswords-js", "crossword-grid"]), i.style.setProperty("--row-count", n.height), i.style.setProperty("--column-count", n.width);
  for (let t = 0; t < n.height; t += 1)
    for (let l = 0; l < n.width; l += 1) {
      const o = n.cells[l][t], u = li(e, o);
      r.add(o, u), i.appendChild(u);
    }
  return i;
}
function li(e, n) {
  let r = e.createElement("div");
  if (r.dataset.xy = n, I(r, "cwcell"), n.cellElement = r, I(r, n.light ? "light" : "dark"), !n.light)
    return r;
  if (r.tabIndex = 0, I(r, "noselect"), r.appendChild(new Text(n.answer ?? " ")), n.labelText) {
    const l = e.createElement("div");
    I(l, "cwclue-label"), l.innerHTML = n.labelText, r.appendChild(l);
  }
  const i = e.createElement("div");
  Ie(i, ["cwcell-revealed", "hidden"]), r.appendChild(i);
  const t = e.createElement("div");
  return Ie(t, ["cwcell-incorrect", "hidden"]), r.appendChild(t), n.acrossTerminator && I(r, "cw-across-word-separator"), n.downTerminator && I(r, "cw-down-word-separator"), r;
}
function Un(e, n) {
  const [r, i, t] = [
    n,
    e,
    n.acrossClue && n.downClue
  ];
  return t && (x("toggleClueDirection"), i.currentClue = r.acrossClue === i.currentClue ? r.downClue : r.acrossClue), t;
}
function Yn(e, n) {
  const [r, , i] = [
    n,
    e,
    e.currentClue
  ], o = (r.acrossClue === i ? r.acrossClueLetterIndex : r.downClueLetterIndex) + 1 === i.cells.length && i.nextClueSegment;
  return o && (cc.currentClue = i.nextClueSegment), o;
}
function Kn(e, n) {
  const [r, i] = [n, e], t = i.currentClue, u = (r.acrossClue === t ? r.acrossClueLetterIndex : r.downClueLetterIndex) - 1 === -1 && t.previousClueSegment;
  return u && (i.currentCell = t.previousClueSegment.cells.slice(-1)[0], i.currentClue = t.previousClueSegment), u;
}
function Vn(e, n) {
  const { x: r, y: i } = n, { height: t } = n.model;
  let l = !1;
  return n.y + 1 < t && n.model.cells[r][i + 1].light === !0 ? (e.currentCell = n.model.cells[r][i + 1], l = !0) : l = Yn(e, n), l;
}
function qn(e, n) {
  const { x: r, y: i } = n, { width: t } = n.model;
  let l = !1;
  return n.x + 1 < t && n.model.cells[r + 1][i].light === !0 ? (e.currentCell = n.model.cells[r + 1][i], l = !0) : l = Yn(e, n), l;
}
function Gn(e, n) {
  const { x: r, y: i } = n;
  let t = !1;
  return n.y > 0 && n.model.cells[r][i - 1].light === !0 ? (e.currentCell = n.model.cells[r][i - 1], t = !0) : t = Kn(e, n), t;
}
function Wn(e, n) {
  const { x: r, y: i } = n;
  let t = !1;
  return n.x > 0 && n.model.cells[r - 1][i].light === !0 ? (e.currentCell = n.model.cells[r - 1][i], t = !0) : t = Kn(e, n), t;
}
function Qn(e, n) {
  if (e.currentClue === n.acrossClue)
    return qn(e, n);
  if (e.currentClue === n.downClue)
    return Vn(e, n);
}
function gn(e, n) {
  if (e.currentClue === n.acrossClue)
    return Wn(e, n);
  if (e.currentClue === n.downClue)
    return Gn(e, n);
}
const zn = (e, n) => n.isAcross ? [
  e.acrossClues.headSegments,
  e.downClues.headSegments
] : [
  e.downClues.headSegments,
  e.acrossClues.headSegments
];
function oi(e, n) {
  const r = e.currentClue.headSegment, [i, t] = zn(n.model, r), l = i.indexOf(r);
  d(l !== -1, `clue '${r.clueId}' not found in headClues`), e.currentClue = l === i.length - 1 ? (
    // current head is last - flip direction, get first head clue
    t[0]
  ) : (
    // get next head
    i[l + 1]
  );
}
function ui(e, n) {
  const r = e.currentClue.headSegment, [i, t] = zn(n.model, r), l = i.indexOf(r);
  d(l !== -1, `clue '${r.clueId}' not found in headClues`), e.currentClue = l === 0 ? (
    // current head is first - flip direction, get last head clue
    t.slice(-1)[0]
  ) : (
    // get previous head
    i[l - 1]
  );
}
function xn(e, n, r) {
  Xn(e, n, " "), se(e.incorrectElement(r));
}
function Xn(e, n, r) {
  const i = e.cell(n.target);
  n.target.firstChild.nodeValue = r, i.acrossClue && (i.acrossClue.answer = ue(
    i.acrossClue.answer,
    i.acrossClueLetterIndex,
    r
  )), i.downClue && (i.downClue.answer = ue(
    i.downClue.answer,
    i.downClueLetterIndex,
    r
  ));
}
const se = (e) => {
  e == null || e.classList.add("hidden");
}, Zn = (e) => {
  e == null || e.classList.remove("hidden");
};
function si(e, n, r) {
  d(n, "newClue is undefined"), r == null || r.headSegment.flatCells.forEach((i) => {
    Oe(e.cellElement(i), "active");
  }), n.headSegment.flatCells.forEach((i) => {
    I(e.cellElement(i), "active");
  });
}
function ci(e, n, r) {
  d(n, "newCell is undefined"), r && Oe(e.cellElement(r), "highlighted"), I(e.cellElement(n), "highlighted");
}
const M = Object.freeze({
  backspace: "Backspace",
  delete: "Delete",
  down: "ArrowDown",
  enter: "Enter",
  left: "ArrowLeft",
  right: "ArrowRight",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  shift: "Shift",
  alt: "Alt",
  ctrl: "Control",
  name: (e) => {
    const n = Object.entries(M).find(
      (r) => r[1] === e
    );
    return n ? n[0] : null;
  }
});
function on(e, n) {
  var o;
  d(e, "<controller> is null or undefined"), d(n, "<cell> is null or undefined");
  const r = n.acrossClue ? n.acrossClue : n.downClue, i = n.acrossClue ? n.acrossClueLetterIndex : n.downClueLetterIndex, t = i < ((o = r.solution) == null ? void 0 : o.length) ? r.solution[i] : " ";
  Ve(e, n, t, !1), Zn(e.revealedElement(n)), se(e.incorrectElement(n));
}
function ai(e, n) {
  d(e, "<controller> is null or undefined"), d(n, "<clue> is null or undefined"), x(`revealClue: '${n}'`), n.headSegment.flatCells.forEach((r) => {
    on(e, r);
  });
}
function fi(e) {
  d(e, "<controller> is null or undefined"), e.model.lightCells.forEach((n) => {
    on(e, n);
  });
}
const _ = Object.freeze({
  correct: 0,
  // 0 elements empty, N elements correct
  incorrect: 1,
  // 1+ elements incorrect
  incomplete: 2
  // 1+ elements empty, 0 elements incorrect
});
function Ye(e, n) {
  return e ? _.incorrect : n ? _.incomplete : _.correct;
}
function Ke(e, n, r = !0) {
  d(e, "<controller> is null or undefined"), d(n, "<cell> is null or undefined");
  const [i, t] = n.acrossClue ? [n.acrossClue, n.acrossClueLetterIndex] : [n.downClue, n.downClueLetterIndex], l = i.answer[t], o = i.solution ? i.solution[t] : void 0, u = Ye(
    !(l === o || l === " "),
    l === " " || l === void 0
  );
  return u === _.incorrect && r && Zn(e.incorrectElement(n)), u;
}
function di(e, n, r = !0) {
  d(e, "<controller> is null or undefined"), d(n, "<clue> is null or undefined"), x(`testClue: '${n}'`);
  let i = 0, t = 0;
  return n.headSegment.flatCells.forEach((l) => {
    const o = Ke(e, l, r);
    o === _.incorrect ? i += 1 : o === _.incomplete && (t += 1);
  }), Ye(i > 0, t > 0);
}
function hi(e, n = !0) {
  d(e, "<controller> is null or undefined");
  let r = 0, i = 0;
  return e.model.lightCells.forEach((t) => {
    const l = Ke(e, t, n);
    l === _.incorrect ? r += 1 : l === _.incomplete && (i += 1);
  }), Ye(r > 0, i > 0);
}
function pi(e) {
  d(e, "<controller> is null or undefined");
  let n = 0, r = 0;
  const i = !1;
  return e.model.lightCells.find((t) => {
    const l = Ke(e, t, i);
    if (l === _.incorrect)
      return n += 1, !0;
    if (l === _.incomplete)
      return r += 1, !0;
  }), Ye(n > 0, r > 0);
}
function Ve(e, n, r, i = !0) {
  d(e, "<controller> is null or undefined"), d(
    (n == null ? void 0 : n.acrossClue) || (n == null ? void 0 : n.downClue),
    "cell is null or not part of a clue"
  ), d((r == null ? void 0 : r.length) === 1, "newText must be a single character");
  function t(l, o) {
    let u = l;
    u.answer = ue(u.answer, o, r), i && (u.revealed = ue(u.revealed, o, r));
  }
  if (n.acrossClue) {
    let l = n.acrossClue;
    const o = n.acrossClueLetterIndex;
    t(l, o);
  }
  if (n.downClue) {
    let l = n.downClue;
    const o = n.downClueLetterIndex;
    t(l, o);
  }
  e.setCellElementText(n, r);
}
function Jn(e, n, r = !1) {
  d(e, "<controller> is null or undefined"), d(n, "<cell> is null or undefined"), Ve(e, n, " "), se(e.incorrectElement(n)), r && se(e.revealedElement(n));
}
function mi(e, n) {
  d(e, "<controller> is null or undefined"), d(n, "<clue> is null or undefined"), x(`resetClue: '${n}'`), n.headSegment.flatCells.forEach((r) => {
    Jn(e, r);
  });
}
function gi(e) {
  d(e, "<controller> is null or undefined"), e.model.lightCells.forEach((n) => {
    Jn(e, n, !0);
  });
}
function er(e, n) {
  d(e, "<controller> is null or undefined"), d(n, "<cell> is null or undefined");
  const r = Ke(e, n) === _.incorrect;
  r && (Ve(e, n, " ", r), se(e.incorrectElement(n)));
}
function xi(e, n) {
  d(e, "<controller> is null or undefined"), d(n, "<clue> is null or undefined"), x(`cleanClue: '${n}'`), n.headSegment.flatCells.forEach((r) => {
    er(e, r);
  });
}
function Ci(e) {
  x("cleanCrossword"), d(e, "<controller> is null or undefined"), e.model.lightCells.forEach((n) => {
    er(e, n);
  });
}
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function nr(e) {
  return typeof e > "u" || e === null;
}
function wi(e) {
  return typeof e == "object" && e !== null;
}
function vi(e) {
  return Array.isArray(e) ? e : nr(e) ? [] : [e];
}
function yi(e, n) {
  var r, i, t, l;
  if (n)
    for (l = Object.keys(n), r = 0, i = l.length; r < i; r += 1)
      t = l[r], e[t] = n[t];
  return e;
}
function Ei(e, n) {
  var r = "", i;
  for (i = 0; i < n; i += 1)
    r += e;
  return r;
}
function Ai(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
var bi = nr, Si = wi, Ti = vi, _i = Ei, Li = Ai, ki = yi, S = {
  isNothing: bi,
  isObject: Si,
  toArray: Ti,
  repeat: _i,
  isNegativeZero: Li,
  extend: ki
};
function rr(e, n) {
  var r = "", i = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !n && e.mark.snippet && (r += `

` + e.mark.snippet), i + " " + r) : i;
}
function pe(e, n) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = n, this.message = rr(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
pe.prototype = Object.create(Error.prototype);
pe.prototype.constructor = pe;
pe.prototype.toString = function(n) {
  return this.name + ": " + rr(this, n);
};
var O = pe;
function We(e, n, r, i, t) {
  var l = "", o = "", u = Math.floor(t / 2) - 1;
  return i - n > u && (l = " ... ", n = i - u + l.length), r - i > u && (o = " ...", r = i + u - o.length), {
    str: l + e.slice(n, r).replace(/\t/g, "→") + o,
    pos: i - n + l.length
    // relative position
  };
}
function Qe(e, n) {
  return S.repeat(" ", n - e.length) + e;
}
function Ii(e, n) {
  if (n = Object.create(n || null), !e.buffer)
    return null;
  n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, i = [0], t = [], l, o = -1; l = r.exec(e.buffer); )
    t.push(l.index), i.push(l.index + l[0].length), e.position <= l.index && o < 0 && (o = i.length - 2);
  o < 0 && (o = i.length - 1);
  var u = "", s, c, f = Math.min(e.line + n.linesAfter, t.length).toString().length, a = n.maxLength - (n.indent + f + 3);
  for (s = 1; s <= n.linesBefore && !(o - s < 0); s++)
    c = We(
      e.buffer,
      i[o - s],
      t[o - s],
      e.position - (i[o] - i[o - s]),
      a
    ), u = S.repeat(" ", n.indent) + Qe((e.line - s + 1).toString(), f) + " | " + c.str + `
` + u;
  for (c = We(e.buffer, i[o], t[o], e.position, a), u += S.repeat(" ", n.indent) + Qe((e.line + 1).toString(), f) + " | " + c.str + `
`, u += S.repeat("-", n.indent + f + 3 + c.pos) + `^
`, s = 1; s <= n.linesAfter && !(o + s >= t.length); s++)
    c = We(
      e.buffer,
      i[o + s],
      t[o + s],
      e.position - (i[o] - i[o + s]),
      a
    ), u += S.repeat(" ", n.indent) + Qe((e.line + s + 1).toString(), f) + " | " + c.str + `
`;
  return u.replace(/\n$/, "");
}
var Oi = Ii, Fi = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], $i = [
  "scalar",
  "sequence",
  "mapping"
];
function Ni(e) {
  var n = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(i) {
      n[String(i)] = r;
    });
  }), n;
}
function Ri(e, n) {
  if (n = n || {}, Object.keys(n).forEach(function(r) {
    if (Fi.indexOf(r) === -1)
      throw new O('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = n, this.tag = e, this.kind = n.kind || null, this.resolve = n.resolve || function() {
    return !0;
  }, this.construct = n.construct || function(r) {
    return r;
  }, this.instanceOf = n.instanceOf || null, this.predicate = n.predicate || null, this.represent = n.represent || null, this.representName = n.representName || null, this.defaultStyle = n.defaultStyle || null, this.multi = n.multi || !1, this.styleAliases = Ni(n.styleAliases || null), $i.indexOf(this.kind) === -1)
    throw new O('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var T = Ri;
function Cn(e, n) {
  var r = [];
  return e[n].forEach(function(i) {
    var t = r.length;
    r.forEach(function(l, o) {
      l.tag === i.tag && l.kind === i.kind && l.multi === i.multi && (t = o);
    }), r[t] = i;
  }), r;
}
function Di() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, n, r;
  function i(t) {
    t.multi ? (e.multi[t.kind].push(t), e.multi.fallback.push(t)) : e[t.kind][t.tag] = e.fallback[t.tag] = t;
  }
  for (n = 0, r = arguments.length; n < r; n += 1)
    arguments[n].forEach(i);
  return e;
}
function Ze(e) {
  return this.extend(e);
}
Ze.prototype.extend = function(n) {
  var r = [], i = [];
  if (n instanceof T)
    i.push(n);
  else if (Array.isArray(n))
    i = i.concat(n);
  else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
    n.implicit && (r = r.concat(n.implicit)), n.explicit && (i = i.concat(n.explicit));
  else
    throw new O("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(l) {
    if (!(l instanceof T))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (l.loadKind && l.loadKind !== "scalar")
      throw new O("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (l.multi)
      throw new O("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), i.forEach(function(l) {
    if (!(l instanceof T))
      throw new O("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var t = Object.create(Ze.prototype);
  return t.implicit = (this.implicit || []).concat(r), t.explicit = (this.explicit || []).concat(i), t.compiledImplicit = Cn(t, "implicit"), t.compiledExplicit = Cn(t, "explicit"), t.compiledTypeMap = Di(t.compiledImplicit, t.compiledExplicit), t;
};
var ir = Ze, tr = new T("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), lr = new T("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), or = new T("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), ur = new ir({
  explicit: [
    tr,
    lr,
    or
  ]
});
function Mi(e) {
  if (e === null)
    return !0;
  var n = e.length;
  return n === 1 && e === "~" || n === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Bi() {
  return null;
}
function ji(e) {
  return e === null;
}
var sr = new T("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Mi,
  construct: Bi,
  predicate: ji,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function Hi(e) {
  if (e === null)
    return !1;
  var n = e.length;
  return n === 4 && (e === "true" || e === "True" || e === "TRUE") || n === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Pi(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Ui(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var cr = new T("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Hi,
  construct: Pi,
  predicate: Ui,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function Yi(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Ki(e) {
  return 48 <= e && e <= 55;
}
function Vi(e) {
  return 48 <= e && e <= 57;
}
function qi(e) {
  if (e === null)
    return !1;
  var n = e.length, r = 0, i = !1, t;
  if (!n)
    return !1;
  if (t = e[r], (t === "-" || t === "+") && (t = e[++r]), t === "0") {
    if (r + 1 === n)
      return !0;
    if (t = e[++r], t === "b") {
      for (r++; r < n; r++)
        if (t = e[r], t !== "_") {
          if (t !== "0" && t !== "1")
            return !1;
          i = !0;
        }
      return i && t !== "_";
    }
    if (t === "x") {
      for (r++; r < n; r++)
        if (t = e[r], t !== "_") {
          if (!Yi(e.charCodeAt(r)))
            return !1;
          i = !0;
        }
      return i && t !== "_";
    }
    if (t === "o") {
      for (r++; r < n; r++)
        if (t = e[r], t !== "_") {
          if (!Ki(e.charCodeAt(r)))
            return !1;
          i = !0;
        }
      return i && t !== "_";
    }
  }
  if (t === "_")
    return !1;
  for (; r < n; r++)
    if (t = e[r], t !== "_") {
      if (!Vi(e.charCodeAt(r)))
        return !1;
      i = !0;
    }
  return !(!i || t === "_");
}
function Gi(e) {
  var n = e, r = 1, i;
  if (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")), i = n[0], (i === "-" || i === "+") && (i === "-" && (r = -1), n = n.slice(1), i = n[0]), n === "0")
    return 0;
  if (i === "0") {
    if (n[1] === "b")
      return r * parseInt(n.slice(2), 2);
    if (n[1] === "x")
      return r * parseInt(n.slice(2), 16);
    if (n[1] === "o")
      return r * parseInt(n.slice(2), 8);
  }
  return r * parseInt(n, 10);
}
function Wi(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !S.isNegativeZero(e);
}
var ar = new T("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: qi,
  construct: Gi,
  predicate: Wi,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), Qi = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function zi(e) {
  return !(e === null || !Qi.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Xi(e) {
  var n, r;
  return n = e.replace(/_/g, "").toLowerCase(), r = n[0] === "-" ? -1 : 1, "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)), n === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : n === ".nan" ? NaN : r * parseFloat(n, 10);
}
var Zi = /^[-+]?[0-9]+e/;
function Ji(e, n) {
  var r;
  if (isNaN(e))
    switch (n) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (n) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (n) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (S.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Zi.test(r) ? r.replace("e", ".e") : r;
}
function et(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || S.isNegativeZero(e));
}
var fr = new T("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: zi,
  construct: Xi,
  predicate: et,
  represent: Ji,
  defaultStyle: "lowercase"
}), dr = ur.extend({
  implicit: [
    sr,
    cr,
    ar,
    fr
  ]
}), hr = dr, pr = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), mr = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function nt(e) {
  return e === null ? !1 : pr.exec(e) !== null || mr.exec(e) !== null;
}
function rt(e) {
  var n, r, i, t, l, o, u, s = 0, c = null, f, a, m;
  if (n = pr.exec(e), n === null && (n = mr.exec(e)), n === null)
    throw new Error("Date resolve error");
  if (r = +n[1], i = +n[2] - 1, t = +n[3], !n[4])
    return new Date(Date.UTC(r, i, t));
  if (l = +n[4], o = +n[5], u = +n[6], n[7]) {
    for (s = n[7].slice(0, 3); s.length < 3; )
      s += "0";
    s = +s;
  }
  return n[9] && (f = +n[10], a = +(n[11] || 0), c = (f * 60 + a) * 6e4, n[9] === "-" && (c = -c)), m = new Date(Date.UTC(r, i, t, l, o, u, s)), c && m.setTime(m.getTime() - c), m;
}
function it(e) {
  return e.toISOString();
}
var gr = new T("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: nt,
  construct: rt,
  instanceOf: Date,
  represent: it
});
function tt(e) {
  return e === "<<" || e === null;
}
var xr = new T("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: tt
}), un = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function lt(e) {
  if (e === null)
    return !1;
  var n, r, i = 0, t = e.length, l = un;
  for (r = 0; r < t; r++)
    if (n = l.indexOf(e.charAt(r)), !(n > 64)) {
      if (n < 0)
        return !1;
      i += 6;
    }
  return i % 8 === 0;
}
function ot(e) {
  var n, r, i = e.replace(/[\r\n=]/g, ""), t = i.length, l = un, o = 0, u = [];
  for (n = 0; n < t; n++)
    n % 4 === 0 && n && (u.push(o >> 16 & 255), u.push(o >> 8 & 255), u.push(o & 255)), o = o << 6 | l.indexOf(i.charAt(n));
  return r = t % 4 * 6, r === 0 ? (u.push(o >> 16 & 255), u.push(o >> 8 & 255), u.push(o & 255)) : r === 18 ? (u.push(o >> 10 & 255), u.push(o >> 2 & 255)) : r === 12 && u.push(o >> 4 & 255), new Uint8Array(u);
}
function ut(e) {
  var n = "", r = 0, i, t, l = e.length, o = un;
  for (i = 0; i < l; i++)
    i % 3 === 0 && i && (n += o[r >> 18 & 63], n += o[r >> 12 & 63], n += o[r >> 6 & 63], n += o[r & 63]), r = (r << 8) + e[i];
  return t = l % 3, t === 0 ? (n += o[r >> 18 & 63], n += o[r >> 12 & 63], n += o[r >> 6 & 63], n += o[r & 63]) : t === 2 ? (n += o[r >> 10 & 63], n += o[r >> 4 & 63], n += o[r << 2 & 63], n += o[64]) : t === 1 && (n += o[r >> 2 & 63], n += o[r << 4 & 63], n += o[64], n += o[64]), n;
}
function st(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Cr = new T("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: lt,
  construct: ot,
  predicate: st,
  represent: ut
}), ct = Object.prototype.hasOwnProperty, at = Object.prototype.toString;
function ft(e) {
  if (e === null)
    return !0;
  var n = [], r, i, t, l, o, u = e;
  for (r = 0, i = u.length; r < i; r += 1) {
    if (t = u[r], o = !1, at.call(t) !== "[object Object]")
      return !1;
    for (l in t)
      if (ct.call(t, l))
        if (!o)
          o = !0;
        else
          return !1;
    if (!o)
      return !1;
    if (n.indexOf(l) === -1)
      n.push(l);
    else
      return !1;
  }
  return !0;
}
function dt(e) {
  return e !== null ? e : [];
}
var wr = new T("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: ft,
  construct: dt
}), ht = Object.prototype.toString;
function pt(e) {
  if (e === null)
    return !0;
  var n, r, i, t, l, o = e;
  for (l = new Array(o.length), n = 0, r = o.length; n < r; n += 1) {
    if (i = o[n], ht.call(i) !== "[object Object]" || (t = Object.keys(i), t.length !== 1))
      return !1;
    l[n] = [t[0], i[t[0]]];
  }
  return !0;
}
function mt(e) {
  if (e === null)
    return [];
  var n, r, i, t, l, o = e;
  for (l = new Array(o.length), n = 0, r = o.length; n < r; n += 1)
    i = o[n], t = Object.keys(i), l[n] = [t[0], i[t[0]]];
  return l;
}
var vr = new T("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: pt,
  construct: mt
}), gt = Object.prototype.hasOwnProperty;
function xt(e) {
  if (e === null)
    return !0;
  var n, r = e;
  for (n in r)
    if (gt.call(r, n) && r[n] !== null)
      return !1;
  return !0;
}
function Ct(e) {
  return e !== null ? e : {};
}
var yr = new T("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: xt,
  construct: Ct
}), sn = hr.extend({
  implicit: [
    gr,
    xr
  ],
  explicit: [
    Cr,
    wr,
    vr,
    yr
  ]
}), K = Object.prototype.hasOwnProperty, Fe = 1, Er = 2, Ar = 3, $e = 4, ze = 1, wt = 2, wn = 3, vt = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, yt = /[\x85\u2028\u2029]/, Et = /[,\[\]\{\}]/, br = /^(?:!|!!|![a-z\-]+!)$/i, Sr = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function vn(e) {
  return Object.prototype.toString.call(e);
}
function B(e) {
  return e === 10 || e === 13;
}
function z(e) {
  return e === 9 || e === 32;
}
function F(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function re(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function At(e) {
  var n;
  return 48 <= e && e <= 57 ? e - 48 : (n = e | 32, 97 <= n && n <= 102 ? n - 97 + 10 : -1);
}
function bt(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function St(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function yn(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Tt(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Tr = new Array(256), _r = new Array(256);
for (var Z = 0; Z < 256; Z++)
  Tr[Z] = yn(Z) ? 1 : 0, _r[Z] = yn(Z);
function _t(e, n) {
  this.input = e, this.filename = n.filename || null, this.schema = n.schema || sn, this.onWarning = n.onWarning || null, this.legacy = n.legacy || !1, this.json = n.json || !1, this.listener = n.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Lr(e, n) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = Oi(r), new O(n, r);
}
function h(e, n) {
  throw Lr(e, n);
}
function Ne(e, n) {
  e.onWarning && e.onWarning.call(null, Lr(e, n));
}
var En = {
  YAML: function(n, r, i) {
    var t, l, o;
    n.version !== null && h(n, "duplication of %YAML directive"), i.length !== 1 && h(n, "YAML directive accepts exactly one argument"), t = /^([0-9]+)\.([0-9]+)$/.exec(i[0]), t === null && h(n, "ill-formed argument of the YAML directive"), l = parseInt(t[1], 10), o = parseInt(t[2], 10), l !== 1 && h(n, "unacceptable YAML version of the document"), n.version = i[0], n.checkLineBreaks = o < 2, o !== 1 && o !== 2 && Ne(n, "unsupported YAML version of the document");
  },
  TAG: function(n, r, i) {
    var t, l;
    i.length !== 2 && h(n, "TAG directive accepts exactly two arguments"), t = i[0], l = i[1], br.test(t) || h(n, "ill-formed tag handle (first argument) of the TAG directive"), K.call(n.tagMap, t) && h(n, 'there is a previously declared suffix for "' + t + '" tag handle'), Sr.test(l) || h(n, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      l = decodeURIComponent(l);
    } catch {
      h(n, "tag prefix is malformed: " + l);
    }
    n.tagMap[t] = l;
  }
};
function Y(e, n, r, i) {
  var t, l, o, u;
  if (n < r) {
    if (u = e.input.slice(n, r), i)
      for (t = 0, l = u.length; t < l; t += 1)
        o = u.charCodeAt(t), o === 9 || 32 <= o && o <= 1114111 || h(e, "expected valid JSON character");
    else
      vt.test(u) && h(e, "the stream contains non-printable characters");
    e.result += u;
  }
}
function An(e, n, r, i) {
  var t, l, o, u;
  for (S.isObject(r) || h(e, "cannot merge mappings; the provided source object is unacceptable"), t = Object.keys(r), o = 0, u = t.length; o < u; o += 1)
    l = t[o], K.call(n, l) || (n[l] = r[l], i[l] = !0);
}
function ie(e, n, r, i, t, l, o, u, s) {
  var c, f;
  if (Array.isArray(t))
    for (t = Array.prototype.slice.call(t), c = 0, f = t.length; c < f; c += 1)
      Array.isArray(t[c]) && h(e, "nested arrays are not supported inside keys"), typeof t == "object" && vn(t[c]) === "[object Object]" && (t[c] = "[object Object]");
  if (typeof t == "object" && vn(t) === "[object Object]" && (t = "[object Object]"), t = String(t), n === null && (n = {}), i === "tag:yaml.org,2002:merge")
    if (Array.isArray(l))
      for (c = 0, f = l.length; c < f; c += 1)
        An(e, n, l[c], r);
    else
      An(e, n, l, r);
  else
    !e.json && !K.call(r, t) && K.call(n, t) && (e.line = o || e.line, e.lineStart = u || e.lineStart, e.position = s || e.position, h(e, "duplicated mapping key")), t === "__proto__" ? Object.defineProperty(n, t, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: l
    }) : n[t] = l, delete r[t];
  return n;
}
function cn(e) {
  var n;
  n = e.input.charCodeAt(e.position), n === 10 ? e.position++ : n === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : h(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function b(e, n, r) {
  for (var i = 0, t = e.input.charCodeAt(e.position); t !== 0; ) {
    for (; z(t); )
      t === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), t = e.input.charCodeAt(++e.position);
    if (n && t === 35)
      do
        t = e.input.charCodeAt(++e.position);
      while (t !== 10 && t !== 13 && t !== 0);
    if (B(t))
      for (cn(e), t = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; t === 32; )
        e.lineIndent++, t = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && i !== 0 && e.lineIndent < r && Ne(e, "deficient indentation"), i;
}
function qe(e) {
  var n = e.position, r;
  return r = e.input.charCodeAt(n), !!((r === 45 || r === 46) && r === e.input.charCodeAt(n + 1) && r === e.input.charCodeAt(n + 2) && (n += 3, r = e.input.charCodeAt(n), r === 0 || F(r)));
}
function an(e, n) {
  n === 1 ? e.result += " " : n > 1 && (e.result += S.repeat(`
`, n - 1));
}
function Lt(e, n, r) {
  var i, t, l, o, u, s, c, f, a = e.kind, m = e.result, g;
  if (g = e.input.charCodeAt(e.position), F(g) || re(g) || g === 35 || g === 38 || g === 42 || g === 33 || g === 124 || g === 62 || g === 39 || g === 34 || g === 37 || g === 64 || g === 96 || (g === 63 || g === 45) && (t = e.input.charCodeAt(e.position + 1), F(t) || r && re(t)))
    return !1;
  for (e.kind = "scalar", e.result = "", l = o = e.position, u = !1; g !== 0; ) {
    if (g === 58) {
      if (t = e.input.charCodeAt(e.position + 1), F(t) || r && re(t))
        break;
    } else if (g === 35) {
      if (i = e.input.charCodeAt(e.position - 1), F(i))
        break;
    } else {
      if (e.position === e.lineStart && qe(e) || r && re(g))
        break;
      if (B(g))
        if (s = e.line, c = e.lineStart, f = e.lineIndent, b(e, !1, -1), e.lineIndent >= n) {
          u = !0, g = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = s, e.lineStart = c, e.lineIndent = f;
          break;
        }
    }
    u && (Y(e, l, o, !1), an(e, e.line - s), l = o = e.position, u = !1), z(g) || (o = e.position + 1), g = e.input.charCodeAt(++e.position);
  }
  return Y(e, l, o, !1), e.result ? !0 : (e.kind = a, e.result = m, !1);
}
function kt(e, n) {
  var r, i, t;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, i = t = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (Y(e, i, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        i = e.position, e.position++, t = e.position;
      else
        return !0;
    else
      B(r) ? (Y(e, i, t, !0), an(e, b(e, !1, n)), i = t = e.position) : e.position === e.lineStart && qe(e) ? h(e, "unexpected end of the document within a single quoted scalar") : (e.position++, t = e.position);
  h(e, "unexpected end of the stream within a single quoted scalar");
}
function It(e, n) {
  var r, i, t, l, o, u;
  if (u = e.input.charCodeAt(e.position), u !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (u = e.input.charCodeAt(e.position)) !== 0; ) {
    if (u === 34)
      return Y(e, r, e.position, !0), e.position++, !0;
    if (u === 92) {
      if (Y(e, r, e.position, !0), u = e.input.charCodeAt(++e.position), B(u))
        b(e, !1, n);
      else if (u < 256 && Tr[u])
        e.result += _r[u], e.position++;
      else if ((o = bt(u)) > 0) {
        for (t = o, l = 0; t > 0; t--)
          u = e.input.charCodeAt(++e.position), (o = At(u)) >= 0 ? l = (l << 4) + o : h(e, "expected hexadecimal character");
        e.result += Tt(l), e.position++;
      } else
        h(e, "unknown escape sequence");
      r = i = e.position;
    } else
      B(u) ? (Y(e, r, i, !0), an(e, b(e, !1, n)), r = i = e.position) : e.position === e.lineStart && qe(e) ? h(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position);
  }
  h(e, "unexpected end of the stream within a double quoted scalar");
}
function Ot(e, n) {
  var r = !0, i, t, l, o = e.tag, u, s = e.anchor, c, f, a, m, g, C = /* @__PURE__ */ Object.create(null), y, A, $, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    f = 93, g = !1, u = [];
  else if (w === 123)
    f = 125, g = !0, u = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (b(e, !0, n), w = e.input.charCodeAt(e.position), w === f)
      return e.position++, e.tag = o, e.anchor = s, e.kind = g ? "mapping" : "sequence", e.result = u, !0;
    r ? w === 44 && h(e, "expected the node content, but found ','") : h(e, "missed comma between flow collection entries"), A = y = $ = null, a = m = !1, w === 63 && (c = e.input.charCodeAt(e.position + 1), F(c) && (a = m = !0, e.position++, b(e, !0, n))), i = e.line, t = e.lineStart, l = e.position, ce(e, n, Fe, !1, !0), A = e.tag, y = e.result, b(e, !0, n), w = e.input.charCodeAt(e.position), (m || e.line === i) && w === 58 && (a = !0, w = e.input.charCodeAt(++e.position), b(e, !0, n), ce(e, n, Fe, !1, !0), $ = e.result), g ? ie(e, u, C, A, y, $, i, t, l) : a ? u.push(ie(e, null, C, A, y, $, i, t, l)) : u.push(y), b(e, !0, n), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  h(e, "unexpected end of the stream within a flow collection");
}
function Ft(e, n) {
  var r, i, t = ze, l = !1, o = !1, u = n, s = 0, c = !1, f, a;
  if (a = e.input.charCodeAt(e.position), a === 124)
    i = !1;
  else if (a === 62)
    i = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; a !== 0; )
    if (a = e.input.charCodeAt(++e.position), a === 43 || a === 45)
      ze === t ? t = a === 43 ? wn : wt : h(e, "repeat of a chomping mode identifier");
    else if ((f = St(a)) >= 0)
      f === 0 ? h(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? h(e, "repeat of an indentation width identifier") : (u = n + f - 1, o = !0);
    else
      break;
  if (z(a)) {
    do
      a = e.input.charCodeAt(++e.position);
    while (z(a));
    if (a === 35)
      do
        a = e.input.charCodeAt(++e.position);
      while (!B(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (cn(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!o || e.lineIndent < u) && a === 32; )
      e.lineIndent++, a = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > u && (u = e.lineIndent), B(a)) {
      s++;
      continue;
    }
    if (e.lineIndent < u) {
      t === wn ? e.result += S.repeat(`
`, l ? 1 + s : s) : t === ze && l && (e.result += `
`);
      break;
    }
    for (i ? z(a) ? (c = !0, e.result += S.repeat(`
`, l ? 1 + s : s)) : c ? (c = !1, e.result += S.repeat(`
`, s + 1)) : s === 0 ? l && (e.result += " ") : e.result += S.repeat(`
`, s) : e.result += S.repeat(`
`, l ? 1 + s : s), l = !0, o = !0, s = 0, r = e.position; !B(a) && a !== 0; )
      a = e.input.charCodeAt(++e.position);
    Y(e, r, e.position, !1);
  }
  return !0;
}
function bn(e, n) {
  var r, i = e.tag, t = e.anchor, l = [], o, u = !1, s;
  if (e.firstTabInLine !== -1)
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = l), s = e.input.charCodeAt(e.position); s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, h(e, "tab characters must not be used in indentation")), !(s !== 45 || (o = e.input.charCodeAt(e.position + 1), !F(o)))); ) {
    if (u = !0, e.position++, b(e, !0, -1) && e.lineIndent <= n) {
      l.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, ce(e, n, Ar, !1, !0), l.push(e.result), b(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > n) && s !== 0)
      h(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < n)
      break;
  }
  return u ? (e.tag = i, e.anchor = t, e.kind = "sequence", e.result = l, !0) : !1;
}
function $t(e, n, r) {
  var i, t, l, o, u, s, c = e.tag, f = e.anchor, a = {}, m = /* @__PURE__ */ Object.create(null), g = null, C = null, y = null, A = !1, $ = !1, w;
  if (e.firstTabInLine !== -1)
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!A && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, h(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), l = e.line, (w === 63 || w === 58) && F(i))
      w === 63 ? (A && (ie(e, a, m, g, C, null, o, u, s), g = C = y = null), $ = !0, A = !0, t = !0) : A ? (A = !1, t = !0) : h(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = i;
    else {
      if (o = e.line, u = e.lineStart, s = e.position, !ce(e, r, Er, !1, !0))
        break;
      if (e.line === l) {
        for (w = e.input.charCodeAt(e.position); z(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), F(w) || h(e, "a whitespace character is expected after the key-value separator within a block mapping"), A && (ie(e, a, m, g, C, null, o, u, s), g = C = y = null), $ = !0, A = !1, t = !1, g = e.tag, C = e.result;
        else if ($)
          h(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = c, e.anchor = f, !0;
      } else if ($)
        h(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = c, e.anchor = f, !0;
    }
    if ((e.line === l || e.lineIndent > n) && (A && (o = e.line, u = e.lineStart, s = e.position), ce(e, n, $e, !0, t) && (A ? C = e.result : y = e.result), A || (ie(e, a, m, g, C, y, o, u, s), g = C = y = null), b(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === l || e.lineIndent > n) && w !== 0)
      h(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < n)
      break;
  }
  return A && ie(e, a, m, g, C, null, o, u, s), $ && (e.tag = c, e.anchor = f, e.kind = "mapping", e.result = a), $;
}
function Nt(e) {
  var n, r = !1, i = !1, t, l, o;
  if (o = e.input.charCodeAt(e.position), o !== 33)
    return !1;
  if (e.tag !== null && h(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (i = !0, t = "!!", o = e.input.charCodeAt(++e.position)) : t = "!", n = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (l = e.input.slice(n, e.position), o = e.input.charCodeAt(++e.position)) : h(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !F(o); )
      o === 33 && (i ? h(e, "tag suffix cannot contain exclamation marks") : (t = e.input.slice(n - 1, e.position + 1), br.test(t) || h(e, "named tag handle cannot contain such characters"), i = !0, n = e.position + 1)), o = e.input.charCodeAt(++e.position);
    l = e.input.slice(n, e.position), Et.test(l) && h(e, "tag suffix cannot contain flow indicator characters");
  }
  l && !Sr.test(l) && h(e, "tag name cannot contain such characters: " + l);
  try {
    l = decodeURIComponent(l);
  } catch {
    h(e, "tag name is malformed: " + l);
  }
  return r ? e.tag = l : K.call(e.tagMap, t) ? e.tag = e.tagMap[t] + l : t === "!" ? e.tag = "!" + l : t === "!!" ? e.tag = "tag:yaml.org,2002:" + l : h(e, 'undeclared tag handle "' + t + '"'), !0;
}
function Rt(e) {
  var n, r;
  if (r = e.input.charCodeAt(e.position), r !== 38)
    return !1;
  for (e.anchor !== null && h(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), n = e.position; r !== 0 && !F(r) && !re(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === n && h(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Dt(e) {
  var n, r, i;
  if (i = e.input.charCodeAt(e.position), i !== 42)
    return !1;
  for (i = e.input.charCodeAt(++e.position), n = e.position; i !== 0 && !F(i) && !re(i); )
    i = e.input.charCodeAt(++e.position);
  return e.position === n && h(e, "name of an alias node must contain at least one character"), r = e.input.slice(n, e.position), K.call(e.anchorMap, r) || h(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], b(e, !0, -1), !0;
}
function ce(e, n, r, i, t) {
  var l, o, u, s = 1, c = !1, f = !1, a, m, g, C, y, A;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, l = o = u = $e === r || Ar === r, i && b(e, !0, -1) && (c = !0, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)), s === 1)
    for (; Nt(e) || Rt(e); )
      b(e, !0, -1) ? (c = !0, u = l, e.lineIndent > n ? s = 1 : e.lineIndent === n ? s = 0 : e.lineIndent < n && (s = -1)) : u = !1;
  if (u && (u = c || t), (s === 1 || $e === r) && (Fe === r || Er === r ? y = n : y = n + 1, A = e.position - e.lineStart, s === 1 ? u && (bn(e, A) || $t(e, A, y)) || Ot(e, y) ? f = !0 : (o && Ft(e, y) || kt(e, y) || It(e, y) ? f = !0 : Dt(e) ? (f = !0, (e.tag !== null || e.anchor !== null) && h(e, "alias node should not have any properties")) : Lt(e, y, Fe === r) && (f = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : s === 0 && (f = u && bn(e, A))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && h(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), a = 0, m = e.implicitTypes.length; a < m; a += 1)
      if (C = e.implicitTypes[a], C.resolve(e.result)) {
        e.result = C.construct(e.result), e.tag = C.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (K.call(e.typeMap[e.kind || "fallback"], e.tag))
      C = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (C = null, g = e.typeMap.multi[e.kind || "fallback"], a = 0, m = g.length; a < m; a += 1)
        if (e.tag.slice(0, g[a].tag.length) === g[a].tag) {
          C = g[a];
          break;
        }
    C || h(e, "unknown tag !<" + e.tag + ">"), e.result !== null && C.kind !== e.kind && h(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + C.kind + '", not "' + e.kind + '"'), C.resolve(e.result, e.tag) ? (e.result = C.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : h(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || f;
}
function Mt(e) {
  var n = e.position, r, i, t, l = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (b(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (l = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !F(o); )
      o = e.input.charCodeAt(++e.position);
    for (i = e.input.slice(r, e.position), t = [], i.length < 1 && h(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; z(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !B(o));
        break;
      }
      if (B(o))
        break;
      for (r = e.position; o !== 0 && !F(o); )
        o = e.input.charCodeAt(++e.position);
      t.push(e.input.slice(r, e.position));
    }
    o !== 0 && cn(e), K.call(En, i) ? En[i](e, i, t) : Ne(e, 'unknown document directive "' + i + '"');
  }
  if (b(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, b(e, !0, -1)) : l && h(e, "directives end mark is expected"), ce(e, e.lineIndent - 1, $e, !1, !0), b(e, !0, -1), e.checkLineBreaks && yt.test(e.input.slice(n, e.position)) && Ne(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && qe(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, b(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    h(e, "end of the stream or a document separator is expected");
  else
    return;
}
function kr(e, n) {
  e = String(e), n = n || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new _t(e, n), i = e.indexOf("\0");
  for (i !== -1 && (r.position = i, h(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Mt(r);
  return r.documents;
}
function Bt(e, n, r) {
  n !== null && typeof n == "object" && typeof r > "u" && (r = n, n = null);
  var i = kr(e, r);
  if (typeof n != "function")
    return i;
  for (var t = 0, l = i.length; t < l; t += 1)
    n(i[t]);
}
function jt(e, n) {
  var r = kr(e, n);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new O("expected a single document in the stream, but found more");
  }
}
var Ht = Bt, Pt = jt, Ir = {
  loadAll: Ht,
  load: Pt
}, Or = Object.prototype.toString, Fr = Object.prototype.hasOwnProperty, fn = 65279, Ut = 9, me = 10, Yt = 13, Kt = 32, Vt = 33, qt = 34, Je = 35, Gt = 37, Wt = 38, Qt = 39, zt = 42, $r = 44, Xt = 45, Re = 58, Zt = 61, Jt = 62, el = 63, nl = 64, Nr = 91, Rr = 93, rl = 96, Dr = 123, il = 124, Mr = 125, L = {};
L[0] = "\\0";
L[7] = "\\a";
L[8] = "\\b";
L[9] = "\\t";
L[10] = "\\n";
L[11] = "\\v";
L[12] = "\\f";
L[13] = "\\r";
L[27] = "\\e";
L[34] = '\\"';
L[92] = "\\\\";
L[133] = "\\N";
L[160] = "\\_";
L[8232] = "\\L";
L[8233] = "\\P";
var tl = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], ll = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function ol(e, n) {
  var r, i, t, l, o, u, s;
  if (n === null)
    return {};
  for (r = {}, i = Object.keys(n), t = 0, l = i.length; t < l; t += 1)
    o = i[t], u = String(n[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), s = e.compiledTypeMap.fallback[o], s && Fr.call(s.styleAliases, u) && (u = s.styleAliases[u]), r[o] = u;
  return r;
}
function ul(e) {
  var n, r, i;
  if (n = e.toString(16).toUpperCase(), e <= 255)
    r = "x", i = 2;
  else if (e <= 65535)
    r = "u", i = 4;
  else if (e <= 4294967295)
    r = "U", i = 8;
  else
    throw new O("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + S.repeat("0", i - n.length) + n;
}
var sl = 1, ge = 2;
function cl(e) {
  this.schema = e.schema || sn, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = S.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = ol(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ge : sl, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Sn(e, n) {
  for (var r = S.repeat(" ", n), i = 0, t = -1, l = "", o, u = e.length; i < u; )
    t = e.indexOf(`
`, i), t === -1 ? (o = e.slice(i), i = u) : (o = e.slice(i, t + 1), i = t + 1), o.length && o !== `
` && (l += r), l += o;
  return l;
}
function en(e, n) {
  return `
` + S.repeat(" ", e.indent * n);
}
function al(e, n) {
  var r, i, t;
  for (r = 0, i = e.implicitTypes.length; r < i; r += 1)
    if (t = e.implicitTypes[r], t.resolve(n))
      return !0;
  return !1;
}
function De(e) {
  return e === Kt || e === Ut;
}
function xe(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== fn || 65536 <= e && e <= 1114111;
}
function Tn(e) {
  return xe(e) && e !== fn && e !== Yt && e !== me;
}
function _n(e, n, r) {
  var i = Tn(e), t = i && !De(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      i
    ) : i && e !== $r && e !== Nr && e !== Rr && e !== Dr && e !== Mr) && e !== Je && !(n === Re && !t) || Tn(n) && !De(n) && e === Je || n === Re && t
  );
}
function fl(e) {
  return xe(e) && e !== fn && !De(e) && e !== Xt && e !== el && e !== Re && e !== $r && e !== Nr && e !== Rr && e !== Dr && e !== Mr && e !== Je && e !== Wt && e !== zt && e !== Vt && e !== il && e !== Zt && e !== Jt && e !== Qt && e !== qt && e !== Gt && e !== nl && e !== rl;
}
function dl(e) {
  return !De(e) && e !== Re;
}
function ae(e, n) {
  var r = e.charCodeAt(n), i;
  return r >= 55296 && r <= 56319 && n + 1 < e.length && (i = e.charCodeAt(n + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function Br(e) {
  var n = /^\n* /;
  return n.test(e);
}
var jr = 1, nn = 2, Hr = 3, Pr = 4, ee = 5;
function hl(e, n, r, i, t, l, o, u) {
  var s, c = 0, f = null, a = !1, m = !1, g = i !== -1, C = -1, y = fl(ae(e, 0)) && dl(ae(e, e.length - 1));
  if (n || o)
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = ae(e, s), !xe(c))
        return ee;
      y = y && _n(c, f, u), f = c;
    }
  else {
    for (s = 0; s < e.length; c >= 65536 ? s += 2 : s++) {
      if (c = ae(e, s), c === me)
        a = !0, g && (m = m || // Foldable line = too long, and not more-indented.
        s - C - 1 > i && e[C + 1] !== " ", C = s);
      else if (!xe(c))
        return ee;
      y = y && _n(c, f, u), f = c;
    }
    m = m || g && s - C - 1 > i && e[C + 1] !== " ";
  }
  return !a && !m ? y && !o && !t(e) ? jr : l === ge ? ee : nn : r > 9 && Br(e) ? ee : o ? l === ge ? ee : nn : m ? Pr : Hr;
}
function pl(e, n, r, i, t) {
  e.dump = function() {
    if (n.length === 0)
      return e.quotingType === ge ? '""' : "''";
    if (!e.noCompatMode && (tl.indexOf(n) !== -1 || ll.test(n)))
      return e.quotingType === ge ? '"' + n + '"' : "'" + n + "'";
    var l = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l), u = i || e.flowLevel > -1 && r >= e.flowLevel;
    function s(c) {
      return al(e, c);
    }
    switch (hl(
      n,
      u,
      e.indent,
      o,
      s,
      e.quotingType,
      e.forceQuotes && !i,
      t
    )) {
      case jr:
        return n;
      case nn:
        return "'" + n.replace(/'/g, "''") + "'";
      case Hr:
        return "|" + Ln(n, e.indent) + kn(Sn(n, l));
      case Pr:
        return ">" + Ln(n, e.indent) + kn(Sn(ml(n, o), l));
      case ee:
        return '"' + gl(n) + '"';
      default:
        throw new O("impossible error: invalid scalar style");
    }
  }();
}
function Ln(e, n) {
  var r = Br(e) ? String(n) : "", i = e[e.length - 1] === `
`, t = i && (e[e.length - 2] === `
` || e === `
`), l = t ? "+" : i ? "" : "-";
  return r + l + `
`;
}
function kn(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function ml(e, n) {
  for (var r = /(\n+)([^\n]*)/g, i = function() {
    var c = e.indexOf(`
`);
    return c = c !== -1 ? c : e.length, r.lastIndex = c, In(e.slice(0, c), n);
  }(), t = e[0] === `
` || e[0] === " ", l, o; o = r.exec(e); ) {
    var u = o[1], s = o[2];
    l = s[0] === " ", i += u + (!t && !l && s !== "" ? `
` : "") + In(s, n), t = l;
  }
  return i;
}
function In(e, n) {
  if (e === "" || e[0] === " ")
    return e;
  for (var r = / [^ ]/g, i, t = 0, l, o = 0, u = 0, s = ""; i = r.exec(e); )
    u = i.index, u - t > n && (l = o > t ? o : u, s += `
` + e.slice(t, l), t = l + 1), o = u;
  return s += `
`, e.length - t > n && o > t ? s += e.slice(t, o) + `
` + e.slice(o + 1) : s += e.slice(t), s.slice(1);
}
function gl(e) {
  for (var n = "", r = 0, i, t = 0; t < e.length; r >= 65536 ? t += 2 : t++)
    r = ae(e, t), i = L[r], !i && xe(r) ? (n += e[t], r >= 65536 && (n += e[t + 1])) : n += i || ul(r);
  return n;
}
function xl(e, n, r) {
  var i = "", t = e.tag, l, o, u;
  for (l = 0, o = r.length; l < o; l += 1)
    u = r[l], e.replacer && (u = e.replacer.call(r, String(l), u)), (j(e, n, u, !1, !1) || typeof u > "u" && j(e, n, null, !1, !1)) && (i !== "" && (i += "," + (e.condenseFlow ? "" : " ")), i += e.dump);
  e.tag = t, e.dump = "[" + i + "]";
}
function On(e, n, r, i) {
  var t = "", l = e.tag, o, u, s;
  for (o = 0, u = r.length; o < u; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (j(e, n + 1, s, !0, !0, !1, !0) || typeof s > "u" && j(e, n + 1, null, !0, !0, !1, !0)) && ((!i || t !== "") && (t += en(e, n)), e.dump && me === e.dump.charCodeAt(0) ? t += "-" : t += "- ", t += e.dump);
  e.tag = l, e.dump = t || "[]";
}
function Cl(e, n, r) {
  var i = "", t = e.tag, l = Object.keys(r), o, u, s, c, f;
  for (o = 0, u = l.length; o < u; o += 1)
    f = "", i !== "" && (f += ", "), e.condenseFlow && (f += '"'), s = l[o], c = r[s], e.replacer && (c = e.replacer.call(r, s, c)), j(e, n, s, !1, !1) && (e.dump.length > 1024 && (f += "? "), f += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), j(e, n, c, !1, !1) && (f += e.dump, i += f));
  e.tag = t, e.dump = "{" + i + "}";
}
function wl(e, n, r, i) {
  var t = "", l = e.tag, o = Object.keys(r), u, s, c, f, a, m;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new O("sortKeys must be a boolean or a function");
  for (u = 0, s = o.length; u < s; u += 1)
    m = "", (!i || t !== "") && (m += en(e, n)), c = o[u], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), j(e, n + 1, c, !0, !0, !0) && (a = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, a && (e.dump && me === e.dump.charCodeAt(0) ? m += "?" : m += "? "), m += e.dump, a && (m += en(e, n)), j(e, n + 1, f, !0, a) && (e.dump && me === e.dump.charCodeAt(0) ? m += ":" : m += ": ", m += e.dump, t += m));
  e.tag = l, e.dump = t || "{}";
}
function Fn(e, n, r) {
  var i, t, l, o, u, s;
  for (t = r ? e.explicitTypes : e.implicitTypes, l = 0, o = t.length; l < o; l += 1)
    if (u = t[l], (u.instanceOf || u.predicate) && (!u.instanceOf || typeof n == "object" && n instanceof u.instanceOf) && (!u.predicate || u.predicate(n))) {
      if (r ? u.multi && u.representName ? e.tag = u.representName(n) : e.tag = u.tag : e.tag = "?", u.represent) {
        if (s = e.styleMap[u.tag] || u.defaultStyle, Or.call(u.represent) === "[object Function]")
          i = u.represent(n, s);
        else if (Fr.call(u.represent, s))
          i = u.represent[s](n, s);
        else
          throw new O("!<" + u.tag + '> tag resolver accepts not "' + s + '" style');
        e.dump = i;
      }
      return !0;
    }
  return !1;
}
function j(e, n, r, i, t, l, o) {
  e.tag = null, e.dump = r, Fn(e, r, !1) || Fn(e, r, !0);
  var u = Or.call(e.dump), s = i, c;
  i && (i = e.flowLevel < 0 || e.flowLevel > n);
  var f = u === "[object Object]" || u === "[object Array]", a, m;
  if (f && (a = e.duplicates.indexOf(r), m = a !== -1), (e.tag !== null && e.tag !== "?" || m || e.indent !== 2 && n > 0) && (t = !1), m && e.usedDuplicates[a])
    e.dump = "*ref_" + a;
  else {
    if (f && m && !e.usedDuplicates[a] && (e.usedDuplicates[a] = !0), u === "[object Object]")
      i && Object.keys(e.dump).length !== 0 ? (wl(e, n, e.dump, t), m && (e.dump = "&ref_" + a + e.dump)) : (Cl(e, n, e.dump), m && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object Array]")
      i && e.dump.length !== 0 ? (e.noArrayIndent && !o && n > 0 ? On(e, n - 1, e.dump, t) : On(e, n, e.dump, t), m && (e.dump = "&ref_" + a + e.dump)) : (xl(e, n, e.dump), m && (e.dump = "&ref_" + a + " " + e.dump));
    else if (u === "[object String]")
      e.tag !== "?" && pl(e, e.dump, n, l, s);
    else {
      if (u === "[object Undefined]")
        return !1;
      if (e.skipInvalid)
        return !1;
      throw new O("unacceptable kind of an object to dump " + u);
    }
    e.tag !== null && e.tag !== "?" && (c = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? c = "!" + c : c.slice(0, 18) === "tag:yaml.org,2002:" ? c = "!!" + c.slice(18) : c = "!<" + c + ">", e.dump = c + " " + e.dump);
  }
  return !0;
}
function vl(e, n) {
  var r = [], i = [], t, l;
  for (rn(e, r, i), t = 0, l = i.length; t < l; t += 1)
    n.duplicates.push(r[i[t]]);
  n.usedDuplicates = new Array(l);
}
function rn(e, n, r) {
  var i, t, l;
  if (e !== null && typeof e == "object")
    if (t = n.indexOf(e), t !== -1)
      r.indexOf(t) === -1 && r.push(t);
    else if (n.push(e), Array.isArray(e))
      for (t = 0, l = e.length; t < l; t += 1)
        rn(e[t], n, r);
    else
      for (i = Object.keys(e), t = 0, l = i.length; t < l; t += 1)
        rn(e[i[t]], n, r);
}
function yl(e, n) {
  n = n || {};
  var r = new cl(n);
  r.noRefs || vl(e, r);
  var i = e;
  return r.replacer && (i = r.replacer.call({ "": i }, "", i)), j(r, 0, i, !0, !0) ? r.dump + `
` : "";
}
var El = yl, Al = {
  dump: El
};
function dn(e, n) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + n + " instead, which is now safe by default.");
  };
}
var bl = T, Sl = ir, Tl = ur, _l = dr, Ll = hr, kl = sn, Il = Ir.load, Ol = Ir.loadAll, Fl = Al.dump, $l = O, Nl = {
  binary: Cr,
  float: fr,
  map: or,
  null: sr,
  pairs: vr,
  set: yr,
  timestamp: gr,
  bool: cr,
  int: ar,
  merge: xr,
  omap: wr,
  seq: lr,
  str: tr
}, Rl = dn("safeLoad", "load"), Dl = dn("safeLoadAll", "loadAll"), Ml = dn("safeDump", "dump"), Bl = {
  Type: bl,
  Schema: Sl,
  FAILSAFE_SCHEMA: Tl,
  JSON_SCHEMA: _l,
  CORE_SCHEMA: Ll,
  DEFAULT_SCHEMA: kl,
  load: Il,
  loadAll: Ol,
  dump: Fl,
  YAMLException: $l,
  types: Nl,
  safeLoad: Rl,
  safeLoadAll: Dl,
  safeDump: Ml
};
const jl = "LabelText.ClueText(LengthText)", Ur = /^\s*(.*?)\.(.*)\((.*)\)\s*$/, $n = /^([^bce-z]*?)(\d+[ad]?)\s*(.*)/, Hl = /^\s*(.*?)\s*$/, Nn = /^([^a-z()\d]*?)(\d+)[\s.]*(.*)/, Pl = /(.*?)(\*\*.+?\*\*)(.*)$/, Ul = /(.*?)(\*\*\*.+?\*\*\*)(.*)$/, Yl = /(.*?)(\*[^*]+?\*)(.*)$/, Kl = /(.*?)(__.+?__)(.*)$/, Vl = /(.*?)(___.+?___)(.*)$/, ql = /(.*?)(_[^_]+?_)(.*)$/, Gl = [
  {
    tag: "***",
    regex: Ul,
    html: { open: '<span class="cw-bold cw-italic">', close: "</span>" }
  },
  {
    tag: "___",
    regex: Vl,
    html: { open: '<span class="cw-bold cw-italic">', close: "</span>" }
  },
  {
    tag: "**",
    regex: Pl,
    html: { open: '<span class="cw-bold">', close: "</span>" }
  },
  {
    tag: "__",
    regex: Kl,
    html: { open: '<span class="cw-bold">', close: "</span>" }
  },
  {
    tag: "*",
    regex: Yl,
    html: { open: '<span class="cw-italic">', close: "</span>" }
  },
  {
    tag: "_",
    regex: ql,
    html: { open: '<span class="cw-italic">', close: "</span>" }
  }
];
function Wl(e) {
  let n = e;
  return Gl.forEach((r) => {
    let i, t, l = n;
    if (r.regex.test(l)) {
      let o = r.regex.exec(l);
      for (n = ""; (o == null ? void 0 : o.length) === 4; )
        [, i, t, l] = o, t = t.replace(r.tag, r.html.open), t = t.replace(r.tag, r.html.close), n += i + t, o = r.regex.exec(l);
      n += l;
    }
  }), n;
}
function Ql(e) {
  const n = { x: 1, y: 1, clue: "1. Clue (1)" }, r = { answer: "", solution: "", revealed: "" }, i = Object.keys(n), t = Object.keys(r), l = Object.keys(e);
  for (const u of i)
    if (!l.includes(u))
      throw new Error(`'cdClue.${u}' is missing`);
  for (const u of i)
    if (typeof n[u] != typeof e[u])
      throw new Error(
        `'cdClue.${u} (${e[u]})' must be a ${typeof n[u]}`
      );
  for (const u of t)
    if (l.includes(u) && typeof r[u] != typeof e[u])
      throw new Error(
        `'cdClue.${u} (${e[u]})' must be a ${typeof r[u]}`
      );
  const o = new Set(l);
  for (const u of i)
    o.delete(u);
  for (const u of t)
    o.delete(u);
  if (o.size > 0)
    throw new Error(
      `'cdClue' has unexpected properties <${[...o].join(",")}>`
    );
  if (!Ur.test(e.clue))
    throw new Error(
      `Clue '${e.clue}' does not match the required pattern '${jl}'`
    );
}
function zl(e, n) {
  if (e === void 0 || n === void 0)
    throw new Error("'cdClue' and 'isAcrossClue' are required");
  if (e === null)
    throw new Error("'cdClue' can't be null");
  if (n === null)
    throw new Error("'isAcrossClue' can't be null");
  if (typeof n != "boolean")
    throw new Error("'isAcrossClue' must be a boolean (true,false)");
}
function Xl(e, n) {
  let r = e.toLowerCase(), i = [];
  for (; $n.test(r); ) {
    const [, , t, l] = $n.exec(r);
    i.push(t), r = l;
  }
  if (r)
    throw new Error(
      `'${n.clue}' Error in <LabelText> near <${r}>`
    );
  return i;
}
function Zl(e) {
  function n(t) {
    return t.endsWith("a") ? "across" : t.endsWith("d") ? "down" : null;
  }
  let r = e.slice(1), i = [];
  return r.length > 0 && (i = r.map((t) => ({
    headNumber: parseInt(t, 10),
    direction: n(t)
  }))), i;
}
function Jl(e, n) {
  let r = [], i = e;
  for (; Nn.test(i); ) {
    const [, , t, l] = Nn.exec(i);
    r.push(parseInt(t, 10)), i = l;
  }
  if (i)
    throw new Error(
      `'${n.clue}' Error in <LengthText> near <${i}>`
    );
  return r;
}
const eo = (e, n) => {
  const r = (t) => t ? "a" : "d";
  return /[ad]$/.test(e) ? e : e + r(n);
};
function no(e, n) {
  zl(e, n), Ql(e);
  const r = [], i = e.x - 1, t = e.y - 1, l = n, o = e.solution ? (
    // Strip out everything from solution except alphabetical characters
    // DO NOT substitute spaces
    e.solution.toUpperCase().replaceAll(/[^A-Z]/g, "")
  ) : void 0, u = e.revealed ? (
    // string of upper-cased revealed characters
    e.revealed.toUpperCase()
  ) : void 0, [, s, c, f] = Ur.exec(e.clue), a = Xl(s, e), m = Zl(a), [g] = a, C = parseInt(g, 10), y = C.toString(), A = eo(g, l), [, $] = Hl.exec(c), w = Wl($), hn = `(${f})`, pn = Jl(f, e), X = pn.reduce((Qr, zr) => Qr + zr, 0), Wr = e.answer ? e.answer.toUpperCase().replaceAll(/[^ A-Z]/g, " ").padEnd(X) : (
    // pad out null or undefined answer with spaces
    "".padEnd(X)
  );
  if (o && o.length !== X)
    throw new Error(
      `Length of clue solution '${o}' does not match the lengthText '${hn}'`
    );
  if (u && u.length !== X)
    throw new Error(
      `Length of clue revealed characters '${u}' does not match the lengthText: ${X}`
    );
  return {
    answer: Wr,
    cells: r,
    clueId: A,
    clueText: w,
    headNumber: C,
    isAcross: l,
    labelText: y,
    lengthText: hn,
    revealed: u,
    segmentLength: X,
    solution: o,
    tailDescriptors: m,
    wordLengths: pn,
    x: i,
    y: t,
    toString: () => `${A}`
  };
}
function Eo() {
  return JSON.stringify({
    document: {
      mimetype: "application/vnd.js-crossword",
      version: "1.0"
    },
    width: 0,
    height: 0,
    acrossClues: [],
    downClues: []
  });
}
function ro(e) {
  if (x("newCrosswordModel"), !Yr(e))
    return x(
      "newCrosswordModel: The model must be initialised with a valid crossword definition.",
      "error"
    ), null;
  let n = lo(e);
  n.cells = io(n);
  const r = /across/i;
  return ["acrossClues", "downClues"].forEach((i) => {
    e[i].forEach(
      co(n, r.test(i))
    );
  }), [...n.acrossClues, ...n.downClues].forEach(
    fo(n)
  ), n.lightCells = n.cells.flat().filter((i) => i.light), ["acrossClues", "downClues"].forEach((i) => {
    n[i].headSegments = n[i].filter(
      (t) => t === t.headSegment
    );
  }), n;
}
function io(e) {
  const { width: n } = e, { height: r } = e, i = new Array(n);
  for (let t = 0; t < n; t += 1) {
    i[t] = new Array(r);
    for (let l = 0; l < r; l += 1)
      i[t][l] = {
        model: e,
        x: t,
        y: l,
        toString: () => `${t},${l}`
      };
  }
  return i;
}
function to(e, n) {
  if (e >= 0) {
    let r = e, i = 0;
    for (; i < n.length; ) {
      const t = n[i];
      if (r < t)
        return (
          // is a word terminator
          r === t - 1 && //  is not last word
          i !== n.length - 1
        );
      r -= t, i += 1;
    }
  }
  return !1;
}
function lo(e) {
  let n = {
    width: e.width,
    height: e.height,
    acrossClues: [],
    downClues: [],
    cells: []
  };
  if (n.width === void 0 || n.width === null || n.width < 0 || n.height === void 0 || n.height === null || n.height < 0)
    throw new Error("The crossword bounds are invalid.");
  return n;
}
function Yr(e) {
  var l, o;
  const n = /^1\.0$/;
  function r(u) {
    return x(`validateCrosswordDefinition: ${u}`, "error"), !1;
  }
  function i(u) {
    return u.toString().trim().toLowerCase();
  }
  const t = e;
  if (t)
    if (t.document)
      if ((l = t.document) != null && l.mimetype) {
        const u = i(t.document.mimetype);
        if (u !== "application/vnd.js-crossword")
          return r(
            `Unsupported "document.mimetype" (${u}) Expected: application/vnd.js-crossword`
          );
        if ((o = t.document) != null && o.version) {
          const s = i(t.document.version);
          return n.test(s) ? !0 : r(`Unsupported document version (${s}) Expected: 1.0`);
        } else
          return r('Missing "document.mimetype" element');
      } else
        return r('Missing "document.mimetype" element');
    else
      return r('Missing "document" element');
  else
    return r("[crosswordDefinition] argument is undefined or null");
}
function oo(e, n, r) {
  if (e.x < 0 || e.x >= n.width || e.y < 0 || e.y >= n.height)
    throw new Error(`Clue ${e} doesn't start in the bounds.`);
  if (r) {
    if (e.x + e.segmentLength > n.width)
      throw new Error(`Clue ${e} exceeds horizontal bounds.`);
  } else if (e.y + e.segmentLength > n.height)
    throw new Error(`Clue ${e} exceeds vertical bounds.`);
}
function uo(e, n, r) {
  !r && e.acrossClue && (e.acrossClue.answer = ue(
    e.acrossClue.answer,
    e.acrossClueLetterIndex,
    n
  )), r && e.downClue && (e.downClue.answer = ue(
    e.downClue.answer,
    e.downClueLetterIndex,
    n
  ));
}
const so = (e) => (n) => {
  const r = e, i = n, t = i.headNumber;
  switch (i.direction) {
    case "across":
      return r.acrossClues.find((l) => l.headNumber === t);
    case "down":
      return r.downClues.find((l) => l.headNumber === t);
    default:
      return r.acrossClues.find((l) => l.headNumber === t) || r.downClues.find((l) => l.headNumber === t);
  }
};
function co(e, n) {
  return (r) => {
    const i = no(r, n);
    e[n ? "acrossClues" : "downClues"].push(i), oo(i, e, n);
    let { x: t, y: l } = i;
    for (let o = 0; o < i.segmentLength; o += 1) {
      const u = e.cells[t][l];
      u.light = !0, u[n ? "acrossClue" : "downClue"] = i, u[n ? "acrossClueLetterIndex" : "downClueLetterIndex"] = o, i.cells.push(u), to(o, i.wordLengths) && (u[i.isAcross ? "acrossTerminator" : "downTerminator"] = !0), po(u, i, o, r.answer, n), ho(u, i, o, r.solution), ao(o, u, i), n ? t += 1 : l += 1;
    }
  };
}
function ao(e, n, r) {
  if (e === 0) {
    if (n.labelText && n.labelText !== r.headNumber)
      throw new Error(
        `Clue ${r} has a label which is inconsistent with another clue (${n.acrossClue}).`
      );
    n.labelText = r.headNumber;
  }
}
function fo(e) {
  return (n) => {
    n.tailSegments = n.tailDescriptors.map(
      so(e)
    );
    const r = [
      ...n.wordLengths,
      ...n.tailSegments.flatMap((l) => l.wordLengths)
    ];
    n.lengthText = `(${r})`;
    let i = 0;
    const t = [n, ...n.tailSegments];
    t.forEach((l) => {
      [l.headSegment] = t, i > 0 && (l.previousClueSegment = t[i - 1]), i < t.length - 1 && (l.nextClueSegment = t[i + 1]), i += 1;
    }), t[0].flatCells = t.length === 1 ? t[0].cells : (
      // Remove duplicates from intersecting multiple segments by constructing a set
      new Set(t.flatMap((l) => l.cells))
    ), n.labelText = `${[n.headNumber].concat(n.tailSegments.map((l) => l.headNumber)).join(",")}.`, n.tailSegments.forEach((l) => {
      l.lengthText = "";
    });
  };
}
function Ao(e, n) {
  d(fileExists(n));
  const r = readFileSync(n, {
    encoding: "utf8",
    flag: "r"
  });
  return Kr(e, r.toString());
}
function Kr(e, n) {
  let r;
  switch (e.trim().toLowerCase()) {
    case "application/json":
      try {
        r = JSON.parse(n);
      } catch (i) {
        return x(
          `newCrosswordDefinition: [documentText] is not a simple JSON object.
Error: ${i.message}
`,
          "error"
        ), null;
      }
      break;
    case "application/yaml":
    case "application/x-yaml":
      try {
        r = Bl.load(n);
      } catch (i) {
        return x(
          `newCrosswordDefinition: [documentText] is not a YAML object.
Error: ${i.message}
`,
          "error"
        ), null;
      }
      break;
    default:
      return x(
        `newCrosswordDefinition: Unsupported file type: (${e})`,
        "error"
      ), null;
  }
  return Yr(r) ? r : null;
}
function Vr(e, n, r, i) {
  const t = `(${e.x + 1},${e.y + 1})`, l = `[${e[i]}[${r + 1}],${e[i][r]}]`, o = `(${n.acrossClue})`, u = `[${n.acrossClue[i]},${n[i]}]`;
  return `Clue ${e} ${i} at ${t} ${l} is not coherent with previous clue ${o} ${i} ${u}.`;
}
function ho(e, n, r, i) {
  const t = " ";
  if (i) {
    if (e.solution && // We can overwrite any cells that have the default value
    e.solution !== t && e.solution !== n.solution[r])
      throw new Error(
        Vr(n, e, r, "solution")
      );
    e.solution = n.solution[r];
  } else
    e.solution = t;
}
function po(e, n, r, i, t) {
  const l = " ";
  if (i) {
    const o = n.answer[r];
    if (e.answer && // We can overwrite any cells that have default value
    e.answer !== l && e.answer !== o)
      throw new Error(
        Vr(n, e, r, "answer")
      );
    e.answer = o, uo(e, e.answer, t);
  } else
    e.answer || (e.answer = l);
}
const mo = {
  eventName: "keydown",
  keyBindings: [
    {
      key: M.backspace,
      action: (e, n, r) => {
        xn(e, n, r), gn(e, r);
      }
    },
    {
      key: M.delete,
      action: (e, n, r) => {
        xn(e, n, r);
      }
    },
    {
      key: M.enter,
      action: (e, n, r) => {
        Un(e, r);
      }
    },
    {
      key: M.tab,
      action: (e, n, r) => {
        n.shiftKey ? ui(e, r) : oi(e, r);
      }
    },
    {
      key: M.space,
      action: (e, n, r) => {
        n.shiftKey ? gn(e, r) : Qn(e, r);
      }
    }
  ]
}, go = {
  eventName: "keyup",
  keyBindings: [
    {
      key: M.left,
      action: (e, n, r) => {
        Wn(e, r);
      }
    },
    {
      key: M.up,
      action: (e, n, r) => {
        Gn(e, r);
      }
    },
    {
      key: M.right,
      action: (e, n, r) => {
        qn(e, r);
      }
    },
    {
      key: M.down,
      action: (e, n, r) => {
        Vn(e, r);
      }
    }
  ]
};
function bo(e, n, r) {
  const i = new vo(
    e,
    n,
    r
  );
  return i != null && i.isValid ? i : null;
}
const xo = /^[a-z]$/, Co = /^[a-z]$/, wo = 5;
var te, R, Ce, P, q, we, ve, ye, le, Ee, Ae, be, G, Se, Me, Te, tn, W, fe, Q, de, _e, ln, Be, je, Le, He, k, N, U, ne, oe, ke, Pe, qr, Ue, Gr;
class vo {
  //////////////////////////
  //// Lifecycle methods
  //////////////////////////
  constructor(n, r, i) {
    //////////////////////////
    //// Private methods
    //////////////////////////
    // Accessor for document associated with DOM
    v(this, Te);
    // Accessors for DOM parent/placeholder elements
    v(this, W);
    v(this, Q);
    // Common logic for CrosswordController constructor and loadCrosswordSource()
    v(this, _e);
    /**
     * **#stateChange**: Publish an event to the listeners subscribed to _onStateChange_.
     * @param {*} eventName The name of the event to be published
     * @param {*} data not used
     */
    v(this, k);
    // Flush DOM event queue before publishing event
    // Used to publish user notification events so pending events complete first.
    v(this, U);
    // Helper to publish crosswordSolved event if the crossword is solved
    v(this, oe);
    // Assign event handlers to cell's input element
    v(this, Pe);
    // Assign keyboard event handlers to cell element
    v(this, Ue);
    v(this, te, []);
    v(this, R, new mn());
    v(this, Ce, void 0);
    v(this, P, void 0);
    v(this, q, { clue: null, cell: null });
    v(this, we, void 0);
    v(this, ve, void 0);
    v(this, ye, void 0);
    v(this, le, {});
    v(this, Ee, void 0);
    v(this, Ae, ri());
    v(this, be, []);
    v(this, G, void 0);
    v(this, Se, !1);
    // Events published by the CrosswordController
    v(this, Me, [
      "cellRevealed",
      "clueCleaned",
      "clueIncomplete",
      "clueReset",
      "clueRevealed",
      "clueSelected",
      "clueSolved",
      "clueTested",
      "crosswordCleaned",
      "crosswordIncomplete",
      "crosswordLoaded",
      "crosswordReset",
      "crosswordRevealed",
      "crosswordSolved",
      "crosswordTested"
    ]);
    //////////////////////////
    //// Grid element helpers
    //////////////////////////
    // Helper function to retrieve corresponding cell for cellElement
    H(this, "cell", (n) => p(this, R).modelCell(n));
    // Helper function to retrieve corresponding cellElement for cell
    H(this, "cellElement", (n) => (n.light || x(`cellElement: dark cell! ${n}`, "warn"), p(this, R).cellElement(n)));
    // Helper function to set corresponding cellElement text for cell
    H(this, "setCellElementText", (n, r) => {
      d(n.light, `dark cell! ${n}`), p(this, R).cellElement(n).firstChild.nodeValue = r;
    });
    // Helper function to retrieve corresponding revealedElement for cell
    H(this, "revealedElement", (n) => {
      d(n.light, `dark cell! ${n}`);
      const r = n.labelText ? 1 : 0;
      return p(this, R).cellElement(n).children[r];
    });
    // Helper function to retrieve corresponding incorrectElement for cell
    H(this, "incorrectElement", (n) => {
      d(n.light, `dark cell! ${n}`);
      const r = n.labelText ? 2 : 1;
      return p(this, R).cellElement(n).children[r];
    });
    // Helper function for constructor
    v(this, Be, () => {
      D(this, G, {
        // Reveal solution for current letter in answer. All revealed cells have
        // distinct styling which remains for the duration of the puzzle.
        // Public shaming is strictly enforced!
        "reveal-cell": this.revealCurrentCell,
        // Remove incorrect letters in the answer after testing.
        "clean-clue": this.cleanCurrentClue,
        // Clear out the answer for the current clue
        "reset-clue": this.resetCurrentClue,
        // Reveal solution for current clue
        "reveal-clue": this.revealCurrentClue,
        // Test the current clue answer against the solution. Incorrect letters
        // have distinct styling which is removed when 'cleared' or a new letter
        // entered in the cell.
        "test-clue": this.testCurrentClue,
        // Clear out all incorrect letters in the entire crossword
        "clean-crossword": this.cleanCrossword,
        // Clear out the entire crossword
        "reset-crossword": this.resetCrossword,
        // Reveal solutions for the entire crossword.
        "reveal-crossword": this.revealCrossword,
        // Test the answers for the entire crossword against the solutions
        "test-crossword": this.testCrossword
      });
    });
    // Helper function to subscribe to CrosswordController events.
    // Refer to #controllerEventNames for complete list of events.
    v(this, je, (n, r) => {
      n.forEach((i) => {
        d(
          this.controllerEventNames.includes(i),
          `event [${i}] is not a CrosswordController event.`
        ), p(this, be).push(p(this, Ae).subscribe(i, r));
      });
    });
    // Helper for multi-segment current clue
    v(this, Le, (n) => n && (n === this.currentClue.previousClueSegment || n === this.currentClue.nextClueSegment));
    v(this, He, (n) => {
      const r = (s, c) => {
        c !== this.currentClue && (x(
          `Clue has changed [was ${this.currentClue}, focused ${s}] => ${c}`
        ), this.currentClue = c);
      }, [i, t, l, o, u] = [
        this.currentClue,
        n.acrossClue,
        n.downClue,
        n.acrossClueLetterIndex,
        n.downClueLetterIndex
      ];
      return [t, l].includes(this.currentClue) ? r(n, this.currentClue) : (t ? !l : l) ? r(n, t ?? l) : p(this, Le).call(this, t) ? r(n, t) : p(this, Le).call(this, l) ? r(n, l) : r(n, u === 0 && o !== 0 ? l : t), this.currentClue !== i;
    });
    x("CrosswordController constructor"), d(
      n == null ? void 0 : n.width,
      "[crosswordDefinition] argument is null/undefined or not a crossword definition"
    ), d(
      r == null ? void 0 : r.ownerDocument,
      "[domGridParentElement] argument is null/undefined or not a DOM element"
    ), d(
      !i || i.ownerDocument,
      "[domCluesParentElement] argument is not a DOM element"
    ), D(this, ve, r), D(this, we, i), this.setKeyboardEventBindings([mo, go]), D(this, Se, E(this, _e, ln).call(this, n)), this.isValid && p(this, Be).call(this);
  }
  //  Completely cleans up the crossword.
  destroy() {
    var n, r;
    D(this, R, null), D(this, P, null), (n = p(this, W, fe)) == null || n.removeChild(this.gridView), (r = p(this, Q, de)) == null || r.removeChild(this.cluesView), p(this, be).forEach((i) => {
      i.remove();
    }), p(this, te).forEach((i) => {
      const { element: t, eventName: l, handler: o } = i;
      t.removeEventListener(l, o);
    });
  }
  //////////////////////////////////
  //// User EventHandler binding
  //////////////////////////////////
  // Helper function to access API event handler functions
  userEventHandler(n) {
    return x(`elementEventHandler:${n}`), d(
      p(this, G).hasOwnProperty(n),
      `[${n}] is not a CrosswordController event handler.`
    ), p(this, G)[n].bind(this);
  }
  // Helper function to bind Controller user-event-handler to webpage
  // DOM elementId.
  bindUserEventHandlerToId(n, r = "click", i = document) {
    const t = Hn(n, i);
    if (t) {
      const l = this.userEventHandler(n);
      t.addEventListener(r, l), p(this, te).push({ element: t, eventName: r, handler: l });
    }
  }
  // Helper function to bind Controller user-event-handlers to a collection
  // of webpage DOM elementIds.
  bindUserEventHandlersToIds(n = this.userEventHandlerIds, r = "click", i = document) {
    n.forEach((t) => {
      this.bindUserEventHandlerToId(t, r, i);
    });
  }
  // Helper function to bind Controller user-event-handler to webpage
  // DOM element class. Using element class names rather than element Ids
  // allows us to add controller user-event-handler to more than one
  // DOM element
  bindUserEventHandlerToClass(n, r = "click", i = document) {
    Pn(n, i).forEach((l) => {
      const o = this.userEventHandler(n);
      l.addEventListener(r, o), p(this, te).push({ element: l, eventName: r, handler: o });
    });
  }
  // Helper function to bind Controller user-event-handlers to a collection
  // of webpage DOM elementIds.
  bindUserEventHandlersToClass(n = this.userEventHandlerIds, r = "click", i = document) {
    n.forEach(
      (t) => this.bindUserEventHandlerToClass(t, r, i)
    );
  }
  ////////////////////////////////
  //// Public property accessors
  ////////////////////////////////
  get isValid() {
    return p(this, Se);
  }
  // Accessors for public property currentCell
  get currentCell() {
    return p(this, q).cell;
  }
  set currentCell(n) {
    x(`currentCell: ${n}`);
    const r = this.currentCell;
    n !== r && (p(this, q).cell = n, this.cellElement(n).focus(), ci(this, n, r));
  }
  // Accessors for public property currentClue
  get currentClue() {
    return p(this, q).clue;
  }
  set currentClue(n) {
    const r = this.currentClue;
    n !== r && (x(`currentClue: '${n}' [currentCell ${this.currentCell}]`), p(this, q).clue = n, si(this, n, r), this.currentClue.cells.includes(this.currentCell) || (this.currentCell = n.cells[0]), E(this, k, N).call(this, "clueSelected", n));
  }
  // Accessor for public property model
  get model() {
    return p(this, P);
  }
  // Accessor for public property gridView
  get gridView() {
    return p(this, ye);
  }
  // Accessor for public property cluesView
  get cluesView() {
    return p(this, Ce);
  }
  // Accessor for addEventsListener - public event publisher
  get addEventsListener() {
    return p(this, je);
  }
  // Accessor for public property controllerEventNames
  get controllerEventNames() {
    return [...p(this, Me)];
  }
  // Accessors for public property lastMoveEvent
  get lastMoveEvent() {
    return p(this, Ee);
  }
  set lastMoveEvent(n) {
    const r = n.toLowerCase();
    d(["click", "focus"].includes(r), `unknown event: ${n}`), D(this, Ee, r);
  }
  // Accessor for public property userEventHandlerIds
  get userEventHandlerIds() {
    return Object.keys(p(this, G));
  }
  //////////////////////////
  //// Public methods
  //////////////////////////
  /**
   * Programmatically set the content of a crossword grid cell
   * @param {*} cellElementId The id of the associated cell DOM element
   * @param {*} character The new text content for the cell.
   */
  setGridCell(n, r) {
    x(`setCell:${n} '${r}}'`);
    const i = !0;
    Ve(
      this,
      p(this, R).modelCell(n),
      r,
      i
    );
  }
  loadCrosswordSource(n, r, i = "") {
    d(n, "[mimeType] is undefined or null"), d(r, "[crosswordSourceText] is undefined or null"), x(`loadCrosswordSource: ${n} ${i}`);
    const t = Kr(n, r);
    return t ? E(this, _e, ln).call(this, t) : (x(
      `loadCrosswordSource: invalid crossword definition "${i}"`,
      "error"
    ), !1);
  }
  setKeyboardEventBindings(n) {
    d(
      n == null ? void 0 : n.length,
      "[eventBindings] argument is empty, null or undefined."
    );
    const r = ["keydown", "keyup"];
    n.forEach((i) => {
      var l, o;
      d(
        (l = i.eventName) == null ? void 0 : l.trim(),
        'Missing or empty "eventName" property for event binding.'
      );
      const t = i.eventName.trim().toLowerCase();
      d(
        r.includes(t),
        `Binding event name "${i.eventName}" is not supported.`
      ), d(
        (o = i.keyBindings) == null ? void 0 : o.length,
        `Missing or  empty "keyBindings" array property for [${t}].`
      ), x(`setKeyboardEventBindings: Setting keyBindings for "${t}".`), p(this, le)[t] = i.keyBindings;
    });
  }
  /////////////////////////////////
  //// Public user event handlers
  /////////////////////////////////
  testCurrentClue() {
    x(`testCurrentClue:${this.currentClue}`);
    const n = !0, r = di(this, this.currentClue, n);
    return E(this, k, N).call(this, "clueTested", r), r === _.correct ? E(this, U, ne).call(this, "clueSolved", this.currentClue) : r === _.incomplete && E(this, U, ne).call(this, "clueIncomplete", this.currentClue), r;
  }
  testCrossword() {
    x("testCrossword");
    const r = hi(this, !0);
    return E(this, k, N).call(this, "crosswordTested", r), r === _.correct ? E(this, U, ne).call(this, "crosswordSolved", p(this, P)) : r === _.incomplete && E(this, U, ne).call(this, "crosswordIncomplete", p(this, P)), r;
  }
  revealCurrentCell() {
    on(this, this.currentCell), E(this, k, N).call(this, "cellRevealed", this.currentCell), E(this, oe, ke).call(this);
  }
  revealCurrentClue() {
    ai(this, this.currentClue), E(this, k, N).call(this, "clueRevealed", this.currentClue), E(this, oe, ke).call(this);
  }
  revealCrossword() {
    x("revealCrossword"), fi(this), E(this, k, N).call(this, "crosswordRevealed", this.model);
  }
  resetCurrentClue() {
    mi(this, this.currentClue), E(this, k, N).call(this, "clueReset", this.currentClue);
  }
  resetCrossword() {
    x("resetCrossword"), gi(this), E(this, k, N).call(this, "crosswordReset", this.model);
  }
  cleanCurrentClue() {
    xi(this, this.currentClue), E(this, k, N).call(this, "clueCleaned", this.currentClue);
  }
  cleanCrossword() {
    x("cleanCrossword"), Ci(this), E(this, k, N).call(this, "crosswordCleaned", this.model);
  }
}
te = new WeakMap(), R = new WeakMap(), Ce = new WeakMap(), P = new WeakMap(), q = new WeakMap(), we = new WeakMap(), ve = new WeakMap(), ye = new WeakMap(), le = new WeakMap(), Ee = new WeakMap(), Ae = new WeakMap(), be = new WeakMap(), G = new WeakMap(), Se = new WeakMap(), Me = new WeakMap(), Te = new WeakSet(), tn = function() {
  return p(this, W, fe).ownerDocument;
}, W = new WeakSet(), fe = function() {
  return p(this, ve);
}, Q = new WeakSet(), de = function() {
  return p(this, we);
}, _e = new WeakSet(), ln = function(n) {
  var i;
  const r = ro(n);
  return r ? (this.model && (p(this, W, fe).removeChild(this.gridView), (i = p(this, Q, de)) == null || i.removeChild(this.cluesView), D(this, R, new mn())), D(this, P, r), D(this, ye, ti(
    p(this, Te, tn),
    this.model,
    p(this, R)
  )), p(this, R).modelCells.filter((t) => t.light).forEach((t) => {
    E(this, Ue, Gr).call(this, t.cellElement), E(this, Pe, qr).call(this, this.cellElement(t));
  }), p(this, W, fe).appendChild(this.gridView), p(this, Q, de) && (D(this, Ce, ii(p(this, Te, tn), this)), p(this, Q, de).appendChild(this.cluesView)), this.currentClue = this.model.acrossClues.headSegments[0], E(this, k, N).call(this, "crosswordLoaded", n), !0) : (x("#bindDefinition: crosswordModel creation failed", "error"), !1);
}, Be = new WeakMap(), je = new WeakMap(), Le = new WeakMap(), He = new WeakMap(), k = new WeakSet(), N = function(n, r) {
  x(`stateChange: ${n}`), p(this, Ae).publish(n, r);
}, U = new WeakSet(), ne = function(n, r) {
  d(
    this.controllerEventNames.includes(n),
    `unknown event "${n}"`
  ), setTimeout(() => {
    E(this, k, N).call(this, n, r);
  }, wo);
}, oe = new WeakSet(), ke = function() {
  x("checkSolved"), pi(this) === _.correct && E(this, U, ne).call(this, "crosswordSolved", this.model);
}, Pe = new WeakSet(), qr = function(n) {
  d(n, "cellElement is null or undefined");
  const r = this;
  n.addEventListener("focus", (i) => {
    var l;
    const t = r.cell(i.target);
    x(`event:focus ${t}`), r.currentCell !== t && (r.currentCell = t), r.lastMoveEvent = "focus", p(l = r, He).call(l, t);
  }), n.addEventListener("click", (i) => {
    const t = r.cell(i.target);
    x(`event:click ${t}`), t === r.currentCell ? r.lastMoveEvent === "click" && Un(r, t) : r.currentCell = t, r.lastMoveEvent = "click";
  });
}, Ue = new WeakSet(), Gr = function(n) {
  const r = this;
  Object.keys(p(r, le)).forEach((i) => {
    const t = p(r, le)[i];
    d(t, `"${i}" bindings are null or undefined.`), n.addEventListener(i, (l) => {
      const o = l.key;
      x(`event:${i} key=[${o}]`);
      const u = t.find((f) => f.key === o), s = M.name(o), c = ["left", "right", "up", "down"].includes(s);
      if (u) {
        l.preventDefault(), x(
          l.shiftKey ? `SHIFT+${s.toUpperCase()}` : s.toUpperCase()
        );
        const f = r.cell(l.target);
        u.action(r, l, f);
      } else
        c && l.preventDefault();
    });
  }), n.addEventListener("keypress", (i) => {
    var s;
    x("event:keypress"), i.preventDefault();
    const [t, l] = [r.cell(i.target), i.key], [o, u] = [
      l.toLowerCase(),
      l.toUpperCase()
    ];
    xo.test(o) && (x(`Setting cell content: [${u}]`), Xn(r, i, u), se(r.incorrectElement(t)), E(s = r, oe, ke).call(s)), Co.test(o) && (x("Advancing to next cell"), Qn(r, t));
  });
};
const So = {
  assert: d,
  // Validate function arguments and entry conditions
  ecs: Pn,
  // DOM helper, wrapper for document.getElementByClass()
  eid: Hn,
  // DOM helper, wrapper for document.getElementById()
  isArray: jn,
  isBoolean: Bn,
  isNumber: Dn,
  isObject: Jr,
  isString: Mn,
  isTruthy: Rn,
  trace: x,
  // Log information, warnings and errors to the console
  tracing: ni
  // Console logging toggle - pass boolean 'true' to emit messages to the console.
};
export {
  vo as Controller,
  ro as compileCrossword,
  Ao as convertSourceFileToDefinition,
  So as helpers,
  bo as newCrosswordController,
  Kr as newCrosswordDefinition,
  Eo as newCrosswordSource
};
