//dimensioning.js
import * as go from 'gojs';

export default class DimensioningLink extends go.Link {
  constructor(init) {
    super();
    this.isLayoutPositioned = false; // Disable layout for custom positioning
    this.isTreeLink = true;
    this.routing = go.Routing.AvoidsNodes;
    this.extension = 40; // Distance of the dimension line from the points being measured
    this.inset = 10; // Indentation from the ends of the extension lines
    this.gap = 18; // Distance the extension lines come short of the measured points
    if (init) {
      Object.assign(this, init);
    }
  }

  cloneProtected(copy) {
    super.cloneProtected(copy);
    copy.direction = this.direction;
    copy.extension = this.extension;
    copy.gap = this.gap;
    copy.inset = this.inset;
  }

  computePoints() {
    const fromnode = this.fromNode;
    if (!fromnode) return false;
    const fromport = this.fromPort;
    if (!fromport) return false;
    const fromspot = this.computeSpot(true);
    const tonode = this.toNode;
    if (!tonode) return false;
    const toport = this.toPort;
    if (!toport) return false;
    const tospot = this.computeSpot(false);
    const frompoint = this.getLinkPoint(fromnode, fromport, fromspot, true, true, tonode, toport);
    if (!frompoint.isReal()) return false;
    const topoint = this.getLinkPoint(tonode, toport, tospot, false, true, fromnode, fromport);
    if (!topoint.isReal()) return false;
    this.clearPoints();
    let ang = this.direction;
    if (isNaN(ang)) {
      ang = frompoint.directionPoint(topoint);
      const p = new go.Point(this.extension, 0);
      p.rotate(ang + 90);
      const q = new go.Point(this.extension - this.inset, 0);
      q.rotate(ang + 90);
      const g = new go.Point(this.gap, 0);
      g.rotate(ang + 90);
      this.addPointAt(frompoint.x + g.x, frompoint.y + g.y);
      this.addPointAt(frompoint.x + p.x, frompoint.y + p.y);
      this.addPointAt(frompoint.x + q.x, frompoint.y + q.y);
      this.addPointAt(topoint.x + q.x, topoint.y + q.y);
      this.addPointAt(topoint.x + p.x, topoint.y + p.y);
      this.addPointAt(topoint.x + g.x, topoint.y + g.y);
    } else {
      let r = 0.0;
      let s = 0.0;
      let t0 = 0.0;
      let t1 = 0.0;
      if (ang === 0 || ang === 180) {
        if (ang === 0) {
          r = Math.min(frompoint.y, topoint.y) - this.extension;
          s = r + this.inset;
          t0 = frompoint.y - this.gap;
          t1 = topoint.y - this.gap;
        } else {
          r = Math.max(frompoint.y, topoint.y) + this.extension;
          s = r - this.inset;
          t0 = frompoint.y + this.gap;
          t1 = topoint.y + this.gap;
        }
        this.addPointAt(frompoint.x, t0);
        this.addPointAt(frompoint.x + 0.01, r);
        this.addPointAt(frompoint.x, s);
        this.addPointAt(topoint.x, s);
        this.addPointAt(topoint.x - 0.01, r);
        this.addPointAt(topoint.x, t1);
      } else if (ang === 90 || ang === 270) {
        if (ang === 90) {
          r = Math.max(frompoint.x, topoint.x) + this.extension;
          s = r - this.inset;
          t0 = frompoint.x + this.gap;
          t1 = topoint.x + this.gap;
        } else {
          r = Math.min(frompoint.x, topoint.x) - this.extension;
          s = r + this.inset;
          t0 = frompoint.x - this.gap;
          t1 = topoint.x - this.gap;
        }
        this.addPointAt(t0, frompoint.y);
        this.addPointAt(r, frompoint.y + 0.01);
        this.addPointAt(s, frompoint.y);
        this.addPointAt(s, topoint.y);
        this.addPointAt(r, topoint.y - 0.01);
        this.addPointAt(t1, topoint.y);
      }
    }
    this.updateTargetBindings();
    return true;
  }
}
