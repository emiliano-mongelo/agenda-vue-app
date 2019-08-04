const { findAll, findById, create, deleteById } = require('./contacts-service');

describe('contacts service', () => {
  test('should return a list of contacts', async () => {
    const contacts = await findAll();
    expect(contacts).toHaveLength(2);
  });

  test('should return a single contact with id 1', async () => {
    const contact = await findById(1);
    expect(contact).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Create App',
        description: 'Create app with Vue.js',
        status: 'open',
        author: 'Emiliano Mongelo',
        assignee: 'Emiliano Mongelo'
      })
    );
  });

  test('should return new contact', async () => {
    const payload = {
      id: 1,
      title: 'Create App',
      description: 'Create app with Vue.js',
      status: 'open',
      author: 'Emiliano Mongelo',
      assignee: 'Emiliano Mongelo',
      createdDate: 1563560545000,
      updatedDate: 1563560545000,
      labels: [{ id: 1, title: 'story', color: '#FF00FF' }]
    };
    const contact = await create(payload);

    expect(contact).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Create App',
        description: 'Create app with Vue.js',
        status: 'open',
        author: 'Emiliano Mongelo',
        assignee: 'Emiliano Mongelo'
      })
    );
  });

  test('should return a list of contacts', async () => {
    const contacts = await deleteById(2);
    expect(contacts).toHaveLength(1);
  });
});
