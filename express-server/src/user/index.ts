import express, { type Router } from 'express';
import validate from 'express-zod-safe';
import { convertQueryStringToSort } from 'vue-nestjs-test-utilities';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './user.service';
import {
  CreateUserSchema,
  GetUserSchema,
  GetUsersSchema,
  UpdateUserSchema,
} from 'vue-nestjs-test-schemas';
import doublet from 'doublet';

const router: Router = express.Router();

router.get('/', validate({ query: GetUsersSchema }), (req, res) => {
  const { page, limit, search, sort } = req.query;

  res.json(getUsers(page, limit, search, sort ? convertQueryStringToSort(sort) : undefined));
});

router.get('/:id', validate({ params: GetUserSchema }), (req, res) => {
  const { id } = req.params;
  const [err, user] = doublet(getUser, id);

  if (err) {
    res.status(404).json({ error: err.message });
    return;
  }

  res.json(user);
});

router.post('/create', validate({ body: CreateUserSchema }), (req, res) => {
  const user = req.body;
  const newUser = createUser(user);
  res.status(201).json(newUser);
});

router.patch('/:id', validate({ body: UpdateUserSchema, params: GetUserSchema }), (req, res) => {
  const { id } = req.params;
  const userUpdates = req.body;
  const updatedUser = updateUser(id, userUpdates);
  res.json(updatedUser);
});

router.delete('/:id', validate({ params: GetUserSchema }), (req, res) => {
  const { id } = req.params;

  const [err] = doublet(deleteUser, id);

  if (err) {
    res.status(404).json({ error: err.message });
    return;
  }

  res.json({ id });
});

export default router;
