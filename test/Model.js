import { expect } from 'chai';
import Model from '../lib/Model';

describe('Model', function() {
  describe('getCellsSelected()', function() {
    it('should work when no cells selected', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      expect(m.getCellsSelected()).to.deep.equal([
        [false, false, false],
        [false, false, false]
      ]);
    });

    it('should work when some cells selected', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.finishSelection();
      expect(m.getCellsSelected()).to.deep.equal([
        [false, true, false],
        [false, true, false]
      ]);
    });
  });

  describe('getCellsBeingSelected()', function() {
    it('should work when no cells being selected', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.finishSelection();
      expect(m.getCellsBeingSelected()).to.deep.equal([
        [false, false, false],
        [false, false, false]
      ]);
    });

    it('should work when some cells being selected', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      expect(m.getCellsBeingSelected()).to.deep.equal([
        [false, true, false],
        [false, true, false]
      ]);
    });
  });

  describe('startSelection()', function() {
    it('should not select cells', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      expect(m.getCellsSelected()).to.deep.equal([
        [false, false, false],
        [false, false, false]
      ]);
    });

    it('should mark one cell as under selection', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      expect(m.getCellsBeingSelected()).to.deep.equal([
        [false, false, false],
        [false,  true, false]
      ]);
    });
  });

  describe('updateSelection()', function() {
    it('should not select cells', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      expect(m.getCellsSelected()).to.deep.equal([
        [false, false, false],
        [false, false, false]
      ]);
    });

    it('should mark some cells as under selection', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      expect(m.getCellsBeingSelected()).to.deep.equal([
        [false, true, false],
        [false, true, false]
      ]);
    });
  });

  describe('finishSelection()', function() {
    it('should select some cells', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.finishSelection();
      expect(m.getCellsSelected()).to.deep.equal([
        [false, true, false],
        [false, true, false]
      ]);
    });

    it('should select cells cumulatively', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.finishSelection();
      m.startSelection(0, 0);
      m.updateSelection(0, 2);
      m.finishSelection();
      expect(m.getCellsSelected()).to.deep.equal([
        [ true, true,  true],
        [false, true, false]
      ]);
    });

    it('should invert selected cells', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.finishSelection();
      m.startSelection(0, 1);
      m.updateSelection(0, 2);
      m.finishSelection();
      expect(m.getCellsSelected()).to.deep.equal([
        [false, false, false],
        [false,  true, false]
      ]);
    });

    it('should leave no cells as under selection', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.finishSelection();
      expect(m.getCellsBeingSelected()).to.deep.equal([
        [false, false, false],
        [false, false, false]
      ]);
    });
  });

  describe('clear()', function() {
    it('should make all cells unselected', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.finishSelection();
      m.clear();
      expect(m.getCellsSelected()).to.deep.equal([
        [false, false, false],
        [false, false, false],
      ]);
    });

    it('should stop an active selection', function() {
      const m = new Model(2, 3);
      m.startSelection(1, 1);
      m.updateSelection(0, 1);
      m.clear();
      expect(m.getCellsBeingSelected()).to.deep.equal([
        [false, false, false],
        [false, false, false],
      ]);
    });
  });

  describe('equals()', function() {
    it('should return true for same models', function() {
      const m1 = new Model(2, 3);
      m1.startSelection(1, 1);
      m1.updateSelection(1, 1);
      m1.finishSelection();
      m1.startSelection(1, 1);
      m1.updateSelection(1, 1);
      m1.finishSelection();
      const m2 = new Model(2, 3);
      expect(m1.equals(m2)).to.be.true;
    });

    it('should return false for different models', function() {
      const m1 = new Model(2, 3);
      m1.startSelection(1, 1);
      const m2 = new Model(2, 3);
      expect(m1.equals(m2)).to.be.false;
    });
  });
});
