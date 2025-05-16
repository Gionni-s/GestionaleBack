import { Types } from 'mongoose';
import Event from '../../events/model';

export async function createEvent(next) {
  if (this.isNew) {
    const event = {
      title: 'Scadenza: ' + this.name,
      start: this.expirationDate,
      endDate: this.expirationDate,
      isAllDay: true,
      materializedCreator: this,
      userId: this.userId
    };
    await Event.create(event);
  }

  const event = await Event.findOne({ 'materializedCreator._id': this._id });

  if (_.isNil(event)) {
    return next();
  }

  event.title = 'Scadenza: ' + this.name;
  event.start = this.expirationDate;
  event.endDate = this.expirationDate;
  event.isAllDay = true;
  event.materializedCreator = this;
  event.userId = this.userId;

  await event.save();

  return next();
}

export async function removeEvent(next) {
  let entityId;

  if (this._id) {
    entityId = this._id;
  } else {
    const filter = this.getFilter ? this.getFilter() : null;
    entityId = filter && filter._id;
  }

  if (entityId) {
    const objectId = new Types.ObjectId(entityId);
    const exists = await Event.findOne({ 'materializedCreator._id': objectId });

    if (!_.isNil(exists)) {
      await Event.deleteOne({ 'materializedCreator._id': objectId });
    }
  }

  return next();
}