module.exports = function FunctionGeneration(Entity) {

  async function index({ idProprietario }, res) {
    const fkProprietario = idProprietario;
    let result = await Entity.find({ fkProprietario: fkProprietario });
    if (result.length == 0) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  };

  async function show({ params, idProprietario }, res) {
    const fkProprietario = idProprietario;
    let result = await Entity.findOne({ fkProprietario: fkProprietario, _id: params.id });
    if (result.length == 0) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  };

  async function showMe({ idProprietario }, res) {
    try {
      let result = await Entity.findOne({ _id: idProprietario });
      if (result.length == 0) {
        result = { message: 'No element Found' };
      }
      return res.status(200).send(result);
    } catch (e) {
      logger.error(e.message);
      return res.status(500).send({ message: e.message });
    }
  };

  async function create({ body, idProprietario }, res) {
    try {
      let fkProprietario = idProprietario;

      let create = await Entity.create({ ...body, fkProprietario });
      return res.status(200).send(create);
    } catch (err) {
      logger.error(err.message);
      return res.status(400).send({ message: err.message });
    }
  };

  async function update({ body, idProprietario, params }, res) {
    let fkProprietario = idProprietario;
    let updated = await Entity.findOneAndUpdate({ _id: params.id, fkProprietario }, body, { new: true });
    if (!updated) {
      return res.status(400).send({ message: 'no items found to modify' });
    }
    return res.status(200).send(updated);
  };

  async function updateMe({ body, idProprietario }, res) {
    let updated = await Entity.findOneAndUpdate({ _id: idProprietario }, body, { new: true });
    if (!updated) {
      return res.status(400).send({ message: 'no items found to modify' });
    }
    return res.status(200).send(updated);
  };

  async function destroy({ body, idProprietario, params }, res) {
    let fkProprietario = idProprietario;
    await Entity.deleteOne({ _id: params.id, fkProprietario }, body);
    return res.status(200).send({ message: 'delete successfully' });
  };

  return {
    index: index,
    show: show,
    showMe: showMe,
    create: create,
    update: update,
    updateMe: updateMe,
    destroy: destroy,
    destroyMe: destroy
  };
};