module.exports = function FunctionGeneration(Entity) {

  async function index({ userId }, res) {
    let result = await Entity.view({ userId });
    if (result.length == 0) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  };

  async function show({ params, userId }, res) {
    let result = await Entity.view({ userId, _id: params.id });
    if (result.length == 0) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  };

  async function showMe({ userId }, res) {
    try {
      let result = await Entity.view({ _id: userId });
      if (result.length == 0) {
        result = { message: 'No element Found' };
      }
      return res.status(200).send(result);
    } catch (e) {
      logger.error(e.message);
      return res.status(500).send({ message: e.message });
    }
  };

  async function create({ body, userId }, res) {
    try {
      let create = await Entity.create({ ...body, userId });
      return res.status(200).send(create);
    } catch (err) {
      logger.error(err.message);
      return res.status(400).send({ message: err.message });
    }
  };

  async function update({ body, userId, params }, res) {
    let updated = await Entity.findOneAndUpdate({ _id: params.id, userId }, body, { new: true });
    if (!updated) {
      return res.status(400).send({ message: 'No elements found to modify' });
    }
    return res.status(200).send(updated);
  };

  async function updateMe({ body, userId }, res) {
    let updated = await Entity.findOneAndUpdate({ _id: userId }, body, { new: true });
    if (!updated) {
      return res.status(400).send({ message: 'No elements found to modify' });
    }
    return res.status(200).send(updated);
  };

  async function destroy({ body, userId, params }, res) {
    let destroied = await Entity.deleteOne({ _id: params.id, userId }, body);
    if (!destroied) {
      return res.status(400).send({ message: 'Error during elimination of user' });
    }
    return res.status(200).send({ message: 'Delete successfully' });
  };

  async function destroyMe({ userId }, res) {
    let destroied = await Entity.deleteOne({ _id: userId });
    if (!destroied) {
      return res.status(400).send({ message: 'Error during elimination of user' });
    }
    return res.status(200).send({ message: 'Delete successfully' });
  }

  return {
    index: index,
    show: show,
    showMe: showMe,
    create: create,
    update: update,
    updateMe: updateMe,
    destroy: destroy,
    destroyMe: destroyMe
  };
};