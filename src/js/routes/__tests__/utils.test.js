import utils from 'routes/utils';

describe('utils', () => {
  describe('parseIntParam', () => {
    it('should handle strings', () => {
      expect(utils.parseIntParam('1', 0)).toBe(1);
    });
    it('should prevent negative numbers', () => {
      expect(utils.parseIntParam('-1', 0)).toBe(0);
    });
    it('should handle defaults', () => {
      expect(utils.parseIntParam(null, 10)).toBe(10);
    });
  });
  describe('parseJsonParam', () => {
    it('should handle base64 strings', () => {
      const obj = { test: 1 };
      const b64 = JSON.stringify(obj);
      expect(utils.parseJsonParam(b64, {})).toEqual(obj);
    });
    it('should handle defaults', () => {
      const obj = { test: 1 };
      expect(utils.parseJsonParam(null, obj)).toBe(obj);
    });
  });
  describe('prepareNodeParams', () => {
    it('should create a base64 id', () => {
      const obj = { id: btoa('File:hello') };
      expect(utils.prepareNodeParams('File')({ id: 'hello' })).toEqual(obj);
    });
  });
});
