const pubController = require('../database/controllers/publication');

describe('publication controller exports', ()=>{
  test('should export functions', ()=>{
    expect(pubController).toBeDefined();
    expect(typeof pubController.createPublication).toBe('function');
    expect(typeof pubController.feed).toBe('function');
  });
});
