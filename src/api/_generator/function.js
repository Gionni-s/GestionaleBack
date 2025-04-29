export default function FunctionGeneration(Entity) {
  const noModificationMessage = { message: 'No elements found to modify' };
  const deleteSuccessMessage = { message: 'Delete successfully' };

  const handleError = (res, err, statusCode = 500) => {
    logger.error(err.message);
    return res.status(statusCode).send({ message: err.message });
  };

  async function index({ querymen: { query, select, cursor }, user }, res) {
    try {
      const result = await Entity.find({ ...query, userId: user._id }, select, cursor);

      const populatedResult = [];
      for (const item of result) {
        const view = await item.view();
        populatedResult.push(view);
      }

      return res.status(200).send(populatedResult);
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function show({ querymen: { query, select, cursor }, params, user }, res) {
    try {
      const result = await Entity.findOne({ ...query, userId: user._id, _id: params.id }, select, cursor);

      const populatedResult = [];

      for (const item of result) {
        const view = await item.view();
        populatedResult.push(view);
      }

      return res.status(200).send(result);
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function showMe({ user }, res) {
    try {
      const result = await Entity.findOne({ _id: user._id });

      const populatedResult = [];

      for (const item of result) {
        const view = await item.view();
        populatedResult.push(view);
      }

      return res.status(200).send(populatedResult);
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function create({ body, user }, res) {
    try {
      const created = await Entity.create({ ...body, userId: user._id });

      const populatedResult = await created.view();

      return res.status(201).send(populatedResult);
    } catch (err) {
      return handleError(res, err, 400);
    }
  }

  async function update({ body, user, params }, res) {
    try {
      let updatedItem = await Entity.findOne({ _id: params.id, userId: user._id });

      if (!updatedItem) {
        return res.status(404).send(noModificationMessage);
      }
      for (let val in body) {
        updatedItem[val] = body[val];
      }
      await updatedItem.save();

      const populatedResult = [];

      for (const item of updatedItem) {
        const view = await item.view();
        populatedResult.push(view);
      }

      return res.status(200).send(populatedResult);
    } catch (err) {
      return handleError(res, err, 400);
    }
  }


  async function updateMe({ body, user }, res) {
    try {
      let result = await Entity.findOne({ _id: user._id });

      if (!result) {
        return res.status(404).send(noModificationMessage);
      }

      for (let val in body) {
        result[val] = body[val];
      }
      await result.save();

      const populatedResult = [];

      for (const item of result) {
        const view = await item.view();
        populatedResult.push(view);
      }

      return res.status(200).send(populatedResult);
    } catch (err) {
      return handleError(res, err, 400);
    }
  }

  async function destroy({ user, params }, res) {
    try {
      const { deletedCount } = await Entity.deleteOne({ _id: params.id, userId: user._id });
      if (deletedCount === 0) {
        return res.status(404).send({ message: 'No elements found to delete' });
      }
      return res.status(200).send(deleteSuccessMessage);
    } catch (err) {
      return handleError(res, err, 400);
    }
  }

  async function destroyMe({ user }, res) {
    try {
      const { deletedCount } = await Entity.deleteOne({ _id: user._id });
      if (deletedCount === 0) {
        return res.status(404).send({ message: 'No elements found to delete' });
      }
      return res.status(200).send(deleteSuccessMessage);
    } catch (err) {
      return handleError(res, err, 400);
    }
  }

  return {
    index,
    show,
    showMe,
    create,
    update,
    updateMe,
    destroy,
    destroyMe
  };
};