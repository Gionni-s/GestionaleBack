module.exports = function FunctionGeneration(Entity) {

  async function index({ idPropietario }, res) {
    const fkProprietario = idPropietario;
    let result = await Entity.find({ fkProprietario: fkProprietario });
    if (result.length == 0) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  };

  async function show({ params, idPropietario }, res) {
    const fkProprietario = idPropietario;
    let result = await Entity.findOne({ fkProprietario: fkProprietario, _id: params.id });
    if (result.length == 0) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  };

  async function create({ body, idPropietario }, res) {
    try {
      let fkProprietario = idPropietario;

      let create = await Entity.create({ ...body, fkProprietario });
      return res.status(200).send(create);
    } catch (err) {
      logger.error(err.message);
      return res.status(400).send({ message: err.message });
    }
  };

  async function update({ body, idPropietario, params }, res) {
    let fkProprietario = idPropietario;
    let updated = await Entity.findOneAndUpdate({ _id: params.id, fkProprietario }, body, { new: true });
    if (!updated) {
      return res.status(400).send({ message: 'no items found to modify' });
    }
    return res.status(200).send(updated);
  };

  async function destroy({ body, idPropietario, params }, res) {
    let fkProprietario = idPropietario;
    await Entity.deleteOne({ _id: params.id, fkProprietario }, body);
    return res.status(200).send({ message: 'delete successfully' });
  };

  return {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy,
    destroyMe: destroy
  };
};