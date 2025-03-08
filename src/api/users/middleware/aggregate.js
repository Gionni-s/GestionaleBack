import mongoose from 'mongoose';

export const showUser = (id) => [
  {
    $match: {
      _id: new mongoose.Types.ObjectId(id)
    }
  },
  {
    $lookup: {
      from: 'uploads',
      localField: 'profileImage',
      foreignField: '_id',
      pipeline: [{ $project: { file: 1, _id: 0 } }],
      as: 'profileImage'
    }
  },
  // {
  //   $unwind: '$profileImage'
  // },
  {
    $set: {
      profileImage: '$profileImage.file'
    }
  }
];

export const showAll = () => {
  return [
    {
      $lookup: {
        from: 'uploads',
        localField: 'profileImage',
        foreignField: '_id',
        pipeline: [
          { $project: { file: 1, _id: 0 } }
        ],
        as: 'profileImage'
      }
    },
    { $unwind: '$profileImage' },
    { $set: { profileImage: '$profileImage.file' } }
  ];
};