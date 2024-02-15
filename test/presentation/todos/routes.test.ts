import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgresql";

describe("Todo route testing", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: "Hola mundo 1" };
  const todo2 = { text: "Hola mundo 2" };

  test("should return TODOs api/todos", async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });
    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBeUndefined();
  });

  test("should return a TODO api/todos/:id", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({ id: todo.id, text: todo.text });
  });

  test("should return a 404 Not Found api/todos/:id", async () => {
    const todoId = 9999;

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("should return a new TODO api/todos on POST", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201);

    expect(body).toEqual({ id: expect.any(Number), text: todo1.text });
  });
  test("should return an error if text is not present in api/todos on POST", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({})
      .expect(400);

    expect(body).toEqual({ error: "Text property is required" });
  });
  test("should return an error if text is empty in api/todos on POST", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({ text: "" })
      .expect(400);

    expect(body).toEqual({ error: "Text property is required" });
  });

  test("should return update TODO api/todos/:id  on PUT", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: "Hola mundo Update", completedAt: "2023-12-24" })
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: "Hola mundo Update",
      completedAt: "2023-12-24T00:00:00.000Z",
    });
  });

  test("should return 404 if TODO not found", async () => {
    const todoId = 9999;

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({ text: "Hola mundo Update", completedAt: "2023-12-24" })
      .expect(400);

    expect(body).toEqual({ error: "Todo with id 9999 not found" });
  });

  test("should return and update TODO only the date", async() => {

    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: "2023-12-24" })
      .expect(200);

      console.log(body);
      

    expect(body).toEqual({id: todo.id,
      text: todo.text,
      completedAt: '2023-12-24T00:00:00.000Z'});
  });

  test('should  delete a TODO api/todos/:id', async() => {
    
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

      expect(body).toEqual({
        id: todo.id,
        text: todo.text,
      })
      
  })

  test('should return 404 if TODO do not exist api/todos/:id',async() => {
    const { body } = await request(testServer.app)
      .delete(`/api/todos/9999`)
      .expect(400);

      expect(body).toEqual({ error: "Todo with id 9999 not found" });

      
  })
  
  
});
